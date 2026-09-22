import { useEffect, useRef, useState } from 'react';
import PageLabel from './PageLabel';
import Button from './Button';
import Solutions from './Solutions';
import cards from '../assets/cards.png';
import panel from '../assets/Group 119.svg';
import secure from '../assets/Group 102.svg';
import cashFlow from '../assets/Group 131.svg';
import integration from '../assets/Group 95.svg';
import received from '../assets/in.svg';
import sent from '../assets/out.svg';
import './OpenBankingPage.css';

const benefits = [
  { icon: secure, title: 'Secure by design', text: 'Customers approve payments through their own bank, using familiar authentication to complete their purchase.' },
  { icon: cashFlow, title: 'Keep cash flow moving', text: 'Support faster access to funds with direct bank payments and less reliance on card settlement cycles.' },
  { icon: integration, title: 'Built around your business', text: 'Bring bank payments into your existing checkout with flexible integration that supports your business needs.' },
];
const steps = [
  ['Select pay by bank', 'Customers choose Open Banking at checkout.'],
  ['Choose a bank', 'They select their bank from the available options.'],
  ['Approve the payment', 'They securely sign in and authorise the payment through their bank.'],
  ['Back to checkout', 'They return to your website with confirmation of their payment status.'],
];

export default function OpenBankingPage() {
  const ctaRef = useRef(null);
  const [ctaVisible, setCtaVisible] = useState(false);
  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motion.matches || !('IntersectionObserver' in window)) {
      setCtaVisible(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setCtaVisible(true); observer.disconnect(); }
    }, { threshold: 0.2 });
    observer.observe(ctaRef.current);
    const onMotionChange = () => {
      if (motion.matches) { setCtaVisible(true); observer.disconnect(); }
    };
    motion.addEventListener('change', onMotionChange);
    return () => { observer.disconnect(); motion.removeEventListener('change', onMotionChange); };
  }, []);

  return (
    <>
      <section className="ob-hero" id="top">
        <div className="container ob-hero__inner">
          <div className="ob-hero__copy">
            <PageLabel>Open Banking</PageLabel>
            <h1>DIRECT PAYMENTS.<br /><span>SIMPLER CHECKOUT.</span></h1>
            <p>Let customers pay directly from their bank accounts through a simple, secure flow — no card details needed.</p>
            <Button href="/form">Get started</Button>
          </div>
          <div className="ob-hero__visual">
            <img className="ob-hero__panel" src={panel} alt="" />
            <img className="ob-hero__cards" src={cards} alt="Hand balancing two green payment cards" />
            <img className="ob-hero__received" src={received} alt="$4,290.00 received" />
            <img className="ob-hero__sent" src={sent} alt="$2,780.00 sent" />
          </div>
        </div>
      </section>

      <section className="ob-benefits" id="open-banking-benefits">
        <div className="container">
          <h2 className="section-title">LESS FRICTION.<br />MORE CONTROL.</h2>
          <div className="ob-benefits__grid">
            {benefits.map(({ icon, title, text }) => (
              <article className="ob-benefit" key={title}>
                <div className="ob-benefit__icon"><img src={icon} alt="" /></div>
                <h3>{title}</h3><p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div ref={ctaRef} className={`ob-cta-reveal${ctaVisible ? ' is-visible' : ''}`}><section className="ob-cta">
        <div className="container">
          <h2 className="section-title">CONNECT YOUR CHECKOUT.<br />LET CUSTOMERS PAY BY BANK.</h2>
          <p>Add a direct way to pay and give customers more choice through one simple integration.</p>
          <Button href="/form">Get started</Button>
        </div>
      </section>

      </div>

      <section className="ob-steps">
        <div className="container">
          <h2 className="section-title">PAY BY BANK.<br />FOUR SIMPLE STEPS.</h2>
          <ol className="ob-steps__grid">
            {steps.map(([title, text], index) => (
              <li className="ob-step" key={title}>
                <span className="ob-step__number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <h3>{title}</h3><p>{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <Solutions showChoicePill={false} />
    </>
  );
}
