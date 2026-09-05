'use client'

import React, { useState } from 'react'

interface RiskItem {
  id: string
  clause: string
  riskLevel: 'HIGH' | 'MEDIUM' | 'LOW'
  title: string
  description: string
  recommendation: string
}

interface AnalysisResult {
  score: number
  riskLevel: 'HIGH' | 'MEDIUM' | 'LOW'
  summary: string
  risks: RiskItem[]
  detectedType: string
}

const SAMPLE_CONTRACT = `NON-DISCLOSURE AND INTELLECTUAL PROPERTY ASSIGNMENT AGREEMENT

1. CONFIDENTIALITY & TERM
The Receiving Party agrees to retain all Confidential Information in absolute confidence for perpetuity. The obligations of confidentiality shall survive any termination of discussions or agreements indefinitely.

2. INTELLECTUAL PROPERTY OWNERSHIP
The Receiving Party agrees that any and all inventions, improvements, software code, concepts, know-how, and works of authorship created, conceived, or reduced to practice by the Receiving Party during the term of engagement-whether created during normal working hours or on personal time, and whether utilizing Company resources or personal devices-shall belong exclusively to the Company.

3. NON-COMPETITION
For a period of three (3) years following the termination of this Agreement for any reason, the Receiving Party shall not directly or indirectly engage in, perform services for, consult with, or invest in any business, entity, or venture that competes with the Company anywhere globally.

4. INDEMNIFICATION & LIABILITY
The Receiving Party shall indemnify, defend, and hold harmless the Company, its officers, directors, employees, and affiliates from and against any and all claims, losses, damages, liabilities, costs, and expenses (including reasonable attorneys' fees) arising out of or resulting from any breach of this Agreement. The Company's total liability under this Agreement shall be limited to $50.`

function analyzeContract(text: string): AnalysisResult {
  const risks: RiskItem[] = []
  const lower = text.toLowerCase()

  if (lower.includes('perpetuity') || lower.includes('indefinitely')) {
    risks.push({
      id: '1',
      clause: 'Perpetual Confidentiality',
      riskLevel: 'HIGH',
      title: 'Indefinite Confidentiality Term',
      description: 'Obligations continue indefinitely without standard 2-5 year sunset periods.',
      recommendation: 'Negotiate a standard 2 to 3-year expiration term from disclosure date.'
    })
  }

  if (lower.includes('personal time') || lower.includes('personal devices') || lower.includes('inventions')) {
    risks.push({
      id: '2',
      clause: 'Overly Broad IP Assignment',
      riskLevel: 'HIGH',
      title: 'Broad Invention & IP Seizure',
      description: 'Claims rights to work done on your own personal time or devices.',
      recommendation: 'Carve out prior inventions and restrict scope to direct work for the company.'
    })
  }

  if (lower.includes('non-competition') || lower.includes('competes') || lower.includes('three (3) years')) {
    risks.push({
      id: '3',
      clause: 'Restrictive Non-Compete',
      riskLevel: 'HIGH',
      title: 'Unreasonable Global Non-Compete',
      description: 'Restricts working anywhere globally for 3 years, severely harming career mobility.',
      recommendation: 'Limit to direct competitors, reduce duration to 6-12 months, and specify geographic bounds.'
    })
  }

  if (lower.includes('indemnify') || lower.includes('uncapped') || lower.includes('$50')) {
    risks.push({
      id: '4',
      clause: 'Asymmetric Liability & Indemnity',
      riskLevel: 'MEDIUM',
      title: 'Unbalanced Liability Cap',
      description: 'You face uncapped indemnity while Company liability is capped at $50.',
      recommendation: 'Make indemnification mutual and cap total liability to contract fees paid.'
    })
  }

  return {
    score: 38,
    riskLevel: 'HIGH',
    summary: 'Contract contains high-risk clauses including broad IP assignment, global non-compete, and one-sided liability.',
    risks,
    detectedType: 'NDA / IP Assignment'
  }
}

export default function Home() {
  const [contractText, setContractText] = useState(SAMPLE_CONTRACT)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)

  const handleAnalyze = () => {
    setIsAnalyzing(true)
    setTimeout(() => {
      setResult(analyzeContract(contractText))
      setIsAnalyzing(false)
    }, 600)
  }

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-sans selection:bg-blue-600/30">
      
      {/* Top SaaS Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-slate-800/80 bg-[#070b14]/90 px-4 py-3 backdrop-blur-md md:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-inner">
            🛡️
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold tracking-tight text-white text-base md:text-lg">ContractGuard</span>
            <span className="rounded-full bg-blue-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-blue-400 border border-blue-500/20 tracking-wide">
              AI AUDITOR
            </span>
          </div>
        </div>

        {/* Center Search Input */}
        <div className="hidden md:flex items-center gap-2 rounded-xl border border-slate-800/90 bg-slate-900/60 px-3.5 py-1.5 text-xs text-slate-400 w-80 shadow-sm focus-within:border-blue-500/40">
          <span>🔍</span>
          <input 
            type="text" 
            placeholder="Search clauses, terms, or audits..." 
            className="bg-transparent text-slate-200 placeholder-slate-500 outline-none w-full"
            readOnly
          />
          <kbd className="rounded border border-slate-700/80 bg-slate-800/90 px-1.5 py-0.5 text-[10px] font-mono text-slate-400">⌘K</kbd>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button className="relative rounded-xl border border-slate-800/90 bg-slate-900/60 p-2 text-slate-300 hover:text-white transition">
            <span className="text-sm">🔔</span>
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-blue-600 text-[9px] font-bold text-white shadow-sm">
              2
            </span>
          </button>
          
          <a 
            href="#pricing" 
            className="rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:border-slate-700 transition"
          >
            Pricing
          </a>

          <div className="flex items-center pl-2 border-l border-slate-800">
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-xs font-bold text-white shadow-sm ring-2 ring-blue-500/20">
              CG
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard Canvas */}
      <main className="flex-1 px-4 py-6 md:px-8 max-w-7xl mx-auto w-full">
        
        {/* Status Strip */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-b border-slate-800/60 pb-5">
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              Contract Risk Analysis
            </h1>
            <p className="text-xs md:text-sm text-slate-400 mt-0.5">
              Paste agreement text below to scan for predatory clauses and high-risk terms.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400 border border-emerald-500/20">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              AI Engine Ready
            </span>
          </div>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Contract Editor Area (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col rounded-2xl border border-slate-800 bg-slate-900/40 p-4 shadow-xl backdrop-blur-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Document Editor</span>
              <button 
                onClick={() => setContractText(SAMPLE_CONTRACT)}
                className="text-xs text-blue-400 hover:text-blue-300 font-medium"
              >
                Reset Sample
              </button>
            </div>

            <textarea 
              value={contractText}
              onChange={(e) => setContractText(e.target.value)}
              className="h-96 w-full rounded-xl border border-slate-800/90 bg-[#050811] p-3.5 text-xs font-mono text-slate-300 focus:border-blue-500 focus:outline-none resize-none leading-relaxed"
              placeholder="Paste contract text here..."
            />

            <div className="mt-4 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">Auto-detected: NDA / IP Assignment</span>
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-blue-600/25 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 transition active:scale-95"
              >
                {isAnalyzing ? (
                  <>Scanning Contract...</>
                ) : (
                  <>⚡ Analyze Risks Now</>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Score Gauge & Vulnerabilities (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            
            {result ? (
              <>
                {/* Risk Score Card */}
                <div className="rounded-2xl border border-red-900/40 bg-gradient-to-br from-red-950/20 via-slate-900/60 to-slate-900/90 p-5 shadow-xl border-l-4 border-l-red-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-red-400">Overall Assessment</span>
                      <h2 className="text-lg font-bold text-white mt-0.5">HIGH RISK</h2>
                    </div>
                    <div className="text-right">
                      <span className="text-3xl font-extrabold text-red-400">{result.score}</span>
                      <span className="text-xs text-slate-500 font-medium">/100</span>
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                    {result.summary}
                  </p>
                </div>

                {/* Identified Vulnerabilities */}
                <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 shadow-xl">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Identified Vulnerabilities ({result.risks.length})
                  </h3>

                  <div className="flex flex-col gap-3 max-h-[380px] overflow-y-auto pr-1">
                    {result.risks.map((risk) => (
                      <div key={risk.id} className="rounded-xl border border-slate-800/90 bg-[#060a14] p-3 hover:border-slate-700 transition">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                            ⚠️ {risk.title}
                          </span>
                          <span className="rounded bg-red-500/10 px-1.5 py-0.5 text-[9px] font-bold text-red-400 border border-red-500/20">
                            {risk.riskLevel}
                          </span>
                        </div>
                        <p className="mt-1.5 text-[11px] text-slate-400 leading-normal">
                          {risk.description}
                        </p>
                        <div className="mt-2 rounded-lg bg-blue-950/30 p-2 text-[10px] text-blue-300 border border-blue-900/30">
                          💡 <span className="font-semibold">Fix:</span> {risk.recommendation}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              /* Empty Preview State before clicking scan */
              <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/20 p-8 text-center flex flex-col items-center justify-center min-h-[340px]">
                <div className="h-12 w-12 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-xl mb-3">
                  🛡️
                </div>
                <h3 className="text-sm font-semibold text-white">No Audit Running</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-xs">
                  Click 'Analyze Risks Now' to trigger our legal engine and generate a vulnerability report.
                </p>
              </div>
            )}

            {/* Pro Upgrade Card */}
            <div id="pricing" className="rounded-2xl border border-blue-900/30 bg-gradient-to-br from-blue-950/30 via-slate-900/80 to-slate-900 p-5 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">ContractGuard Pro</h3>
                  <p className="text-[11px] text-slate-400">Unlimited scans & redline export</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-white">$19</span>
                  <span className="text-[10px] text-slate-400 block">one-time</span>
                </div>
              </div>
              <button className="mt-4 w-full rounded-xl bg-blue-600 py-2.5 text-xs font-semibold text-white hover:bg-blue-500 shadow-md shadow-blue-600/20 transition">
                Get Pro Access
              </button>
            </div>

          </div>

        </div>
      </main>

    </div>
  )
}
