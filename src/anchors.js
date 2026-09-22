// Программный скролл по секциям вместо нативных hash-якорей — URL остаётся чистым.
// Шапка position:absolute и при скролле уезжает вверх, поэтому поправка на её высоту не нужна.

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Скролл откладываем на кадр, чтобы React успел перестроить разметку:
// перестройка посреди плавной анимации отменяет её. В скрытой вкладке кадров нет —
// там выполняем сразу, иначе скролл не случится вовсе.
const onNextFrame = (fn) => {
  if (document.visibilityState === 'hidden') fn();
  else requestAnimationFrame(fn);
};

export function scrollToAnchor(href) {
  const id = String(href).replace(/^#/, '');
  if (!id) return false;

  const target = document.getElementById(id);
  if (!target) return false;

  onNextFrame(() => {
    const top = target.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: Math.max(top, 0),
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    });
  });

  return true;
}

export function isAnchor(href) {
  return typeof href === 'string' && href.startsWith('#') && href.length > 1;
}

export function isInternalPath(href) {
  return typeof href === 'string' && href.startsWith('/') && !href.startsWith('//');
}

export function scrollToTop() {
  onNextFrame(() => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    });
  });
}
