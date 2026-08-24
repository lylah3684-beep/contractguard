'use client'

import { useRef, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { FileText, Loader2, ScanSearch, Upload } from 'lucide-react'
import { cn } from '@/lib/utils'

type Mode = 'paste' | 'upload'

export function AuditorInput({
  value,
  onChange,
  onAnalyze,
  analyzing,
}: {
  value: string
  onChange: (v: string) => void
  onAnalyze: () => void
  analyzing: boolean
}) {
  const [mode, setMode] = useState<Mode>('paste')
  const [fileName, setFileName] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setFileName(file.name)
    // Read plain-text-ish files directly; for pdf/doc we keep the current text
    // (Pro-tier PDF parser is gated in the pricing tab).
    if (file.type.startsWith('text/') || /\.(txt|md)$/i.test(file.name)) {
      const reader = new FileReader()
      reader.onload = () => onChange(String(reader.result ?? ''))
      reader.readAsText(file)
    }
  }

  return (
    <Card className="glow-border flex flex-col gap-4 p-5 sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Audit a Contract</h1>
          <p className="text-sm text-muted-foreground">
            Paste your agreement and let ContractGuard flag the risks.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Input mode"
          className="inline-flex self-start rounded-lg border border-border bg-background/50 p-1"
        >
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'paste'}
            onClick={() => setMode('paste')}
            className={cn(
              'flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
              mode === 'paste' ? 'bg-primary/15 text-primary' : 'text-muted-foreground hover:text-foreground',
            )}
          >
            <FileText className="size-3.5" /> Paste Text
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'upload'}
            onClick={() => setMode('upload')}
            className={cn(
              'flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
              mode === 'upload' ? 'bg-primary/15 text-primary' : 'text-muted-foreground hover:text-foreground',
            )}
          >
            <Upload className="size-3.5" /> Upload PDF/Doc
          </button>
        </div>
      </div>

      {mode === 'paste' ? (
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          spellCheck={false}
          aria-label="Contract text"
          className="min-h-72 resize-y bg-background/50 font-mono text-[13px] leading-relaxed"
          placeholder="Paste your contract text here..."
        />
      ) : (
        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex min-h-40 flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-background/40 p-6 text-center transition-colors hover:border-primary/50 hover:bg-primary/5"
          >
            <span className="flex size-11 items-center justify-center rounded-full bg-primary/15 text-primary">
              <Upload className="size-5" />
            </span>
            <span className="text-sm font-medium">
              {fileName ? fileName : 'Click to upload a contract'}
            </span>
            <span className="text-xs text-muted-foreground">PDF, DOC, DOCX or TXT · up to 10 MB</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx,.txt,.md,text/plain"
            onChange={handleFile}
            className="sr-only"
          />
          <p className="text-xs text-muted-foreground">
            PDF/DOC text extraction is a{' '}
            <span className="font-medium text-primary">Pro</span> feature. Uploaded text files are read directly;
            the pre-filled sample is analyzed otherwise.
          </p>
        </div>
      )}

      <div className="flex items-center justify-between gap-3">
        <span className="text-xs text-muted-foreground tabular-nums">
          {value.trim().length.toLocaleString()} characters
        </span>
        <Button
          type="button"
          size="lg"
          onClick={onAnalyze}
          disabled={analyzing || value.trim().length < 20}
          className="gap-2 glow-primary"
        >
          {analyzing ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Analyzing…
            </>
          ) : (
            <>
              <ScanSearch className="size-4" />
              Analyze Contract
            </>
          )}
        </Button>
      </div>
    </Card>
  )
}
