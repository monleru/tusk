import Button from './Button';
import HeroBg from '../assets/icons/hero-bg.svg?react';
import ArrowFatUp from '../assets/icons/ArrowFatUp.svg?react';
import ArrowFatDown from '../assets/icons/ArrowFatDown.svg?react';
import Mastercard from '../assets/Frame 329.svg?react';
import Apms from '../assets/Frame 247.svg?react';
import ApplePay from '../assets/Apple_Pay_logo 1.svg?react';
import GooglePay from '../assets/Google_Pay_Logo 2.svg?react';
import OpenBanking from '../assets/Frame 248.svg?react';

import Visa from '../assets/Group 1112.svg?react';

const paymentLogos = [
  [Apms, 'APMs'],
  [Mastercard, 'Mastercard'],
  [Visa, 'Visa'],
  [ApplePay, 'Apple Pay'],
  [GooglePay, 'Google Pay'],
  [OpenBanking, 'Open Banking'],
];

export default function Hero() {
  return (
    <section className="hero" id="top">
      <HeroBg className="hero__bg" preserveAspectRatio="xMidYMin slice" aria-hidden="true" focusable="false" />

      <div className="container hero__content">
        <div className="hero__copy">
          <h1>
            PAYMENTS
            <br />
            <span>THAT DON'T SAY NO</span>
          </h1>
          <p>
            Flexible payment infrastructure designed to help businesses grow, enter new markets, and manage risk with confidence.
          </p>
          <Button href="/form">Get started</Button>
        </div>

        <div className="hero__visual" aria-label="Payment notifications">
          <div className="hero-card">
            <img src="/assets/man.png" alt="Man using a phone" className="hero-card__person" />
            <div className="transaction transaction--sent">
              <ArrowFatUp className="transaction__arrow" aria-hidden="true" focusable="false" />
              <strong>$2,780.00</strong>&nbsp; sent
            </div>
            <div className="transaction transaction--received">
              <ArrowFatDown className="transaction__arrow" aria-hidden="true" focusable="false" />
              <strong>$3,500.00</strong>&nbsp; received
            </div>
          </div>
        </div>
      </div>

      <div className="container payment-strip" aria-label="Supported payment methods">
        {paymentLogos.map(([LogoComponent, label]) => (
          <LogoComponent role="img" title={label} key={label} />
        ))}
      </div>
    </section>
  );
}
