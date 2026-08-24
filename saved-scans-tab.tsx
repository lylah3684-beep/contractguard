'use client'

import type { AnalysisResult } from '@/lib/contract-analysis'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileClock, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface SavedScan {
  id: string
  savedAt: number
  result: AnalysisResult
}

function bandColor(band: AnalysisResult['band']) {
  if (band === 'Critical Risk' || band === 'High Risk') return 'text-risk-high bg-risk-high/15'
  if (band === 'Moderate Risk') return 'text-risk-med bg-risk-med/15'
  return 'text-risk-safe bg-risk-safe/15'
}

export function SavedScansTab({
  scans,
  onOpen,
  onDelete,
}: {
  scans: SavedScan[]
  onOpen: (scan: SavedScan) => void
  onDelete: (id: string) => void
}) {
  if (scans.length === 0) {
    return (
      <Card className="flex flex-col items-center gap-3 p-12 text-center">
        <span className="flex size-12 items-center justify-center rounded-full bg-secondary text-muted-foreground">
          <FileClock className="size-6" />
        </span>
        <div>
          <h2 className="text-base font-semibold">No saved scans yet</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Run an analysis in the Auditor tab and click “Save Scan” to keep it here.
          </p>
        </div>
      </Card>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-semibold tracking-tight">Saved Scans</h1>
      <ul className="flex flex-col gap-3">
        {scans.map((scan) => (
          <li key={scan.id}>
            <Card className="flex items-center gap-4 p-4">
              <span
                className={cn(
                  'flex size-12 shrink-0 flex-col items-center justify-center rounded-lg font-semibold tabular-nums',
                  bandColor(scan.result.band),
                )}
              >
                {scan.result.score}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{scan.result.band}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {scan.result.clauses.filter((c) => c.level === 'high').length} high-risk ·{' '}
                  {scan.result.missing.length} missing · {new Date(scan.savedAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <Button size="sm" variant="secondary" onClick={() => onOpen(scan)}>
                  View
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => onDelete(scan.id)}
                  aria-label="Delete scan"
                  className="text-muted-foreground hover:text-risk-high"
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  )
}
