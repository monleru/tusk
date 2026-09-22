import AnchorLink from './AnchorLink';
import ArrowLeft from '../assets/ArrowLeft.svg?react';

export default function Button({ children, href = '#', className = '', noArrow = false, onClick }) {
  return (
    <AnchorLink className={`button ${className}`} href={href} onClick={onClick}>
      <span>{children}</span>
      {!noArrow && <ArrowLeft aria-hidden="true" focusable="false" className="button__arrow" />}
    </AnchorLink>
  );
}
