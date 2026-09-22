import { useEffect, useRef, useState } from 'react';
import PageLabel from './PageLabel';
import Button from './Button';
import Solutions from './Solutions';
import PaymentProcessing from '../assets/Group 129.svg?react';
import Routing from '../assets/Group 138.svg?react';
import Security from '../assets/Group 141.svg?react';
import support from '../assets/Group 140.png';
import terminal from '../assets/Frame 252.png';
import activity from '../assets/111.png';
import protection from '../assets/112.png';
import paymentPhoto from '../assets/Group 142.png';
import './SmartOrchestrationPage.css';

const benefits = [
  { Icon: Routing, title: 'Help more payments succeed', text: 'Improve the path to approval with payment routing tailored to your business and customers.' },
  { Icon: Security, title: 'Keep security built in', text: 'Manage payment risks with fraud controls that help protect your business and your customers.' },
  { image: support, title: 'Experts at your side', text: 'Get practical support from payment specialists, from your first integration to everyday operations.' },
];

export default function SmartOrchestrationPage() {
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
    <>
      <section className="so-hero" id="top">
        <div className="container so-hero__inner">
          <div className="so-hero__copy">
            <PageLabel>Smart Orchestration</PageLabel>
            <h1>CARD PAYMENTS.<br />BUILT FOR YOUR BUSINESS.</h1>
            <p>Accept card payments through a flexible setup designed to simplify checkout, manage risk, and support your growth.</p>
            <Button href="/form">Get started</Button>
          </div>
          <div className="so-hero__visual">
            <PaymentProcessing className="so-hero__graphic" role="img" title="Payment processing: payment received, risk check, authorization, settlement" />
          </div>
        </div>
      </section>

      <section className="so-benefits" id="smart-orchestration-benefits">
        <div className="container">
          <h2 className="section-title">SMOOTHER PAYMENTS.<br />STRONGER SUPPORT.</h2>
          <div className="so-benefits__grid">
            {benefits.map(({ Icon, image, title, text }) => (
              <article className="so-benefit" key={title}>
                <div className="so-benefit__icon">
                  {Icon ? <Icon aria-hidden="true" focusable="false" /> : <img src={image} alt="" />}
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div ref={revealRef} className={`so-cta-reveal${revealed ? ' is-visible' : ''}`}><section className="so-cta">
        <div className="container so-cta__inner">
          <div className="so-cta__copy">
            <h2>READY FOR YOUR<br />NEXT TRANSACTION.</h2>
            <p>Bring card payments into your checkout with the flexibility and support to move your business forward.</p>
            <Button href="/form" className="so-cta__button">Get started</Button>
          </div>
          <img className="so-cta__image" src={terminal} alt="Customer paying by card at a payment terminal" loading="lazy" />
        </div>
      </section>

      </div>

      <section className="so-features">
        <div className="container">
          <h2 className="section-title">MORE FLEXIBILITY.<br />GREATER CONTROL.</h2>
          <div className="so-features__row">
            <img src={activity} alt="Payment activity dashboard with a growing payment volume chart" loading="lazy" />
            <div className="so-features__copy">
              <article><h3>ROOM TO GROW</h3><p>We help you manage payments as your business evolves, supporting new opportunities and changing customer needs.</p></article>
              <article><h3>SECURITY IN FOCUS</h3><p>Build a payment setup that helps you manage risk and protect your business and customers.</p></article>
            </div>
          </div>
          <div className="so-features__row so-features__row--reverse">
            <div className="so-features__copy">
              <article><h3>A CLEARER VIEW</h3><p>Make sense of your payment activity, spot areas for improvement, and plan your next steps with confidence.</p></article>
              <article><h3>A SIMPLER CONNECTION</h3><p>Bring payments into your existing setup with a flexible approach built around how your business works.</p></article>
            </div>
            <img src={protection} alt="Payment growth with fraud protection, data security, and regulatory readiness" loading="lazy" />
          </div>
        </div>
      </section>
      <Solutions imageSrc={paymentPhoto} imageAlt="Customer using a payment card while shopping on a laptop" showChoicePill={false} />
    </>
  );
}
