'use client'

import type { MissingProtection } from '@/lib/contract-analysis'
import { Card } from '@/components/ui/card'
import { ShieldAlert, Square } from 'lucide-react'

export function MissingProtections({ missing }: { missing: MissingProtection[] }) {
  return (
    <Card className="flex flex-col gap-4 p-5">
      <div className="flex items-center gap-2">
        <ShieldAlert className="size-4 text-risk-med" />
        <h3 className="text-base font-semibold tracking-tight">Missing Critical Protections</h3>
      </div>

      {missing.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          All key protections are present in this contract.
        </p>
      ) : (
        <ul className="flex flex-col divide-y divide-border/70">
          {missing.map((m) => (
            <li key={m.id} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
              <Square className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">{m.title}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">{m.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}
