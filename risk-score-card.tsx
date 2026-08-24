'use client'

import { useEffect, useState } from 'react'
import type { AnalysisResult } from '@/lib/contract-analysis'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

function bandStyles(band: AnalysisResult['band']) {
  switch (band) {
    case 'Critical Risk':
      return { ring: 'text-risk-high', badge: 'bg-risk-high/15 text-risk-high border-risk-high/30' }
    case 'High Risk':
      return { ring: 'text-risk-high', badge: 'bg-risk-high/15 text-risk-high border-risk-high/30' }
    case 'Moderate Risk':
      return { ring: 'text-risk-med', badge: 'bg-risk-med/15 text-risk-med border-risk-med/30' }
    default:
      return { ring: 'text-risk-safe', badge: 'bg-risk-safe/15 text-risk-safe border-risk-safe/30' }
  }
}

export function RiskScoreCard({ result }: { result: AnalysisResult }) {
  const styles = bandStyles(result.band)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    setDisplay(0)
    const start = performance.now()
    const duration = 900
    let raf = 0
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplay(Math.round(eased * result.score))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [result.score])

  const radius = 52
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (display / 100) * circumference

  return (
    <Card className="glow-border flex flex-col items-center gap-5 p-6 sm:flex-row sm:gap-8 sm:p-8">
      <div className="relative flex size-32 shrink-0 items-center justify-center">
        <svg className="size-32 -rotate-90" viewBox="0 0 120 120" aria-hidden="true">
          <circle cx="60" cy="60" r={radius} fill="none" stroke="var(--border)" strokeWidth="9" />
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            className={styles.ring}
            stroke="currentColor"
            strokeWidth="9"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 0.1s linear' }}
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-3xl font-semibold tabular-nums">{display}</span>
          <span className="text-xs text-muted-foreground">/ 100</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center gap-2 text-center sm:items-start sm:text-left">
        <span
          className={cn(
            'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-semibold',
            styles.badge,
          )}
        >
          <span className="size-1.5 rounded-full bg-current" />
          {result.band}
        </span>
        <h2 className="text-xl font-semibold tracking-tight">Overall Risk Score</h2>
        <p className="max-w-prose text-pretty text-sm leading-relaxed text-muted-foreground">
          {result.summary}
        </p>
      </div>
    </Card>
  )
}
