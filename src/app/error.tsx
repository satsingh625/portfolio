'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container flex min-h-[70vh] flex-col items-center justify-center text-center">
      <p className="font-mono text-sm text-accent">Error</p>
      <h1 className="mt-4 text-title font-semibold">Something went wrong</h1>
      <p className="mt-3 max-w-sm text-muted-foreground text-pretty">
        An unexpected error occurred. Try again, or head back home.
      </p>
      <div className="mt-8 flex gap-3">
        <Button onClick={reset}>Try again</Button>
        <Button href="/" variant="secondary">
          Back home
        </Button>
      </div>
    </div>
  );
}
