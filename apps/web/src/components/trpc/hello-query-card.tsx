import { useQuery } from "@tanstack/react-query";

import { Button } from "@workspace/ui/components/button";

import { useTRPC } from "@/lib/trpc";

export function HelloQueryCard() {
  const trpc = useTRPC();
  const helloQuery = useQuery(trpc.hello.queryOptions());

  return (
    <section className="rounded-2xl border border-border/80 bg-card/95 p-4 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.8)] backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground/70">
            Public query
          </p>
          <h2 className="mt-2 text-base font-semibold text-foreground">
            hello
          </h2>
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={() => void helloQuery.refetch()}
          disabled={helloQuery.isFetching}
        >
          Refresh
        </Button>
      </div>

      <div className="mt-4 rounded-xl border border-border/70 bg-background/70 p-3">
        {helloQuery.isPending ? (
          <p className="text-sm text-muted-foreground">
            Loading worker response...
          </p>
        ) : helloQuery.isError ? (
          <p className="text-sm text-destructive">
            {helloQuery.error.message || "Unable to reach the tRPC API."}
          </p>
        ) : (
          <div className="space-y-2 text-sm text-muted-foreground">
            <p className="text-foreground">{helloQuery.data.message}</p>
            <p className="font-mono text-[11px]">{helloQuery.data.timestamp}</p>
          </div>
        )}
      </div>
    </section>
  );
}
