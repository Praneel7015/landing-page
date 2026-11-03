import { useSyncExternalStore } from 'react';

// The theme lives on <html data-theme>, set before hydration by the inline
// script in _document and changed by ThemeToggle. Reading it through
// useSyncExternalStore keeps every reader in sync without setState in effects.
function subscribeToTheme(onChange) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  return () => observer.disconnect();
}

const getTheme = () => document.documentElement.getAttribute('data-theme') || 'light';
const getServerTheme = () => 'light';

export function useDocumentTheme() {
  return useSyncExternalStore(subscribeToTheme, getTheme, getServerTheme);
}

const subscribeNoop = () => () => {};

// false during SSR and hydration, true afterwards.
export function useHasMounted() {
  return useSyncExternalStore(subscribeNoop, () => true, () => false);
}
