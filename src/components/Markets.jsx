import Button from './Button';
import CtaBg from '../assets/icons/cta-bg.svg?react';
import AnimatedMap from './AnimatedMap';

const markets = [
  { id: 'canada', country: 'Canada', status: 'active' },
  { id: 'europe', country: 'Europe', status: 'approved' },
  { id: 'australia', country: 'Australia', status: 'connected' },
];

export default function Markets() {
  return (
    <section className="markets-section">
      <div className="container">
        <div className="markets-card">
          <CtaBg className="markets-card__bg" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false" />
          <div className="markets-card__copy">
            <h2>ONE INTEGRATION.<br /><span>EVERY MARKET THAT<br />SAYS YES.</span></h2>
            <p>Launch faster and manage global payments through one integration.</p>
            <Button href="/form">Get started</Button>
          </div>
          <div className="markets-card__map" aria-label="Global payment coverage map">
            <AnimatedMap />
            {markets.map(({ id, country, status }) => (
              <div className={`market-label market-label--${id}`} key={id}>
                <span className="market-label__dot" aria-hidden="true" />
                {country} - {status}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
