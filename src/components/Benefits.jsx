import Protected from '../assets/icons/protected.svg?react';
import Scale from '../assets/icons/scale.svg?react';
import Experts from '../assets/icons/experts.svg?react';

const benefits = [
  {
    Image: Protected,
    title: 'Protected by default',
    text: 'Smart routing and built-in fraud controls help reduce chargebacks, protect every transaction, and keep approval rates moving up.',
  },
  {
    Image: Scale,
    title: 'Built to scale',
    text: 'Connect through one straightforward integration, enter new markets faster, and handle growing volumes without rebuilding your payment stack.',
  },
  {
    Image: Experts,
    title: 'Experts in your corner',
    text: 'Get direct support from payment specialists who understand hard verticals and know how to keep complex businesses moving.',
  },
];

export default function Benefits() {
  return (
    <section className="section benefits">
      <div className="container">
        <h2 className="section-title">BUILT FOR<br />BUSINESS GROWTH</h2>
        <div className="benefits__grid">
          {benefits.map(({ Image, title, text }) => (
            <article className="benefit-card" key={title}>
              <div className="benefit-card__image-wrap">
                <Image aria-hidden="true" focusable="false" />
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
