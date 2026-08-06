'use client';

import { useEffect, useState } from 'react';

/** Returns true only after the first client render — guards hydration. */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
