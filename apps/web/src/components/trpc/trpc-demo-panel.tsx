import { DemoMutationCard } from "./demo-mutation-card";
import { HelloQueryCard } from "./hello-query-card";

export function TrpcDemoPanel() {
  return (
    <aside className="w-[min(100vw-2rem,24rem)] space-y-3">
      <div className="rounded-2xl border border-border/80 bg-sidebar/90 p-4 shadow-[0_20px_70px_-35px_rgba(8,15,32,0.9)] backdrop-blur-2xl">
        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground/70">
          API integration
        </p>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          The dashboard now talks to the Cloudflare Worker through typed tRPC
          query and mutation options.
        </p>
      </div>

      <HelloQueryCard />
      <DemoMutationCard />
    </aside>
  );
}
