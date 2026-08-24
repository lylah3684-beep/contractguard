'use client'

import { useState } from 'react'
import { Navbar, type TabKey } from '@/components/navbar'
import { AuditorInput } from '@/components/auditor-input'
import { AnalysisDashboard } from '@/components/analysis-dashboard'
import { PricingTab } from '@/components/pricing-tab'
import { SavedScansTab, type SavedScan } from '@/components/saved-scans-tab'
import { CheckoutModal } from '@/components/checkout-modal'
import { analyzeContract, SAMPLE_CONTRACT, type AnalysisResult } from '@/lib/contract-analysis'

export default function Page() {
  const [tab, setTab] = useState<TabKey>('auditor')
  const [contract, setContract] = useState(SAMPLE_CONTRACT)
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [saved, setSaved] = useState<SavedScan[]>([])
  const [currentSaved, setCurrentSaved] = useState(false)

  function handleAnalyze() {
    if (!contract.trim()) {
      setResult(null)
      setError('Please paste contract text before analyzing.')
      return
    }
    setAnalyzing(true)
    setResult(null)
    setError(null)
    setCurrentSaved(false)
    // Brief delay so the scanning animation reads as active work.
    setTimeout(() => {
      setResult(analyzeContract(contract))
      setAnalyzing(false)
    }, 1200)
  }

  function handleSave() {
    if (!result || currentSaved) return
    const scan: SavedScan = {
      id: crypto.randomUUID(),
      savedAt: Date.now(),
      result,
    }
    setSaved((prev) => [scan, ...prev])
    setCurrentSaved(true)
  }

  function handleOpenSaved(scan: SavedScan) {
    setResult(scan.result)
    setCurrentSaved(true)
    setTab('auditor')
  }

  function handleDeleteSaved(id: string) {
    setSaved((prev) => prev.filter((s) => s.id !== id))
  }

  return (
    <div className="min-h-screen">
      <Navbar active={tab} onChange={setTab} savedCount={saved.length} />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        {tab === 'auditor' && (
          <div className="flex flex-col gap-8">
            <AuditorInput
              value={contract}
              onChange={setContract}
              onAnalyze={handleAnalyze}
              analyzing={analyzing}
            />

            {analyzing && (
              <div
                className="flex animate-fade-up flex-col items-center gap-3 py-10 text-center"
                role="status"
                aria-live="polite"
              >
                <div className="flex gap-1.5">
                  <span className="size-2.5 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
                  <span className="size-2.5 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
                  <span className="size-2.5 animate-bounce rounded-full bg-primary" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Scanning clauses, liabilities, and missing protections…
                </p>
              </div>
            )}

            {!analyzing && error && (
              <div
                className="animate-fade-up rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive"
                role="alert"
              >
                {error}
              </div>
            )}

            {!analyzing && result && (
              <AnalysisDashboard result={result} onSave={handleSave} isSaved={currentSaved} />
            )}
          </div>
        )}

        {tab === 'pricing' && <PricingTab onUpgrade={() => setCheckoutOpen(true)} />}

        {tab === 'saved' && (
          <SavedScansTab scans={saved} onOpen={handleOpenSaved} onDelete={handleDeleteSaved} />
        )}
      </main>

      <footer className="border-t border-border/70 py-6">
        <p className="mx-auto max-w-6xl px-4 text-center text-xs text-muted-foreground sm:px-6">
          ContractGuard provides automated risk analysis for informational purposes only and is not a
          substitute for professional legal advice.
        </p>
      </footer>

      <CheckoutModal open={checkoutOpen} onOpenChange={setCheckoutOpen} />
    </div>
  )
}
