import { useEffect, useRef, useState } from 'react';
import PageLabel from './PageLabel';
import Button from './Button';
import Solutions from './Solutions';
import ChargebackHeroVisual from '../assets/icons/chargeback-hero-visual.svg?react';
import ArrowFatUp from '../assets/icons/ArrowFatUp.svg?react';
import ArrowFatDown from '../assets/icons/ArrowFatDown.svg?react';
import ChargebackCatch from '../assets/icons/chargeback-catch.svg?react';
import ChargebackRevenue from '../assets/icons/chargeback-revenue.svg?react';
import ChargebackManual from '../assets/icons/chargeback-manual.svg?react';
import ChargebackTrust from '../assets/icons/chargeback-trust.svg?react';

const benefits = [
  {
    Icon: ChargebackCatch,
    title: 'Catch disputes early',
    text: 'Spot chargeback risks before they turn into lost revenue, added fees, and unnecessary headaches.',
  },
  {
    Icon: ChargebackRevenue,
    title: 'Keep more revenue',
    text: 'Reduce preventable losses and protect the money you’ve already earned.',
  },
  {
    Icon: ChargebackManual,
    title: 'Cut manual work',
    text: 'Streamline dispute management so your team can focus on growth — not paperwork.',
  },
  {
    Icon: ChargebackTrust,
    title: 'Protect customer trust',
    text: 'Resolve disputes faster and fairly, without turning good customers into lost ones.',
  },
];

function ChargebackHero() {
  return (
    <section className="cb-hero" id="top">
      <div className="container cb-hero__inner">
        <div className="cb-hero__copy">
            <PageLabel>Chargeback Mitigation</PageLabel>
          <h1>STOP CHARGEBACKS.<br /><span>BEFORE THEY HIT.</span></h1>
          <p>Catch disputes early, reduce revenue loss, and protect your merchant account — without burying your team in manual work.</p>
          <Button href="/form">Get started</Button>
        </div>
        <div className="cb-hero__visual" aria-label="Chargeback monitoring dashboard">
          <ChargebackHeroVisual className="cb-hero__graphic" role="img" title="Chargeback monitoring dashboard" />
        </div>
      </div>
    </section>
  );
}

function ChargebackBenefits() {
  return (
    <section className="cb-benefits" id="chargeback-benefits">
      <div className="container">
        <h2 className="section-title">LESS DAMAGE.<br />MORE CONTROL.</h2>
        <div className="cb-benefits__grid">
          {benefits.map(({ Icon, title, text }) => (
            <article className="cb-benefit" key={title}>
              <Icon aria-hidden="true" focusable="false" />
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ChargebackCta() {
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
    <div ref={revealRef} className={`cb-cta-reveal${revealed ? ' is-visible' : ''}`}><section className="cb-cta">
      <div className="container cb-cta__inner">
        <div className="cb-cta__copy">
          <h2>KEEP THE REVENUE.<br />LOSE THE DISPUTES.</h2>
          <p>Chargebacks don’t have to be the cost of doing business. Put smarter protection between every transaction and your bottom line.</p>
          <Button href="/form" className="cb-cta__button">Get started</Button>
        </div>
        <div className="cb-cta__visual">
          <img src="/assets/man2.png" alt="Customer checking a payment on his phone" />
          <div className="cb-transaction cb-transaction--sent"><ArrowFatUp aria-hidden="true" focusable="false" /><strong>$2,780.00</strong><small>sent</small></div>
          <div className="cb-transaction cb-transaction--received"><ArrowFatDown aria-hidden="true" focusable="false" /><strong>$3,500.00</strong><small>received</small></div>
        </div>
      </div>
    </section>
    </div>
  );
}

export default function ChargebackPage() {
  return (
    <>
      <ChargebackHero />
      <ChargebackBenefits />
      <ChargebackCta />
      <Solutions />
    </>
  );
}
