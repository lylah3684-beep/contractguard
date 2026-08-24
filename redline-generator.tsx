'use client'

import type { FlaggedClause } from '@/lib/contract-analysis'
import { Card } from '@/components/ui/card'
import { CopyButton } from '@/components/copy-button'
import { ArrowRight, PenLine } from 'lucide-react'
import { cn } from '@/lib/utils'

export function RedlineGenerator({ clauses }: { clauses: FlaggedClause[] }) {
  const withCounters = clauses.filter((c) => c.counter)

  if (withCounters.length === 0) return null

  return (
    <section aria-label="Redline and counter-proposal generator" className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <PenLine className="size-4 text-primary" />
        <h3 className="text-base font-semibold tracking-tight">Redline &amp; Counter-Proposals</h3>
      </div>

      <div className="flex flex-col gap-4">
        {withCounters.map((c) => (
          <Card key={c.id} className="overflow-hidden p-0">
            <div className="flex items-center justify-between gap-3 border-b border-border/70 px-4 py-3">
              <span
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold',
                  c.level === 'high'
                    ? 'bg-risk-high/15 text-risk-high'
                    : 'bg-risk-med/15 text-risk-med',
                )}
              >
                {c.title}
              </span>
              <CopyButton value={c.counter as string} label="Copy counter-clause" />
            </div>

            <div className="grid gap-0 md:grid-cols-[1fr_auto_1fr]">
              <div className="p-4">
                <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-risk-high">
                  Original clause
                </p>
                <p className="rounded-md bg-risk-high/5 p-3 text-sm leading-relaxed text-muted-foreground line-through decoration-risk-high/40">
                  {c.original}
                </p>
              </div>

              <div className="flex items-center justify-center px-1 py-2 md:flex-col">
                <ArrowRight className="size-4 text-primary md:rotate-0 rotate-90" />
              </div>

              <div className="p-4">
                <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-risk-safe">
                  Freelancer-safe counter
                </p>
                <p className="rounded-md bg-risk-safe/5 p-3 text-sm leading-relaxed text-foreground">
                  {c.counter}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}
