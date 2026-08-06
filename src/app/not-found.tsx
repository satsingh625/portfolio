import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="container flex min-h-[70vh] flex-col items-center justify-center text-center">
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="mt-4 text-title font-semibold">Page not found</h1>
      <p className="mt-3 max-w-sm text-muted-foreground text-pretty">
        The page you’re looking for doesn’t exist or may have moved.
      </p>
      <div className="mt-8 flex gap-3">
        <Button href="/">Back home</Button>
        <Button href="/projects" variant="secondary">
          View projects
        </Button>
      </div>
    </div>
  );
}
