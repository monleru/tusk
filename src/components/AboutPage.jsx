import { useEffect, useRef, useState } from 'react';
import { CALENDLY_URL, openCalendly } from '../calendly';
import PageLabel from './PageLabel';
import Button from './Button';
import CtaBg from '../assets/icons/cta-bg.svg?react';
import AnimatedMap from './AnimatedMap';
import AnchorLink from './AnchorLink';
import Flexible from '../assets/Frame 294.svg?react';
import HumanSupport from '../assets/Frame 295.svg?react';
import Secure from '../assets/Frame 297.svg?react';
import Global from '../assets/Frame 296.svg?react';
import Scale from '../assets/Frame 298.svg?react';
import ApmsIcon from '../assets/Group 160.svg?react';
import CardsIcon from '../assets/Group 161.svg?react';
import BankingIcon from '../assets/Group 162.svg?react';
import ChargebackIcon from '../assets/Group 163.svg?react';
import RoutingIcon from '../assets/Group 164.svg?react';
import PayoutsIcon from '../assets/Group 165.svg?react';
import person from '../assets/image 105.png';
import growth from '../assets/Group 153.png';
import support from '../assets/Group 154.png';
import choice from '../assets/Group 158.png';
import './AboutPage.css';

const values = [
  { image: choice, title: 'Flexible by design', text: 'Adapt your payment setup as your business, markets, and customer needs change.' },
  { image: growth, title: 'Built for performance', text: 'Keep payments moving with infrastructure designed for speed, stability, and scale.' },
  { image: support, title: 'Support that stays close', text: 'Get practical help from people who understand payments and your business needs.' },
];
const solutions = [
  { Icon: ApmsIcon, title: 'Card processing', href: '/cards', text: 'Accept card payments through a flexible setup built around your business.' },
  { Icon: CardsIcon, title: 'Alternative payments', href: '/apms', text: 'Offer customers familiar local payment methods across the markets you serve.' },
  { Icon: BankingIcon, title: 'Payouts', href: '/payouts', text: 'Send funds to customers, partners, freelancers, and suppliers through one connection.' },
  { Icon: ChargebackIcon, title: 'Open Banking', href: '/open-banking', text: 'Enable direct bank payments with a simple, secure payment flow.' },
  { Icon: RoutingIcon, title: 'Smart Orchestration', href: '/smart-orchestration', text: 'Route transactions through the right payment path and keep performance under control.' },
  { Icon: PayoutsIcon, title: 'Risk & chargebacks', href: '/chargeback', text: 'Spot payment issues earlier and protect more of the revenue you’ve already earned.' },
];
const traits = [[Flexible, 'Flexible'], [HumanSupport, 'Human support'], [Secure, 'Secure'], [Global, 'Global'], [Scale, 'Built to scale']];

export default function AboutPage() {
  const quoteRef = useRef(null);
  const [quoteVisible, setQuoteVisible] = useState(false);
  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motion.matches || !('IntersectionObserver' in window)) {
      setQuoteVisible(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setQuoteVisible(true); observer.disconnect(); }
    }, { threshold: 0.2 });
    observer.observe(quoteRef.current);
    const onMotionChange = () => {
      if (motion.matches) { setQuoteVisible(true); observer.disconnect(); }
    };
    motion.addEventListener('change', onMotionChange);
    return () => { observer.disconnect(); motion.removeEventListener('change', onMotionChange); };
  }, []);


  return (
    <>
      <section className="about-hero" id="top">
        <div className="container about-hero__inner">
          <div className="about-hero__copy">
            <PageLabel>About Us</PageLabel>
            <h1>PAYMENTS, <span>YOUR WAY.</span></h1>
            <div className="about-hero__description">
              <p>Tuskpay is a modern payment infrastructure platform built to help businesses accept, manage, and move money with more flexibility and control.</p>
              <p>Whether you’re growing locally or expanding into new markets, we give you the infrastructure and support to keep payments moving.</p>
            </div>
            <Button href="/form">Get started</Button>
          </div>
          <div className="about-hero__visual"><div className="about-hero__panel"><img src={person} alt="Smiling business professional pointing upward" /></div></div>
        </div>
        <div className="container about-hero__traits" aria-label="Our approach">
          {traits.map(([Icon, title]) => <Icon key={title} role="img" title={title} />)}
        </div>
      </section>

      <section className="about-values" id="about-platform">
        <div className="container">
          <h2 className="section-title">WHY TUSKPAY</h2>
          <p className="about-values__intro">Payments change as businesses grow. Our infrastructure is designed to move with you — without forcing you into a rigid setup.</p>
          <div className="about-values__grid">
            {values.map(({ image, title, text }) => <article className="about-value" key={title}><div className="about-value__image"><img src={image} alt="" loading="lazy" /></div><h3>{title}</h3><p>{text}</p></article>)}
          </div>
        </div>
      </section>
      <section className="about-market markets-section">
        <div className="container"><div className="markets-card">
          <CtaBg className="markets-card__bg" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false" />
          <div className="markets-card__copy">
            <h2><span>READY TO MOVE</span><br />YOUR PAYMENTS<br />FORWARD?</h2>
            <p>Whether you’re improving an existing payment setup or building something new, we’re here to help.</p>
            <Button href={CALENDLY_URL} onClick={(event) => { if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return; event.preventDefault(); openCalendly(); }}>Book a call</Button>
          </div>
          <div className="markets-card__map" aria-label="Global payment coverage map">
            <AnimatedMap />
            {[['canada', 'Canada', 'active'], ['europe', 'Europe', 'approved'], ['australia', 'Australia', 'connected']].map(([id, country, status]) => <div className={`market-label market-label--${id}`} key={id}><span className="market-label__dot" aria-hidden="true" />{country} - {status}</div>)}
          </div>
        </div></div>
      </section>

      <section className="about-solutions">
        <div className="container">
          <h2 className="section-title">WHAT WE DO</h2>
          <p className="about-solutions__intro">We bring together the tools businesses need to manage payments without adding unnecessary complexity.</p>
          <div className="about-solutions__grid">
            {solutions.map(({ Icon, title, href, text }) => <AnchorLink className="about-solution" href={href} key={title}><Icon aria-hidden="true" focusable="false" /><h3>{title}</h3><p>{text}</p></AnchorLink>)}
          </div>
        </div>
      </section>

      <div ref={quoteRef} className={`about-quote-reveal${quoteVisible ? ' is-visible' : ''}`}><section className="about-quote"><div className="container"><blockquote>GOOD PAYMENT INFRASTRUCTURE<br />SHOULD FEEL INVISIBLE<br />IT JUST WORKS</blockquote></div></section></div>
    </>
  );
}
