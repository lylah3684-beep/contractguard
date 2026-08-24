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

  function handleUpgrade() {
    window.open('https://test.dodopayments.com/buy/pdt_01JMWP31E18751N0QG90226Z2P', '_blank')
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
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
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                <p className="text-sm text-muted-foreground font-mono">Analyzing clauses & risk vectors...</p>
              </div>
            )}

            {error && (
              <p className="text-sm font-medium text-destructive">{error}</p>
            )}

            {result && !analyzing && (
              <AnalysisDashboard
                result={result}
                contract={contract}
                onSave={handleSave}
                isSaved={currentSaved}
                onUpgrade={handleUpgrade}
              />
            )}
          </div>
        )}

        {tab === 'pricing' && (
          <PricingTab onCheckout={handleUpgrade} />
        )}

        {tab === 'saved' && (
          <SavedScansTab
            scans={saved}
            onOpen={handleOpenSaved}
            onDelete={handleDeleteSaved}
          />
        )}
      </main>

      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        onProceed={handleUpgrade}
      />
    </div>
  )
            }

