import { useEffect, useId, useState } from 'react';
import MapBase from '../assets/icons/map-base.svg?react';

export default function AnimatedMap() {
  const gradientId = `map-flow-${useId().replace(/:/g, '')}`;
  const [motion, setMotion] = useState(false);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setMotion(!preference.matches);
    update();
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);

  return (
    <div className="animated-map">
      <MapBase className="markets-card__map-base" role="img" title="World map" />
      <svg className="animated-map__route" viewBox="0 0 636 349" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id={gradientId} x1="89" y1="108" x2="534" y2="278" gradientUnits="userSpaceOnUse" spreadMethod="reflect">
            <stop stopColor="#CEEE6A" stopOpacity=".12" />
            <stop offset=".45" stopColor="#CEEE6A" />
            <stop offset=".6" stopColor="#f1ffb4" />
            <stop offset="1" stopColor="#CEEE6A" stopOpacity=".12" />
            {motion && <animateTransform attributeName="gradientTransform" type="translate" values="-220 -84;220 84;-220 -84" dur="7s" repeatCount="indefinite" calcMode="spline" keyTimes="0;.5;1" keySplines=".42 0 .58 1;.42 0 .58 1" />}
          </linearGradient>
        </defs>
        <path d="M534 278C499.167 259.834 405.7 213.8 310.5 175C215.3 136.2 118.833 109.5 89 108" stroke={`url(#${gradientId})`} strokeWidth="2" strokeLinecap="round" fill="none" />
      </svg>
    </div>
  );
}
