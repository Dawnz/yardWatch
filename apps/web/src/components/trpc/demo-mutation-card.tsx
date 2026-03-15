import { useState } from "react";

import { useMutation } from "@tanstack/react-query";

import { Button } from "@workspace/ui/components/button";

import { useTRPC } from "@/lib/trpc";

export function DemoMutationCard() {
  const [message, setMessage] = useState("");
  const trpc = useTRPC();
  const demoMutation = useMutation(trpc.demo.submit.mutationOptions());

  return (
    <section className="rounded-2xl border border-border/80 bg-card/95 p-4 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.8)] backdrop-blur-xl">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground/70">
          Example mutation
        </p>
        <h2 className="mt-2 text-base font-semibold text-foreground">
          demo.submit
        </h2>
      </div>

      <form
        className="mt-4 space-y-3"
        onSubmit={(event) => {
          event.preventDefault();
          demoMutation.mutate({ text: message });
        }}
      >
        <label className="block space-y-2">
          <span className="text-xs font-medium text-muted-foreground">
            Demo payload
          </span>
          <input
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Enter a short field note"
            className="w-full rounded-xl border border-border bg-background/80 px-3 py-2 text-sm text-foreground outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/40"
          />
        </label>

        <Button type="submit" size="sm" disabled={demoMutation.isPending}>
          {demoMutation.isPending ? "Submitting..." : "Send mutation"}
        </Button>
      </form>

      <div className="mt-4 rounded-xl border border-border/70 bg-background/70 p-3 text-sm">
        {demoMutation.isError ? (
          <p className="text-destructive">
            {demoMutation.error.message || "The mutation request failed."}
          </p>
        ) : demoMutation.data ? (
          <div className="space-y-1 text-muted-foreground">
            <p className="text-foreground">{demoMutation.data.echo}</p>
            <p>Length: {demoMutation.data.length}</p>
            <p className="font-mono text-[11px]">
              {demoMutation.data.receivedAt}
            </p>
          </div>
        ) : (
          <p className="text-muted-foreground">
            Submit any short note to exercise the typed mutation path.
          </p>
        )}
      </div>
    </section>
  );
}
