export const CALENDLY_URL = 'https://calendly.com/tuskpay/30min';
const WIDGET_CSS = 'https://assets.calendly.com/assets/external/widget.css';
const WIDGET_JS = 'https://assets.calendly.com/assets/external/widget.js';
let loading;
let opening = false;

function ensureCalendly() {
  if (loading) return loading;
  loading = new Promise((resolve, reject) => {
    if (!document.querySelector('link[data-calendly]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = WIDGET_CSS;
      link.dataset.calendly = 'true';
      document.head.appendChild(link);
    }
    if (window.Calendly?.initPopupWidget) { resolve(); return; }
    let script = document.querySelector('script[data-calendly]');
    const isNew = !script;
    if (!script) {
      script = document.createElement('script');
      script.src = WIDGET_JS;
      script.async = true;
      script.dataset.calendly = 'true';
    }
    const cleanup = () => {
      clearTimeout(timer);
      script.removeEventListener('load', onLoad);
      script.removeEventListener('error', onError);
    };
    const onError = () => { cleanup(); script.remove(); reject(new Error('Calendly could not load')); };
    const onLoad = () => {
      if (!window.Calendly?.initPopupWidget) { onError(); return; }
      cleanup(); resolve();
    };
    const timer = setTimeout(onError, 15000);
    script.addEventListener('load', onLoad);
    script.addEventListener('error', onError);
    if (isNew) document.head.appendChild(script);
  }).catch((error) => { loading = undefined; throw error; });
  return loading;
}

export async function openCalendly() {
  if (opening) return;
  opening = true;
  try {
    await ensureCalendly();
    if (!document.querySelector('.calendly-overlay')) window.Calendly.initPopupWidget({ url: CALENDLY_URL });
  } catch {
    window.location.assign(CALENDLY_URL);
  } finally { opening = false; }
}
