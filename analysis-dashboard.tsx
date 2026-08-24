'use client'

import type { AnalysisResult } from '@/lib/contract-analysis'
import { buildExportText } from '@/lib/contract-analysis'
import { RiskScoreCard } from '@/components/risk-score-card'
import { FlaggedClauses } from '@/components/flagged-clauses'
import { RedlineGenerator } from '@/components/redline-generator'
import { MissingProtections } from '@/components/missing-protections'
import { Button } from '@/components/ui/button'
import { Bookmark, BookmarkCheck, Download } from 'lucide-react'

export function AnalysisDashboard({
  result,
  onSave,
  isSaved,
}: {
  result: AnalysisResult
  onSave?: () => void
  isSaved?: boolean
}) {
  function handleExport() {
    const text = buildExportText(result)
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `contractguard-summary-${result.score}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex animate-fade-up flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Analysis Dashboard</h2>
          <p className="text-sm text-muted-foreground">
            {result.clauses.length} clauses reviewed · {result.missing.length} protections missing
          </p>
        </div>
        <div className="flex gap-2">
          {onSave && (
            <Button type="button" variant="secondary" onClick={onSave} disabled={isSaved} className="gap-1.5">
              {isSaved ? (
                <>
                  <BookmarkCheck className="size-4 text-risk-safe" /> Saved
                </>
              ) : (
                <>
                  <Bookmark className="size-4" /> Save Scan
                </>
              )}
            </Button>
          )}
          <Button type="button" onClick={handleExport} className="gap-1.5">
            <Download className="size-4" /> Export Summary
          </Button>
        </div>
      </div>

      <RiskScoreCard result={result} />
      <FlaggedClauses clauses={result.clauses} />
      <RedlineGenerator clauses={result.clauses} />
      <MissingProtections missing={result.missing} />
    </div>
  )
}
