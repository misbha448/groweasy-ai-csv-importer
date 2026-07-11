'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { RiRobot2Fill } from 'react-icons/ri';
import styles from './FloatingAssistant.module.css';

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

function getApiBase() {
  if (!API_BASE) {
    throw new Error('NEXT_PUBLIC_API_URL is not configured.');
  }

  const normalizedBase = API_BASE.replace(/\/$/, '');
  return normalizedBase.endsWith('/api') ? normalizedBase : `${normalizedBase}/api`;
}

const suggestions = [
  'How does AI Mapping work?',
  'Supported CSV formats',
  'CRM Fields',
  'Why was my record skipped?',
  'Import Process',
  'Download CSV',
  'Common Errors'
];

const assistantUnavailableMessage = "Sorry, I'm unable to reach Gemini right now. Please try again in a moment.";

function getTimestamp() {
  return new Intl.DateTimeFormat(undefined, {
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date());
}

async function requestAssistantReply(message) {
  try {
    const response = await fetch(`${getApiBase()}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
      signal: AbortSignal.timeout(20000)
    });

    const data = await response.json().catch(() => null);

    if (!response.ok || !data?.success) {
      return data?.error?.message || assistantUnavailableMessage;
    }

    return String(data.reply || '').trim() || assistantUnavailableMessage;
  } catch (error) {
    if (error?.name === 'TimeoutError') {
      return 'Sorry, Gemini is taking longer than expected. Please try again in a moment.';
    }

    return assistantUnavailableMessage;
  }
}

export default function FloatingAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      text: "Hi! I'm GrowEasy AI Assistant.\n\nI can help you with:\n\n- CSV Upload\n- CRM Field Mapping\n- AI Import Process\n- Troubleshooting\n- Download Process\n- General Programming Questions\n\nHow can I help you today?",
      time: getTimestamp()
    }
  ]);
  const scrollRef = useRef(null);

  const quickSuggestions = useMemo(() => suggestions, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth'
    });
  }, [messages, isThinking]);

  const sendMessage = async (text) => {
    const message = text.trim();
    if (!message || isThinking) return;

    setInput('');
    setMessages((current) => [
      ...current,
      { id: `${Date.now()}-user`, role: 'user', text: message, time: getTimestamp() }
    ]);
    setIsThinking(true);

    const reply = await requestAssistantReply(message);
    setMessages((current) => [
      ...current,
      { id: `${Date.now()}-assistant`, role: 'assistant', text: reply, time: getTimestamp() }
    ]);
    setIsThinking(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage(input);
  };

  return (
    <div className={styles.assistantRoot} id="assistant">
      {isOpen && (
        <section className={styles.panel} aria-label="GrowEasy AI Assistant">
          <header className={styles.header}>
            <div>
              <p className={styles.eyebrow}>Live import guidance</p>
              <h2 className={styles.title}>AI GrowEasy AI Assistant</h2>
            </div>
            <button type="button" className={styles.closeButton} onClick={() => setIsOpen(false)} aria-label="Close assistant">x</button>
          </header>

          <div className={styles.suggestions}>
            {quickSuggestions.map((suggestion) => (
              <button key={suggestion} type="button" onClick={() => sendMessage(suggestion)} disabled={isThinking}>
                {suggestion}
              </button>
            ))}
          </div>

          <div className={styles.messages} ref={scrollRef}>
            {messages.map((message) => (
              <article key={message.id} className={`${styles.message} ${styles[message.role]}`}>
                <div className={styles.bubble}>{message.text}</div>
                <time>{message.time}</time>
              </article>
            ))}
            {isThinking && (
              <div className={`${styles.message} ${styles.assistant}`}>
                <div className={styles.loader} aria-label="Assistant is thinking">
                  <span className={styles.thinkingText}>Thinking</span>
                  <span className={styles.dot} />
                  <span className={styles.dot} />
                  <span className={styles.dot} />
                </div>
              </div>
            )}
          </div>

          <form className={styles.composer} onSubmit={handleSubmit}>
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about your CSV import..."
              aria-label="Assistant message"
            />
            <button type="submit" disabled={isThinking || !input.trim()}>Send</button>
          </form>
        </section>
      )}

      <button
        type="button"
        className={styles.floatingButton}
        onClick={() => setIsOpen((open) => !open)}
        aria-label="Open AI Assistant"
        aria-expanded={isOpen}
        title="Open AI Assistant"
      >
        <RiRobot2Fill className={styles.launcherIcon} aria-hidden="true" focusable="false" />
      </button>
    </div>
  );
}
