import { useEffect, useRef, useState } from 'react';
import PageLabel from './PageLabel';
import Button from './Button';
import Solutions from './Solutions';
import ChoosePay from '../assets/icons/apm-choose-pay.svg?react';
import ReachMore from '../assets/icons/apm-reach.svg?react';
import Conversion from '../assets/icons/apm-conversion.svg?react';
import PaymentChoice from '../assets/icons/apm-choice.svg?react';
import MapBase from '../assets/icons/map-base.svg?react';
import ArrowFatDown from '../assets/icons/ArrowFatDown.svg?react';

const benefits = [
  {
    Icon: ReachMore,
    title: 'Reach more customers',
    text: 'Offer familiar local payment methods across every market you enter.',
  },
  {
    Icon: Conversion,
    title: 'Turn choice into conversion',
    text: 'Reduce payment friction and help more customers complete their purchase.',
  },
  {
    Icon: PaymentChoice,
    title: 'Payment choice, simplified.',
    text: 'Offer the payment methods your customers prefer through one simple connection.',
  },
];

function ApmsHero() {
  return (
    <section className="apm-hero" id="top">
      <div className="container apm-hero__inner">
        <div className="apm-hero__copy">
            <PageLabel>APMs</PageLabel>
          <h1>LOCAL METHODS.<br /><span>GLOBAL REACH.</span></h1>
          <p>Let customers pay with the methods they know and trust — through one simple integration.</p>
          <Button href="/form">Get started</Button>
        </div>

        <div className="apm-hero__visual" aria-label="Alternative payment methods">
          <MapBase className="apm-hero__map" aria-hidden="true" focusable="false" />
          <ChoosePay className="apm-hero__choose" role="img" title="Choose how to pay" />
        </div>
      </div>
    </section>
  );
}

function ApmsBenefits() {
  return (
    <section className="apm-benefits" id="apm-benefits">
      <div className="container">
        <h2 className="section-title">MORE WAYS TO PAY.<br />MORE WAYS TO GROW.</h2>
        <div className="apm-benefits__grid">
          {benefits.map(({ Icon, title, text }) => (
            <article className="apm-benefit" key={title}>
              <div className="apm-benefit__icon">
                <Icon aria-hidden="true" focusable="false" />
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ApmsCta() {
  const revealRef = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motion.matches || !('IntersectionObserver' in window)) {
      setRevealed(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setRevealed(true);
        observer.disconnect();
      }
    }, { threshold: 0.15 });
    observer.observe(revealRef.current);
    const onMotionChange = () => {
      if (motion.matches) { setRevealed(true); observer.disconnect(); }
    };
    motion.addEventListener('change', onMotionChange);
    return () => { observer.disconnect(); motion.removeEventListener('change', onMotionChange); };
  }, []);

  return (
    <div ref={revealRef} className={`apm-cta-reveal${revealed ? ' is-visible' : ''}`}>
    <section className="apm-cta">
      <div className="container apm-cta__inner">
        <div className="apm-cta__copy">
          <h2>ONE INTEGRATION.<br />EVERY WAY TO PAY.</h2>
          <p>Add the payment methods your customers prefer and manage them all through one flexible platform.</p>
          <Button href="/form" className="apm-cta__button">Get started</Button>
        </div>

        <div className="apm-cta__visual">
          <div className="apm-cta__panel" aria-hidden="true" />
          <img src="/assets/apm-woman.png" alt="Customer choosing a payment method" className="apm-cta__woman" />
          <div className="apm-transaction">
            <ArrowFatDown aria-hidden="true" focusable="false" />
            <strong>$3,500.00</strong>
            <small>received</small>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
}

export default function ApmsPage() {
  return (
    <>
      <ApmsHero />
      <ApmsBenefits />
      <ApmsCta />
      <Solutions
        imageSrc="/assets/apm-payment.jpg"
        imageAlt="Customer making an online card payment"
        showChoicePill={false}
      />
    </>
  );
}
