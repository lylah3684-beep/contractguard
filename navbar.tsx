'use client'

import { ShieldLogo } from '@/components/shield-logo'
import { cn } from '@/lib/utils'

export type TabKey = 'auditor' | 'pricing' | 'saved'

const TABS: { key: TabKey; label: string }[] = [
  { key: 'auditor', label: 'Auditor' },
  { key: 'pricing', label: 'Pricing' },
  { key: 'saved', label: 'Saved Scans' },
]

export function Navbar({
  active,
  onChange,
  savedCount,
}: {
  active: TabKey
  onChange: (t: TabKey) => void
  savedCount: number
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <button
          type="button"
          onClick={() => onChange('auditor')}
          className="flex items-center gap-2.5"
        >
          <ShieldLogo />
          <span className="text-lg font-semibold tracking-tight">
            Contract<span className="text-primary">Guard</span>
          </span>
        </button>

        <nav aria-label="Primary" className="flex items-center gap-1 rounded-full border border-border bg-card/60 p-1">
          {TABS.map((tab) => {
            const isActive = active === tab.key
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => onChange(tab.key)}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors sm:px-4',
                  isActive
                    ? 'bg-primary/15 text-primary'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {tab.label}
                {tab.key === 'saved' && savedCount > 0 && (
                  <span className="ml-1.5 rounded-full bg-primary/20 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
                    {savedCount}
                  </span>
                )}
              </button>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
