import { CALENDLY_URL, openCalendly } from '../calendly';
import { useEffect, useRef, useState } from 'react';
import Button from './Button';
import AnchorLink from './AnchorLink';
import Logo from '../assets/icons/logo.svg?react';
import ChevronDown from '../assets/icons/chevron-down.svg?react';

const menus = {
  solutions: [
    { label: 'APMs', href: '/apms' },
    { label: 'Cards', href: '/cards' },
    { label: 'Open Banking', href: '/open-banking' },
    { label: 'Chargeback Mitigation', href: '/chargeback' },
    { label: 'Smart Orchestration', href: '/smart-orchestration' },
    { label: 'Payouts', href: '/payouts' },
  ],
  company: [
    { label: 'About Us', href: '/about-us' },
    { label: 'Contact Us', href: '#footer' },
    { label: 'Blog', href: '#footer' },
  ],
};

export default function Header() {
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef(null);
  const closeTimer = useRef(null);

  useEffect(() => {
    const close = (event) => {
      if (!headerRef.current?.contains(event.target)) setOpenMenu(null);
    };
    document.addEventListener('pointerdown', close);
    return () => {
      document.removeEventListener('pointerdown', close);
      clearTimeout(closeTimer.current);
    };
  }, []);

  const toggle = (name) => setOpenMenu((current) => (current === name ? null : name));

  // На мыши меню открывается по наведению, но закрывается с задержкой:
  // иначе оно схлопывается, пока курсор идёт от пункта к самому меню.
  const canHover = () => window.matchMedia('(hover: hover)').matches;

  const openOnHover = (name) => {
    if (!canHover()) return;
    clearTimeout(closeTimer.current);
    setOpenMenu(name);
  };

  const closeOnHover = () => {
    if (!canHover()) return;
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 220);
  };

  return (
    <header className="header" ref={headerRef}>
      <div className="container header__inner">
        <AnchorLink href="/" className="header__logo" aria-label="Tuskpay home">
          <Logo role="img" title="Tuskpay" />
        </AnchorLink>

        <nav className={`header__nav ${mobileOpen ? 'is-open' : ''}`} aria-label="Main navigation">
          {Object.entries(menus).map(([key, items]) => (
            <div
              className={`nav-dropdown ${openMenu === key ? 'is-open' : ''}`}
              key={key}
              onMouseEnter={() => openOnHover(key)}
              onMouseLeave={closeOnHover}
            >
              <button
                className="nav-dropdown__trigger"
                type="button"
                aria-expanded={openMenu === key}
                onClick={() => toggle(key)}
              >
                <span>{key.toUpperCase()}</span>
                <ChevronDown className="nav-dropdown__chevron" aria-hidden="true" focusable="false" />
              </button>
              <div className="nav-dropdown__menu">
                {items.map((item) => (
                  <AnchorLink href={item.href} key={item.label} onClick={() => { setOpenMenu(null); setMobileOpen(false); }}>
                    {item.label}
                  </AnchorLink>
                ))}
              </div>
            </div>
          ))}
          <Button href={CALENDLY_URL} onClick={(event) => { if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return; event.preventDefault(); openCalendly(); }} className="header__cta" noArrow>Book a call</Button>
        </nav>

        <button
          className="menu-toggle"
          type="button"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
