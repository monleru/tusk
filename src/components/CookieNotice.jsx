import { useEffect, useState } from 'react';
import './CookieNotice.css';

const storageKey = 'tuskpay-cookie-choice';

export default function CookieNotice() {
  const [visible, setVisible] = useState(() => {
    try { return !['all', 'necessary'].includes(localStorage.getItem(storageKey)); }
    catch { return true; }
  });

  useEffect(() => {
    const open = () => setVisible(true);
    window.addEventListener('open-cookie-settings', open);
    return () => window.removeEventListener('open-cookie-settings', open);
  }, []);

  function choose(value) {
    try { localStorage.setItem(storageKey, value); } catch { /* Storage may be unavailable. */ }
    setVisible(false);
  }

  if (!visible) return null;
  return (
    <aside className="cookie-notice" aria-labelledby="cookie-notice-title">
      <button className="cookie-notice__close" type="button" aria-label="Close and use necessary cookies only" onClick={() => choose('necessary')}>×</button>
      <h2 id="cookie-notice-title">THIS WEBSITE USES COOKIES</h2>
      <p>We use cookies to personalize content, ads, social features, and share data with partners for analysis.</p>
      <button className="cookie-notice__allow" type="button" onClick={() => choose('all')}>ALLOW ALL</button>
    </aside>
  );
}
