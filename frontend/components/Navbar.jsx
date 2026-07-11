'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Navbar.module.css';

const menus = {
  solutions: [
    ['AI CSV Import', 'AI', 'Understand CSV files from any source.'],
    ['Smart Field Mapping', 'FM', 'Map unknown columns into CRM-ready fields.'],
    ['Batch Processing', 'BP', 'Handle larger imports with clear progress.'],
    ['CRM Ready', 'CRM', 'Normalize records for GrowEasy CRM.'],
    ['Import Analytics', 'IA', 'Review imported, skipped and processed data.'],
    ['Supported Formats', 'CSV', 'Work with clean and messy CSV structures.']
  ],
  resources: [
    ['Sample CRM CSV', 'SC'],
    ['Messy CSV Example', 'MC'],
    ['API Overview', 'API'],
    ['How It Works', 'HW'],
    ['Download', 'DL'],
    ['FAQ', 'FAQ']
  ],
  about: [
    ['Project Overview', 'PO'],
    ['Tech Stack', 'TS'],
    ['Architecture', 'AR'],
    ['AI Pipeline', 'AI'],
    ['Future Improvements', 'FI']
  ]
};

export default function Navbar() {
  const [theme, setTheme] = useState('light');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const navRef = useRef(null);

  useEffect(() => {
    const storedTheme = localStorage.getItem('groweasy-theme');
    const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const nextTheme = storedTheme || preferredTheme;
    document.documentElement.dataset.theme = nextTheme;
    requestAnimationFrame(() => setTheme(nextTheme));
  }, []);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!navRef.current?.contains(event.target)) {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('groweasy-theme', nextTheme);
    document.documentElement.dataset.theme = nextTheme;
  };

  const closeMenus = () => {
    setOpenMenu(null);
    setMobileOpen(false);
  };

  const scrollToUpload = () => {
    const target = document.getElementById('upload');
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    closeMenus();
  };

  const goHome = () => {
    window.dispatchEvent(new CustomEvent('groweasy:home'));
    closeMenus();
  };

  const toggleMenu = (menu) => {
    setOpenMenu((current) => (current === menu ? null : menu));
  };

  return (
    <nav className={styles.navbar} ref={navRef}>
      <div className={styles.container}>
        <button type="button" className={styles.logo} aria-label="GrowEasy home" onClick={goHome}>
          <span className={styles.icon} aria-hidden="true">G</span>
          <span className={styles.text}>GrowEasy</span>
        </button>

        <button
          type="button"
          className={styles.menuButton}
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
          aria-controls="primary-navigation"
          onClick={() => setMobileOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <div id="primary-navigation" className={`${styles.navShell} ${mobileOpen ? styles.open : ''}`}>
          <div className={styles.nav} aria-label="Primary navigation">
            <button
              type="button"
              className={styles.link}
              onClick={goHome}
            >
              Home
            </button>

            {[
              ['solutions', 'Solutions'],
              ['resources', 'Resources'],
              ['about', 'About']
            ].map(([key, label]) => (
              <div key={key} className={styles.menuItem}>
                <button
                  type="button"
                  className={styles.link}
                  aria-expanded={openMenu === key}
                  aria-controls={`${key}-menu`}
                  onClick={() => toggleMenu(key)}
                >
                  {label} <span aria-hidden="true">v</span>
                </button>
                <div
                  id={`${key}-menu`}
                  className={`${styles.megaMenu} ${key === 'solutions' ? styles.solutionsMenu : styles.resourcesMenu} ${openMenu === key ? styles.visible : ''}`}
                >
                  {menus[key].map(([title, icon, description]) => (
                    <div
                      key={title}
                      className={key === 'solutions' ? styles.solutionCard : styles.resourceItem}
                    >
                      <span className={key === 'solutions' ? styles.cardIcon : styles.resourceIcon}>{icon}</span>
                      <span className={key === 'solutions' ? styles.cardCopy : undefined}>
                        <span className={styles.cardTitle}>{title}</span>
                        {description && <span className={styles.cardDescription}>{description}</span>}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.themeToggle}
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              <span className={styles.toggleTrack}>
                <span className={styles.toggleThumb}>{theme === 'dark' ? 'D' : 'L'}</span>
              </span>
              <span className={styles.themeText}>{theme === 'dark' ? 'Dark' : 'Light'}</span>
            </button>
            <button type="button" className={styles.uploadButton} onClick={scrollToUpload}>Upload CSV</button>
          </div>
        </div>
      </div>
    </nav>
  );
}
