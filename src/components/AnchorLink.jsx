import { Link, useLocation } from 'react-router-dom';
import { isAnchor, isInternalPath, scrollToAnchor, scrollToTop } from '../anchors';

// Одна ссылка на два случая: путь отдаём роутеру, якорь скроллим сами —
// хеш в URL не пишется, а href остаётся в разметке (доступность, Cmd+клик, «открыть в новой вкладке»).
export default function AnchorLink({ href = '#', onClick, children, ...rest }) {
  const { pathname } = useLocation();

  const isPlainClick = (event) =>
    !event.defaultPrevented &&
    !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey &&
    event.button === 0;

  if (isInternalPath(href)) {
    const handleLinkClick = (event) => {
      onClick?.(event);
      if (!isPlainClick(event)) return;

      // уже на этой странице — просто возвращаемся наверх
      if (href === pathname) {
        event.preventDefault();
        scrollToTop();
      }
    };

    return (
      <Link to={href} onClick={handleLinkClick} {...rest}>
        {children}
      </Link>
    );
  }

  const handleAnchorClick = (event) => {
    onClick?.(event);
    if (!isPlainClick(event)) return;
    if (!isAnchor(href)) return;

    if (scrollToAnchor(href)) event.preventDefault();
  };

  return (
    <a href={href} onClick={handleAnchorClick} {...rest}>
      {children}
    </a>
  );
}
