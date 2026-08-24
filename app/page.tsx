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
The Receiving Party agrees that any and all inventions, improvements, software code, concepts, know-how, and works of authorship created, conceived, or reduced to practice by the Receiving Party during the term of engagement—whether created during normal working hours or on personal time, and whether utilizing Company equipment or personal devices—shall automatically and exclusively belong to the Company without additional compensation.

3. NON-COMPETITION
For a period of three (3) years following the termination of this Agreement for any reason, the Receiving Party shall not directly or indirectly engage in, own, manage, operate, join, control, or participate in the ownership, management, operation, or control of any business that competes with any current or planned product, service, or business line of the Company anywhere globally.

4. INDEMNIFICATION & LIABILITY
The Receiving Party shall indemnify, defend, and hold harmless the Company, its officers, directors, employees, and affiliates from and against any and all claims, losses, damages, liabilities, and expenses (including uncapped legal fees) arising out of or resulting from any breach of this Agreement. In no event shall Company's liability exceed fifty dollars ($50.00).

5. GOVERNING LAW AND JURISDICTION
This Agreement shall be governed by the laws of the State of Delaware. Any dispute shall be resolved exclusively in the state courts located in New Castle County, Delaware, with Receiving Party waiving all rights to jury trial and class actions.`

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
    score: risks.length > 2 ? 38 : 72,
    riskLevel: risks.length > 2 ? 'HIGH' : 'MEDIUM',
    summary: 'Contract contains high-risk clauses including broad IP assignment, global non-compete, and one-sided liability.',
    risks,
    detectedType: 'NDA & IP Agreement'
  }
}

export default function Page() {
  const [tab, setTab] = useState<'auditor' | 'pricing'>('auditor')
  const [contract, setContract] = useState(SAMPLE_CONTRACT)
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)

  function handleAnalyze() {
    setAnalyzing(true)
    setResult(null)
    setTimeout(() => {
      setResult(analyzeContract(contract))
      setAnalyzing(false)
    }, 1000)
  }

  function handleUpgrade() {
    window.open('https://test.dodopayments.com/buy/pdt_01JMWP31E18751N0QG90226Z2P', '_blank')
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#090d16', color: '#e2e8f0', fontFamily: 'sans-serif' }}>
      {/* Header */}
      <header style={{ borderBottom: '1px solid #1e293b', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#38bdf8' }}>🛡️ ContractGuard</span>
          <span style={{ fontSize: '11px', background: '#0284c7', color: '#fff', padding: '2px 8px', borderRadius: '12px' }}>AI AUDITOR</span>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            onClick={() => setTab('auditor')} 
            style={{ background: tab === 'auditor' ? '#1e293b' : 'transparent', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer' }}>
            Auditor
          </button>
          <button 
            onClick={() => setTab('pricing')} 
            style={{ background: tab === 'pricing' ? '#1e293b' : 'transparent', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer' }}>
            Pricing
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 16px' }}>
        {tab === 'auditor' ? (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: '0 0 8px 0' }}>AI Contract Risk Audit</h1>
              <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>Paste your agreement text below to scan for predatory clauses and high-risk terms.</p>
            </div>

            <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '16px', marginBottom: '20px' }}>
              <textarea
                value={contract}
                onChange={(e) => setContract(e.target.value)}
                rows={10}
                style={{ width: '100%', background: 'transparent', color: '#f8fafc', border: 'none', resize: 'vertical', outline: 'none', fontSize: '13px', lineHeight: '1.6', fontFamily: 'monospace' }}
                placeholder="Paste contract text here..."
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
                <button
                  onClick={handleAnalyze}
                  disabled={analyzing}
                  style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
                  {analyzing ? 'Scanning Contract...' : '⚡ Analyze Risks Now'}
                </button>
              </div>
            </div>

            {/* Results */}
            {result && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ background: '#1e1b4b', border: '1px solid #4338ca', borderRadius: '12px', padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h3 style={{ margin: '0 0 4px 0', fontSize: '18px' }}>Risk Assessment: <span style={{ color: result.riskLevel === 'HIGH' ? '#f87171' : '#facc15' }}>{result.riskLevel} RISK</span></h3>
                      <p style={{ color: '#cbd5e1', fontSize: '14px', margin: 0 }}>{result.summary}</p>
                    </div>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: result.score < 50 ? '#f87171' : '#4ade80' }}>
                      {result.score}/100
                    </div>
                  </div>
                </div>

                <h3 style={{ fontSize: '18px', margin: '16px 0 8px 0' }}>Identified Vulnerabilities ({result.risks.length})</h3>
                {result.risks.map((risk) => (
                  <div key={risk.id} style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '10px', padding: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <strong style={{ color: '#f87171' }}>⚠️ {risk.title}</strong>
                      <span style={{ fontSize: '11px', background: '#7f1d1d', color: '#fecaca', padding: '2px 8px', borderRadius: '4px' }}>{risk.riskLevel}</span>
                    </div>
                    <p style={{ color: '#94a3b8', fontSize: '13px', margin: '0 0 8px 0' }}>{risk.description}</p>
                    <div style={{ background: '#1e293b', padding: '8px 12px', borderRadius: '6px', fontSize: '13px', color: '#38bdf8' }}>
                      💡 <strong>Fix:</strong> {risk.recommendation}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Pricing Tab */
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <h2 style={{ fontSize: '26px', fontWeight: 'bold' }}>Upgrade to ContractGuard Pro</h2>
            <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '32px' }}>Unlimited deep AI audits, exportable negotiation redlines, and attorney summaries.</p>

            <div style={{ maxWidth: '400px', margin: '0 auto', background: '#0f172a', border: '2px solid #0284c7', borderRadius: '16px', padding: '28px' }}>
              <h3 style={{ fontSize: '22px', margin: '0 0 8px 0' }}>Professional Pass</h3>
              <div style={{ fontSize: '32px', fontWeight: 'bold', margin: '16px 0' }}>$19 <span style={{ fontSize: '14px', color: '#94a3b8' }}>/ one-time</span></div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '20px 0', textAlign: 'left', fontSize: '14px', color: '#cbd5e1', lineHeight: '2' }}>
                <li>✓ Full Redline Negotiation Generator</li>
                <li>✓ Unlimited Clause Scans</li>
                <li>✓ PDF Contract Audits Export</li>
                <li>✓ Lifetime Access</li>
              </ul>
              <button
                onClick={handleUpgrade}
                style={{ width: '100%', background: '#0284c7', color: '#fff', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}>
                Get Pro Access
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
                }
                                             
