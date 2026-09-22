import { useEffect, useRef, useState } from 'react';
import PageLabel from './PageLabel';
import Button from './Button';
import Solutions from './Solutions';
import PayoutHub from '../assets/Group 126.svg?react';
import GlobalReach from '../assets/Group 108.svg?react';
import FastPayout from '../assets/Group 146.svg?react';
import SimplePayout from '../assets/Group 143.svg?react';
import './PayoutsPage.css';

const benefits = [
  { Icon: FastPayout, title: 'Pay people faster', text: 'Help recipients access their money sooner with card payouts designed for speed and convenience.' },
  { Icon: GlobalReach, title: 'Support your global reach', text: 'Manage payouts to customers and partners across markets as your business grows.' },
  { Icon: SimplePayout, title: 'Keep payouts simple', text: 'Bring payouts into your existing workflow through one flexible integration.' },
];
const steps = [['Add a card', 'Enter where the money should go.'], ['Send funds', 'We handle the transfer securely.'], ['Money arrives', 'The recipient gets confirmation when funds land.']];

export default function PayoutsPage() {
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
      <section className="po-hero" id="top">
        <div className="container po-hero__inner">
          <div className="po-hero__copy">
            <PageLabel>Payouts</PageLabel>
            <h1>MOVE MONEY.<br />KEEP BUSINESS MOVING.</h1>
            <p>Send funds to cards in minutes, with flexible payouts for freelancers, platforms, and customers around the world.</p>
            <Button href="/form">Get started</Button>
          </div>
          <div className="po-hero__visual">
            <PayoutHub className="po-hero__graphic" role="img" title="Payout hub sending funds to customers, partners, suppliers and freelancers around the world" />
          </div>
        </div>
      </section>
      <section className="po-benefits" id="payout-benefits">
        <div className="container">
          <h2 className="section-title">LESS WAITING.<br />MORE POSSIBILITIES.</h2>
          <div className="po-benefits__grid">
            {benefits.map(({ Icon, title, text }) => (
              <article className="po-benefit" key={title}>
                <div className="po-benefit__icon"><Icon aria-hidden="true" focusable="false" /></div>
                <h3>{title}</h3><p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <div ref={ctaRef} className={`po-cta-reveal${ctaVisible ? ' is-visible' : ''}`}><section className="po-cta">
        <div className="container">
          <h2 className="section-title">YOUR PAYOUTS.<br />YOUR PEOPLE. ONE CONNECTION.</h2>
          <p>Simplify how you send money to customers, freelancers, and partners with payouts built around your business.</p>
          <Button href="/form">Get started</Button>
        </div>
      </section>
      </div>
      <section className="po-steps">
        <div className="container">
          <h2 className="section-title">PAY OUT IN 3 STEPS</h2>
          <ol className="po-steps__grid">{steps.map(([title, text], index) => (
            <li className="po-step" key={title}><span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{text}</p></li>
          ))}</ol>
        </div>
      </section>
      <Solutions imageSrc="/assets/apm-payment.jpg" imageAlt="Customer making an online payment with a bank card" showChoicePill={false} />
    </>
  );
}
