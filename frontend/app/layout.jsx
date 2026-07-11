import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingAssistant from '../components/FloatingAssistant';

export const metadata = {
  title: 'GrowEasy AI CSV Importer',
  description: 'AI Powered CSV Importer',
  manifest: '/manifest.json'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" id="top" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var storedTheme = localStorage.getItem('groweasy-theme');
                var preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                document.documentElement.dataset.theme = storedTheme || preferredTheme;
              } catch (error) {}
            `
          }}
        />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <FloatingAssistant />
        <Footer />
      </body>
    </html>
  );
}
