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

const PAYMENT_LINK = 'https://checkout.dodopayments.com/buy/pdt_0NmEFB7QbkXm1z5WJxUIW?quantity=1'

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
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  const handleAnalyze = () => {
    setIsAnalyzing(true)
    setTimeout(() => {
      setResult(analyzeContract(contractText))
      setIsAnalyzing(false)
    }, 600)
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#070b12', color: '#f1f5f9', fontFamily: 'system-ui, -apple-system, sans-serif', paddingBottom: '60px' }}>
      
      {/* Top Navbar */}
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.07)', backgroundColor: 'rgba(7, 11, 18, 0.92)', position: 'sticky', top: 0, zIndex: 50, backdropFilter: 'blur(10px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, rgba(234,179,8,0.2), rgba(59,130,246,0.2))', border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', boxShadow: '0 0 15px rgba(234,179,8,0.15)' }}>
            🛡️
          </div>
          <span style={{ fontWeight: '800', fontSize: '17px', color: '#ffffff', letterSpacing: '-0.4px' }}>ContractGuard</span>
          <span style={{ fontSize: '10px', fontWeight: '800', color: '#38bdf8', backgroundColor: 'rgba(56,189,248,0.12)', border: '1px solid rgba(56,189,248,0.3)', padding: '2px 8px', borderRadius: '999px' }}>
            STUDIO PRO
          </span>
        </div>

        {/* Profile & Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', position: 'relative' }}>
          <div style={{ width: '34px', height: '34px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', position: 'relative', cursor: 'pointer', backgroundColor: 'rgba(255,255,255,0.03)' }}>
            🔔
            <span style={{ position: 'absolute', top: '7px', right: '7px', width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#ef4444' }}></span>
          </div>

          <a href="#pricing" style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '12px', padding: '7px 12px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', backgroundColor: 'rgba(255,255,255,0.04)', fontWeight: '600' }}>
            Pricing
          </a>

          {/* Profile Badge */}
          <div 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', padding: '3px 8px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.12)', backgroundColor: 'rgba(255,255,255,0.03)' }}
          >
            <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'linear-gradient(135deg, #eab308, #f97316)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold', color: '#000', boxShadow: '0 0 10px rgba(234,179,8,0.3)' }}>
              FL
            </div>
            <span style={{ fontSize: '12px', color: '#e2e8f0', fontWeight: '600' }}>▾</span>
          </div>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <div style={{ position: 'absolute', top: '48px', right: '0', width: '240px', backgroundColor: '#0c1322', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '14px', padding: '14px', boxShadow: '0 15px 35px rgba(0,0,0,0.7)', zIndex: 100 }}>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#64748b', fontWeight: '700', letterSpacing: '0.5px' }}>Logged In As</div>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#fff', marginTop: '2px' }}>freelancer@design.studio</div>
              
              <div style={{ margin: '10px 0', borderTop: '1px solid rgba(255,255,255,0.06)' }}></div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#94a3b8', marginBottom: '8px' }}>
                <span>Account Status:</span>
                <span style={{ color: '#eab308', fontWeight: '700' }}>Freelancer Tier</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#94a3b8', marginBottom: '12px' }}>
                <span>Free Scans Left:</span>
                <span style={{ color: '#38bdf8', fontWeight: '700' }}>1 Scan</span>
              </div>

              <a 
                href={PAYMENT_LINK}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'block', textAlign: 'center', backgroundColor: '#2563eb', color: '#fff', textDecoration: 'none', padding: '8px', borderRadius: '8px', fontSize: '11px', fontWeight: '700' }}
              >
                Upgrade to Pro ($19)
              </a>
            </div>
          )}
        </div>
      </header>

      {/* Main Container */}
      <main style={{ maxWidth: '980px', margin: '0 auto', padding: '24px 16px' }}>
        
        {/* Top 3D Shield & Speedometer Gauge Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '20px' }}>
          
          {/* Card 1: 3D Shield Emblem */}
          <div style={{ backgroundColor: 'rgba(13, 19, 33, 0.85)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '18px', padding: '20px', display: 'flex', alignItems: 'center', gap: '18px', boxShadow: '0 12px 30px rgba(0,0,0,0.4)' }}>
            <div style={{ width: '74px', height: '74px', borderRadius: '18px', background: 'linear-gradient(145deg, #2b2512, #141006)', border: '2px solid rgba(234,179,8,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', boxShadow: 'inset 0 0 15px rgba(234,179,8,0.3), 0 0 25px rgba(234,179,8,0.2)' }}>
              🛡️
            </div>
            <div>
              <span style={{ fontSize: '11px', fontWeight: '700', color: '#eab308', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Security Engine</span>
              <h3 style={{ fontSize: '17px', fontWeight: '800', color: '#fff', margin: '3px 0' }}>Contract Perimeter</h3>
              <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>Active clause scanner inspecting predatory terms</p>
            </div>
          </div>

          {/* Card 2: Speedometer Gauge (38/100) */}
          <div style={{ backgroundColor: 'rgba(13, 19, 33, 0.85)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '18px', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 12px 30px rgba(0,0,0,0.4)' }}>
            <div>
              <span style={{ fontSize: '11px', fontWeight: '700', color: '#f87171', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Risk Index</span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginTop: '2px' }}>
                <span style={{ fontSize: '34px', fontWeight: '900', color: '#f87171' }}>38</span>
                <span style={{ fontSize: '14px', color: '#64748b', fontWeight: '700' }}>/ 100</span>
              </div>
              <span style={{ display: 'inline-block', backgroundColor: 'rgba(239,68,68,0.15)', color: '#f87171', border: '1px solid rgba(239,68,68,0.3)', padding: '2px 8px', borderRadius: '6px', fontSize: '10px', fontWeight: '800', marginTop: '4px' }}>
                HIGH RISK DETECTED
              </span>
            </div>

            {/* Speedometer SVG */}
            <div style={{ width: '110px', height: '65px' }}>
              <svg viewBox="0 0 100 55" style={{ width: '100%', height: '100%' }}>
                <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#1e293b" strokeWidth="8" strokeLinecap="round" />
                <path d="M 10 50 A 40 40 0 0 1 45 15" fill="none" stroke="#ef4444" strokeWidth="8" strokeLinecap="round" />
                <line x1="50" y1="50" x2="42" y2="18" stroke="#f87171" strokeWidth="3" strokeLinecap="round" />
                <circle cx="50" cy="50" r="4" fill="#f87171" />
              </svg>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', color: '#64748b', fontWeight: '700', padding: '0 4px' }}>
                <span>0</span>
                <span>100</span>
              </div>
            </div>
          </div>

        </div>

        {/* Mini Breakdown Badges */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', marginBottom: '24px' }}>
          <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '12px' }}>
            <span style={{ fontSize: '10px', color: '#64748b', fontWeight: '700', textTransform: 'uppercase' }}>IP Exposure</span>
            <div style={{ fontSize: '15px', fontWeight: '800', color: '#f87171', marginTop: '2px' }}>Severely High</div>
          </div>
          <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '12px' }}>
            <span style={{ fontSize: '10px', color: '#64748b', fontWeight: '700', textTransform: 'uppercase' }}>Non-Compete Term</span>
            <div style={{ fontSize: '15px', fontWeight: '800', color: '#fbbf24', marginTop: '2px' }}>36 Months</div>
          </div>
          <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '12px' }}>
            <span style={{ fontSize: '10px', color: '#64748b', fontWeight: '700', textTransform: 'uppercase' }}>Liability Cap</span>
            <div style={{ fontSize: '15px', fontWeight: '800', color: '#f87171', marginTop: '2px' }}>$50 Limit</div>
          </div>
          <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '12px' }}>
            <span style={{ fontSize: '10px', color: '#64748b', fontWeight: '700', textTransform: 'uppercase' }}>Fix Priority</span>
            <div style={{ fontSize: '15px', fontWeight: '800', color: '#38bdf8', marginTop: '2px' }}>4 Critical Edits</div>
          </div>
        </div>

        {/* Editor Area */}
        <div style={{ backgroundColor: 'rgba(13, 19, 33, 0.85)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '18px', padding: '18px', marginBottom: '22px', boxShadow: '0 12px 30px rgba(0,0,0,0.4)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', fontSize: '11px', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
            <span>Agreement Workspace</span>
            <button onClick={() => setContractText(SAMPLE_CONTRACT)} style={{ background: 'none', border: 'none', color: '#38bdf8', cursor: 'pointer', fontSize: '11px', fontWeight: '600', padding: 0 }}>
              Reset Default Sample
            </button>
          </div>

          <textarea 
            value={contractText}
            onChange={(e) => setContractText(e.target.value)}
            style={{ width: '100%', boxSizing: 'border-box', height: '210px', backgroundColor: '#060a12', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '14px', color: '#e2e8f0', fontSize: '12px', fontFamily: 'monospace', lineHeight: '1.6', resize: 'vertical', outline: 'none' }}
            placeholder="Paste your client agreement text here..."
          />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '14px', flexWrap: 'wrap', gap: '10px' }}>
            <span style={{ fontSize: '11px', color: '#64748b' }}>Detected Document: Standard Freelance Agreement</span>
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '11px 22px', borderRadius: '11px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 4px 16px rgba(37,99,235,0.4)', opacity: isAnalyzing ? 0.6 : 1 }}
            >
              {isAnalyzing ? 'Scanning Clauses...' : '⚡ Audit Agreement'}
            </button>
          </div>
        </div>

        {/* Identified Vulnerabilities List */}
        {result && (
          <div style={{ backgroundColor: 'rgba(13, 19, 33, 0.85)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '18px', padding: '20px', marginBottom: '22px' }}>
            <div style={{ fontSize: '12px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '14px', letterSpacing: '0.6px' }}>
              Detected Vulnerabilities ({result.risks.length})
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {result.risks.map((risk) => (
                <div key={risk.id} style={{ backgroundColor: '#070b14', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '13px', fontWeight: '700', color: '#fff' }}>⚠️ {risk.title}</span>
                    <span style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#f87171', fontSize: '9px', fontWeight: '800', padding: '3px 8px', borderRadius: '5px', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                      {risk.riskLevel}
                    </span>
                  </div>
                  <p style={{ fontSize: '12px', color: '#94a3b8', margin: '6px 0 10px 0', lineHeight: '1.5' }}>{risk.description}</p>
                  <div style={{ backgroundColor: 'rgba(37, 99, 235, 0.1)', border: '1px solid rgba(37, 99, 235, 0.25)', padding: '8px 12px', borderRadius: '8px', fontSize: '11px', color: '#93c5fd', lineHeight: '1.4' }}>
                    💡 <strong>Suggested Revision:</strong> {risk.recommendation}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pricing Banner with Dodo Payments */}
        <div id="pricing" style={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(37, 99, 235, 0.35)', borderRadius: '18px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', boxShadow: '0 10px 30px rgba(37,99,235,0.1)' }}>
          <div>
            <div style={{ fontSize: '16px', fontWeight: '800', color: '#fff' }}>ContractGuard Pro</div>
            <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>Unlimited audits, redline export & freelancer negotiation templates</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div>
              <span style={{ fontSize: '26px', fontWeight: '900', color: '#fff' }}>$19</span>
              <span style={{ fontSize: '10px', color: '#64748b', display: 'block' }}>one-time access</span>
            </div>
            <a 
              href={PAYMENT_LINK}
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ backgroundColor: '#2563eb', color: '#fff', textDecoration: 'none', padding: '11px 20px', borderRadius: '11px', fontSize: '13px', fontWeight: '700', display: 'inline-block', boxShadow: '0 4px 14px rgba(37,99,235,0.4)' }}
            >
              Get Pro Access
            </a>
          </div>
        </div>

      </main>

    </div>
  )
}
