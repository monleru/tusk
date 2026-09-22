import { useState } from 'react';
import { solutions } from '../data';
import AnchorLink from './AnchorLink';
import ArrowLeft from '../assets/ArrowLeft.svg?react';
import ShieldCheck from '../assets/icons/shield-check.svg?react';

const getSolutionHref = (title) => {
  if (title === 'APMs') return '/apms';
  if (title === 'Open Banking') return '/open-banking';
  if (title === 'Smart Orchestration') return '/smart-orchestration';
  if (title === 'Payouts') return '/payouts';
  if (title === 'Cards') return '/cards';
  if (title === 'Chargeback Mitigation') return '/chargeback';
  return '#footer';
};

export default function Solutions({ imageSrc = '/assets/girl.png', imageAlt = 'Customer making a card payment', showChoicePill = true }) {
  const [active, setActive] = useState(0);

  return (
    <section className="section solutions" id="solutions">
      <div className="container">
        <h2 className="section-title">BUILT FOR<br />EVERY PAYMENT</h2>
        <p className="solutions__intro">
          From accepting local payment methods to routing transactions, preventing chargebacks, and sending payouts — one connected platform built to keep payments moving.
        </p>

        <div className="solutions__layout">
          <div className="solutions__image">
            <img src={imageSrc} alt={imageAlt} />
            {showChoicePill && (
              <div className="choice-pill"><span className="choice-pill__icon"><ShieldCheck aria-hidden="true" focusable="false" /></span> Choose payment method</div>
            )}
          </div>

          <div className="accordion">
            {solutions.map((item, index) => {
              const isActive = active === index;
              return (
                <article className={`accordion__item ${isActive ? 'is-open' : ''}`} key={item.title}>
                  <button className="accordion__trigger" type="button" onClick={() => setActive(isActive ? -1 : index)} aria-expanded={isActive}>
                    <span className="accordion__symbol" aria-hidden="true">{isActive ? '−' : '+'}</span>
                    <span>{item.title}</span>
                    {!isActive && <span className="accordion__round-arrow" aria-hidden="true"><ArrowLeft focusable="false" /></span>}
                  </button>
                  <div className="accordion__body" inert={!isActive}>
                    <div className="accordion__body-inner">
                      <div className="accordion__body-content">
                        <p>{item.description}</p>
                        <AnchorLink href={getSolutionHref(item.title)} className="button button--small">
                          <span>Explore solution</span><ArrowLeft className="button__arrow" aria-hidden="true" focusable="false" />
                        </AnchorLink>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
