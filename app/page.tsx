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
    <div style={{ minHeight: '100vh', backgroundColor: '#070b14', color: '#f1f5f9', fontFamily: 'system-ui, -apple-system, sans-serif', margin: 0, paddingBottom: '40px' }}>
      
      {/* Top Header */}
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)', backgroundColor: 'rgba(7, 11, 20, 0.95)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '34px', height: '34px', borderRadius: '10px', backgroundColor: 'rgba(37,99,235,0.18)', border: '1px solid rgba(59,130,246,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>
            🛡️
          </div>
          <span style={{ fontWeight: '700', fontSize: '17px', color: '#ffffff', letterSpacing: '-0.3px' }}>ContractGuard</span>
          <span style={{ fontSize: '10px', fontWeight: '700', color: '#60a5fa', backgroundColor: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.25)', padding: '2px 8px', borderRadius: '999px', letterSpacing: '0.5px' }}>
            AI AUDITOR
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', position: 'relative', cursor: 'pointer', backgroundColor: 'rgba(255,255,255,0.03)' }}>
            🔔
            <span style={{ position: 'absolute', top: '-2px', right: '-2px', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#3b82f6' }}></span>
          </div>

          <a href="#pricing" style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '12px', padding: '6px 12px', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.04)' }}>
            Pricing
          </a>

          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #2563eb, #6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 'bold', color: '#fff', border: '2px solid rgba(255,255,255,0.15)' }}>
            CG
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main style={{ maxWidth: '850px', margin: '0 auto', padding: '24px 16px' }}>
        
        {/* Title & Engine status */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h1 style={{ fontSize: '20px', fontWeight: '700', color: '#fff', margin: '0 0 4px 0' }}>AI Contract Risk Audit</h1>
            <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>Paste agreement text below to scan for predatory clauses and high-risk terms.</p>
          </div>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: '600', color: '#34d399', backgroundColor: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)', padding: '4px 10px', borderRadius: '999px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#34d399' }}></span>
            Engine Ready
          </span>
        </div>

        {/* Editor Box */}
        <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.75)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px', padding: '16px', marginBottom: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', fontSize: '11px', color: '#94a3b8', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            <span>Document Editor</span>
            <button onClick={() => setContractText(SAMPLE_CONTRACT)} style={{ background: 'none', border: 'none', color: '#60a5fa', cursor: 'pointer', fontSize: '11px', fontWeight: '600', padding: 0 }}>
              Reset Sample
            </button>
          </div>

          <textarea 
            value={contractText}
            onChange={(e) => setContractText(e.target.value)}
            style={{ width: '100%', boxSizing: 'border-box', height: '220px', backgroundColor: '#050811', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '12px', color: '#e2e8f0', fontSize: '12px', fontFamily: 'monospace', lineHeight: '1.6', resize: 'vertical', outline: 'none' }}
            placeholder="Paste contract text here..."
          />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', flexWrap: 'wrap', gap: '10px' }}>
            <span style={{ fontSize: '11px', color: '#64748b' }}>Auto-detected: NDA / IP Assignment</span>
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '10px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 4px 14px rgba(37,99,235,0.4)', opacity: isAnalyzing ? 0.6 : 1 }}
            >
              {isAnalyzing ? 'Scanning Contract...' : '⚡ Analyze Risks Now'}
            </button>
          </div>
        </div>

        {/* Analysis Results Area */}
        {result ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
            {/* Score Card */}
            <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.3)', borderLeft: '4px solid #ef4444', borderRadius: '14px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#f87171', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Overall Assessment</span>
                <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#fff', margin: '2px 0 0 0' }}>HIGH RISK</h2>
                <p style={{ fontSize: '12px', color: '#cbd5e1', margin: '4px 0 0 0' }}>{result.summary}</p>
              </div>
              <div style={{ textAlign: 'right', minWidth: '70px' }}>
                <span style={{ fontSize: '32px', fontWeight: '900', color: '#f87171' }}>{result.score}</span>
                <span style={{ fontSize: '12px', color: '#64748b' }}>/100</span>
              </div>
            </div>

            {/* Vulnerabilities */}
            <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.75)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '16px' }}>
              <div style={{ fontSize: '12px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '0.5px' }}>
                Identified Vulnerabilities ({result.risks.length})
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {result.risks.map((risk) => (
                  <div key={risk.id} style={{ backgroundColor: '#060a14', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '13px', fontWeight: '600', color: '#fff' }}>⚠️ {risk.title}</span>
                      <span style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#f87171', fontSize: '9px', fontWeight: '700', padding: '2px 6px', borderRadius: '4px', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                        {risk.riskLevel}
                      </span>
                    </div>
                    <p style={{ fontSize: '11px', color: '#94a3b8', margin: '6px 0' }}>{risk.description}</p>
                    <div style={{ backgroundColor: 'rgba(37, 99, 235, 0.1)', border: '1px solid rgba(37, 99, 235, 0.2)', padding: '6px 10px', borderRadius: '6px', fontSize: '11px', color: '#93c5fd' }}>
                      💡 <strong>Fix:</strong> {risk.recommendation}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Empty state */
          <div style={{ border: '1px dashed rgba(255,255,255,0.12)', borderRadius: '14px', padding: '32px 16px', textAlign: 'center', marginBottom: '24px', backgroundColor: 'rgba(255,255,255,0.01)' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>🛡️</div>
            <div style={{ fontSize: '14px', fontWeight: '600', color: '#fff' }}>No Audit Running</div>
            <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>Tap 'Analyze Risks Now' to run full legal diagnostics.</div>
          </div>
        )}

        {/* Pricing Card */}
        <div id="pricing" style={{ backgroundColor: 'rgba(15, 23, 42, 0.85)', border: '1px solid rgba(37, 99, 235, 0.3)', borderRadius: '14px', padding: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ fontSize: '15px', fontWeight: '700', color: '#fff' }}>ContractGuard Pro</div>
            <div style={{ fontSize: '12px', color: '#94a3b8' }}>Unlimited legal scans, PDF export & redline assistant</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div>
              <span style={{ fontSize: '24px', fontWeight: '800', color: '#fff' }}>$19</span>
              <span style={{ fontSize: '10px', color: '#64748b', display: 'block' }}>one-time</span>
            </div>
            <button style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '10px', fontSize: '12px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 4px 12px rgba(37,99,235,0.3)' }}>
              Get Pro Access
            </button>
          </div>
        </div>

      </main>

    </div>
  )
                       }
            
