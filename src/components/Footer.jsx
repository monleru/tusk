import { CALENDLY_URL, openCalendly } from '../calendly';
import Button from './Button';
import AnchorLink from './AnchorLink';
import { solutionLinks } from '../data';
import Logo from '../assets/icons/logo.svg?react';
import MailLogo from '../assets/icons/mail-logo.svg?react';

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer__cta-row">
          <h2><span className="footer__ready">READY</span> TO GET STARTED?</h2>
          <Button href={CALENDLY_URL} onClick={(event) => { if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return; event.preventDefault(); openCalendly(); }}>Book a call</Button>
        </div>

        <div className="footer__line" />

        <div className="footer__grid">
          <div className="footer__brand">
            <Logo className="footer__logo" role="img" title="Tuskpay" />
            <div className="footer__socials">
              <a className="footer-icon" href="mailto:hello@tuskpay.com" aria-label="Email Tuskpay">
                <MailLogo aria-hidden="true" focusable="false" />
              </a>
            </div>
            <p className="footer__legal-copy">
              LUZWAY PAYMENT SOLUTIONS LIMITED<br /><br />
              MSB registration number: C100000735 a company incorporated and incorporated in Canada, with registered office at 300-3655 KINGSWAY VANCOUVER BC V5R 5W7 CANADA Incorporation Number: BC1508792<br /><br />
              2026–2027 © Tuskpay. All rights reserved.
            </p>
          </div>

          <div className="footer__column">
            <h3>Solutions</h3>
            {solutionLinks.map((item) => {
              const href = item === 'APMs' ? '/apms' : item === 'Open Banking' ? '/open-banking' : item === 'Smart Orchestration' ? '/smart-orchestration' : item === 'Chargeback Mitigation' ? '/chargeback' : item === 'Payouts' ? '/payouts' : item === 'Cards' ? '/cards' : '#solutions';
              return <AnchorLink href={href} key={item}>{item}</AnchorLink>;
            })}
          </div>
          <div className="footer__column">
            <h3>Company</h3>
            <AnchorLink href="/about-us">About Us</AnchorLink>
            <a href="mailto:hello@tuskpay.com">Contact Us</a>
            <AnchorLink href="#top">Blog</AnchorLink>
          </div>
          <div className="footer__column">
            <h3>Legal</h3>
            <AnchorLink href="/privacy-policy">Privacy policy</AnchorLink>
            <AnchorLink href="#top">Cookies policy</AnchorLink>
            <button className="footer__cookie-settings" type="button" onClick={() => window.dispatchEvent(new Event('open-cookie-settings'))}>Cookie settings</button>
            <AnchorLink href="/terms-of-use">Terms of Service</AnchorLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
