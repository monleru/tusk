import { useEffect, useRef, useState } from 'react';
import PageLabel from './PageLabel';
import Button from './Button';
import Solutions from './Solutions';
import GlobalReach from '../assets/Group 1108.svg?react';
import FastPayout from '../assets/Group 146.svg?react';
import SimplePayout from '../assets/Group 143.svg?react';
import GrowthBadge from '../assets/Frame 199.svg?react';
import cards from '../assets/image 106.png';
import activity from '../assets/Group 1109.png';
import globalPayments from '../assets/Group 152.png';
import paymentPhoto from '../assets/Group 142.png';
import './CardsPage.css';

const benefits = [
  { Icon: FastPayout, title: 'Help more payments go through', text: 'Use smart routing and processing logic to improve the path to approval.' },
  { Icon: GlobalReach, title: 'Keep risk under control', text: 'Built-in fraud and risk tools help protect every transaction without adding unnecessary friction.' },
  { Icon: SimplePayout, title: 'Ready for global growth', text: 'Support card payments across markets with infrastructure built to scale with your business.' },
];

export default function CardsPage() {
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
      <section className="cards-hero" id="top">
        <div className="container cards-hero__inner">
          <div className="cards-hero__copy">
            <PageLabel>Cards</PageLabel>
            <h1>CARD PAYMENTS.<br /><span>BUILT FOR YOUR BUSINESS.</span></h1>
            <p>Accept card payments with a flexible setup designed to improve approval rates, manage risk, and keep checkout moving.</p>
            <Button href="/form">Get started</Button>
          </div>
          <div className="cards-hero__visual">
            <div className="cards-hero__panel">
              <img className="cards-hero__cards" src={cards} alt="Customers holding different payment cards" />
              <GrowthBadge className="cards-hero__badge" aria-hidden="true" focusable="false" />
            </div>
          </div>
        </div>
      </section>

      <section className="cards-benefits" id="cards-benefits">
        <div className="container">
          <h2 className="section-title">MORE APPROVALS.<br />LESS FRICTION.</h2>
          <div className="cards-benefits__grid">
            {benefits.map(({ Icon, title, text }) => (
              <article className="cards-benefit" key={title}>
                <div className="cards-benefit__icon"><Icon aria-hidden="true" focusable="false" /></div>
                <h3>{title}</h3><p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div ref={ctaRef} className={`cards-cta-reveal${ctaVisible ? ' is-visible' : ''}`}><section className="cards-cta">
        <div className="container">
          <h2 className="section-title">CARD PAYMENTS.<br />BUILT AROUND YOUR BUSINESS.</h2>
          <p>Accept, manage, and grow card payments through one flexible connection.</p>
          <Button href="/form">Get started</Button>
        </div>
      </section>

      </div>

      <section className="cards-features">
        <div className="container">
          <h2 className="section-title">SEE MORE.<br />CONTROL MORE.</h2>
          <div className="cards-features__row">
            <img className="cards-features__activity" src={activity} alt="Payment performance showing net volume and a 98.2 percent success rate" loading="lazy" />
            <div className="cards-features__copy">
              <article><h3>HIGHER APPROVALS</h3><p>Improve transaction success with smarter routing and processing built around your business.</p></article>
              <article><h3>LESS PAYMENT FRICTION</h3><p>Keep checkout moving with a smoother card payment experience for your customers.</p></article>
            </div>
          </div>
          <div className="cards-features__row cards-features__row--global">
            <div className="cards-features__copy">
              <article><h3>RISK UNDER CONTROL</h3><p>Use built-in fraud and risk tools to protect payments without adding unnecessary complexity.</p></article>
              <article><h3>CLEARER PERFORMANCE</h3><p>Track payment activity, spot issues faster, and understand where there’s room to improve.</p></article>
            </div>
            <img className="cards-features__global" src={globalPayments} alt="Mobile app for managing global payments with easy integration" loading="lazy" />
          </div>
        </div>
      </section>
      <Solutions imageSrc={paymentPhoto} imageAlt="Customer making an online payment with a bank card" showChoicePill={false} />
    </>
  );
}
