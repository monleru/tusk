import AnchorLink from './AnchorLink';
import { useState } from 'react';
import './FormPage.css';

const benefits = [
  ['Flexible setup', 'Solutions built around how your business works.'],
  ['Global payments', 'Accept and move money across markets through one connection.'],
  ['Support when you need it', 'Get practical help from our team from integration onward.'],
];

export default function FormPage() {
  const [status, setStatus] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    setStatus('Your message has not been sent. Please contact hello@tuskpay.com to discuss your business.');
  }

  return (
    <section className="contact-page" id="top">
      <div className="container contact-page__inner">
        <div className="contact-page__copy">
          <h1>LET’S DISCUSS</h1>
          <p className="contact-page__intro">Tell us a little about your business and what you need.<br />We’ll help you find the right setup and next steps.</p>
          <ul className="contact-page__benefits">
            {benefits.map(([title, text]) => <li key={title}><h2>{title}</h2><p>{text}</p></li>)}
          </ul>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-form__field"><label htmlFor="contact-name">Name<span aria-hidden="true">*</span></label><input id="contact-name" name="name" autoComplete="name" placeholder="Alex" maxLength={120} required pattern=".*\S.*" title="Enter your name" /></div>
          <div className="contact-form__field"><label htmlFor="contact-email">Work Email<span aria-hidden="true">*</span></label><input id="contact-email" name="email" type="email" autoComplete="email" placeholder="alex@email.com" maxLength={254} required /></div>
          <div className="contact-form__field"><label htmlFor="contact-company">Company Name</label><input id="contact-company" name="company" autoComplete="organization" placeholder="MegaCorp" maxLength={200} /></div>
          <div className="contact-form__field"><label htmlFor="contact-message">Message</label><textarea id="contact-message" name="message" placeholder="Hi there.." rows={5} maxLength={5000} /></div>
          <div className="contact-form__actions">
            <div className="contact-form__consent"><input id="contact-consent" type="checkbox" name="consent" required aria-labelledby="contact-consent-text" /><span id="contact-consent-text"><label htmlFor="contact-consent">I agree to the </label><AnchorLink href="/terms-of-use">Terms of Use</AnchorLink> and <AnchorLink href="/privacy-policy">Privacy Policy</AnchorLink></span></div>
            <button className="button contact-form__submit" type="submit">Send form</button>
          </div>
          {status && <p className="contact-form__status" role="status">{status} <a href="mailto:hello@tuskpay.com">Email us</a></p>}
        </form>
      </div>
    </section>
  );
}
