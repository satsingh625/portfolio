export default function Loading() {
  return (
    <div className="container flex min-h-[60vh] items-center justify-center">
      <div className="flex items-center gap-3 text-muted-foreground">
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-border border-t-foreground" />
        <span className="font-mono text-sm">Loading…</span>
      </div>
    </div>
  );
}
