'use client';

import { useEffect } from 'react';

/**
 * Registers a global hotkey. Example: useHotkey('k', onOpen, { meta: true }).
 * `meta` matches ⌘ on macOS and Ctrl elsewhere.
 */
export function useHotkey(
  key: string,
  handler: (e: KeyboardEvent) => void,
  options: { meta?: boolean } = {},
): void {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const metaMatch = options.meta ? e.metaKey || e.ctrlKey : true;
      if (e.key.toLowerCase() === key.toLowerCase() && metaMatch) {
        handler(e);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [key, handler, options.meta]);
}
