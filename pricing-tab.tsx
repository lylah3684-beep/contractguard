'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

const FREE = ['1 free scan / month', 'Standard risk score', 'High/Medium/Safe clause flags', 'Text-only paste input']

const PRO = [
  'Unlimited scans',
  'PDF & DOC parser',
  'Custom counter-clause generator',
  'Redline side-by-side view',
  'Exportable print-ready reports',
  'Saved scan history',
]

export function PricingTab({ onUpgrade }: { onUpgrade: () => void }) {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-balance">
          Protect every contract you sign
        </h1>
        <p className="mx-auto mt-2 max-w-md text-pretty text-sm text-muted-foreground">
          Start free. Upgrade when you are ready to scan unlimited contracts and unlock counter-proposals.
        </p>
      </div>

      <div className="mx-auto grid w-full max-w-3xl gap-5 md:grid-cols-2">
        <Card className="flex flex-col gap-5 p-6">
          <div>
            <h2 className="text-sm font-medium text-muted-foreground">Free</h2>
            <p className="mt-1 flex items-baseline gap-1">
              <span className="text-3xl font-semibold tracking-tight">$0</span>
              <span className="text-sm text-muted-foreground">/ month</span>
            </p>
          </div>
          <ul className="flex flex-col gap-2.5">
            {FREE.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm">
                <Check className="size-4 shrink-0 text-muted-foreground" />
                {f}
              </li>
            ))}
          </ul>
          <Button variant="secondary" className="mt-auto w-full" disabled>
            Current plan
          </Button>
        </Card>

        <Card className={cn('relative flex flex-col gap-5 p-6', 'glow-border border-primary/40')}>
          <span className="absolute -top-2.5 right-5 inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">
            <Sparkles className="size-3" /> Most popular
          </span>
          <div>
            <h2 className="text-sm font-medium text-primary">Pro</h2>
            <p className="mt-1 flex items-baseline gap-1">
              <span className="text-3xl font-semibold tracking-tight">$15</span>
              <span className="text-sm text-muted-foreground">/ month</span>
            </p>
          </div>
          <ul className="flex flex-col gap-2.5">
            {PRO.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm">
                <Check className="size-4 shrink-0 text-primary" />
                {f}
              </li>
            ))}
          </ul>
          <Button onClick={onUpgrade} className="mt-auto w-full gap-1.5 glow-primary">
            Upgrade to Pro
          </Button>
        </Card>
      </div>
    </div>
  )
}
