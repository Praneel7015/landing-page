import { useCallback } from 'react';

export default function OutboundLink({
  href,
  eventName = 'outbound-click',
  children,
  ...rest
}) {
  const onClick = useCallback(() => {
    if (typeof window === 'undefined') return;
    if (window.umami?.track) {
      window.umami.track(eventName, { href });
    }
  }, [href, eventName]);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      {...rest}
    >
      {children}
    </a>
  );
}
