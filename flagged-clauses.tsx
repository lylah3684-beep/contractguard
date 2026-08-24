'use client'

import type { FlaggedClause, RiskLevel } from '@/lib/contract-analysis'
import { Card } from '@/components/ui/card'
import { AlertTriangle, CircleAlert, CircleCheck } from 'lucide-react'
import { cn } from '@/lib/utils'

const GROUPS: {
  level: RiskLevel
  label: string
  icon: typeof AlertTriangle
  accent: string
  dot: string
}[] = [
  { level: 'high', label: 'High Risk', icon: AlertTriangle, accent: 'text-risk-high', dot: 'bg-risk-high' },
  { level: 'medium', label: 'Medium Risk', icon: CircleAlert, accent: 'text-risk-med', dot: 'bg-risk-med' },
  { level: 'safe', label: 'Safe / Standard', icon: CircleCheck, accent: 'text-risk-safe', dot: 'bg-risk-safe' },
]

function ClauseRow({ clause, accent }: { clause: FlaggedClause; accent: string }) {
  return (
    <li className="rounded-lg border border-border/70 bg-background/40 p-3.5">
      <p className={cn('text-sm font-medium', accent)}>{clause.title}</p>
      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{clause.explanation}</p>
    </li>
  )
}

export function FlaggedClauses({ clauses }: { clauses: FlaggedClause[] }) {
  return (
    <section aria-label="Categorized flagged clauses" className="grid gap-4 md:grid-cols-3">
      {GROUPS.map((group) => {
        const items = clauses.filter((c) => c.level === group.level)
        const Icon = group.icon
        return (
          <Card key={group.level} className="flex flex-col gap-3 p-4">
            <div className="flex items-center gap-2">
              <Icon className={cn('size-4', group.accent)} />
              <h3 className="text-sm font-semibold">{group.label}</h3>
              <span
                className={cn(
                  'ml-auto flex size-6 items-center justify-center rounded-full text-xs font-semibold text-background',
                  group.dot,
                )}
              >
                {items.length}
              </span>
            </div>
            {items.length === 0 ? (
              <p className="text-sm text-muted-foreground">None detected.</p>
            ) : (
              <ul className="flex flex-col gap-2">
                {items.map((c) => (
                  <ClauseRow key={c.id} clause={c} accent={group.accent} />
                ))}
              </ul>
            )}
          </Card>
        )
      })}
    </section>
  )
}
