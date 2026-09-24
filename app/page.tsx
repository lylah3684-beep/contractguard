"use client";

import React, { useState } from "react";

interface RiskItem {
  id: string;
  clause: string;
  riskLevel: "HIGH" | "MEDIUM" | "LOW";
  title: string;
  description: string;
  recommendation: string;
  isLocked?: boolean;
}

interface AnalysisResult {
  score: number;
  riskLevel: "HIGH" | "MEDIUM" | "LOW";
  summary: string;
  risks: RiskItem[];
  detectedType: string;
}

const SAMPLE_CONTRACT = `NON-DISCLOSURE AND INTELLECTUAL PROPERTY ASSIGNMENT AGREEMENT

1. CONFIDENTIALITY & TERM
The Receiving Party agrees to retain all Confidential Information in absolute confidence for perpetuity. The obligation shall survive any termination of collaboration indefinitely.

2. INTELLECTUAL PROPERTY OWNERSHIP
The Receiving Party agrees that any and all inventions, improvements, software code, concepts, know-how, and works of authorship created—even on personal time or using personal devices—shall immediately belong exclusively to the Company.

3. NON-COMPETITION
For a period of three (3) years following the termination of this Agreement for any reason, the Receiving Party shall not directly or indirectly provide services, consult, or develop software for any business globally.

4. INDEMNIFICATION & LIABILITY
The Receiving Party shall indemnify, defend, and hold harmless the Company, its officers, and affiliates without uncapped limitation, while Company liability is strictly capped at $50.`;

const PAYMENT_LINK = "https://checkout.dodopayments.com/buy/pdt_0NmEFB7QbkXm1z5WJxUIW?quantity=1";

function analyzeContract(text: string): AnalysisResult {
  const risks: RiskItem[] = [];
  const lower = text.toLowerCase();

  // Free Tier Risk 1
  if (lower.includes("perpetuity") || lower.includes("indefinitely")) {
    risks.push({
      id: "1",
      clause: "Perpetual Confidentiality",
      riskLevel: "HIGH",
      title: "Indefinite Confidentiality Term",
      description: "Obligations continue indefinitely without standard 2-5 year sunset periods.",
      recommendation: "Negotiate a standard 2 to 3-year expiration term from disclosure date.",
      isLocked: false
    });
  }

  // Free Tier Risk 2
  if (lower.includes("personal time") || lower.includes("personal devices") || lower.includes("inventions")) {
    risks.push({
      id: "2",
      clause: "Overly Broad IP Assignment",
      riskLevel: "HIGH",
      title: "Broad Invention & IP Seizure",
      description: "Claims rights to work done on your own personal time or devices.",
      recommendation: "Carve out prior inventions and restrict scope to direct work for the company.",
      isLocked: false
    });
  }

  // Locked Pro Risk 3 (Vercel-style Pro feature)
  if (lower.includes("non-competition") || lower.includes("competes") || lower.includes("three (3) years")) {
    risks.push({
      id: "3",
      clause: "Restrictive Non-Compete",
      riskLevel: "HIGH",
      title: "Unreasonable Global Non-Compete (Pro Scan)",
      description: "Restricts working anywhere globally for 3 years, severely harming career mobility.",
      recommendation: "Limit to direct competitors, reduce duration to 6-12 months, and specify geographic bounds.",
      isLocked: true
    });
  }

  // Locked Pro Risk 4 (Vercel-style Pro feature)
  if (lower.includes("indemnify") || lower.includes("uncapped") || lower.includes("$50")) {
    risks.push({
      id: "4",
      clause: "Asymmetric Liability & Indemnity",
      riskLevel: "MEDIUM",
      title: "Unbalanced Liability Cap (Pro Scan)",
      description: "You face uncapped indemnity while Company liability is capped at $50.",
      recommendation: "Make indemnification mutual and cap total liability to contract fees paid.",
      isLocked: true
    });
  }

  const calculatedScore = risks.length > 0 ? Math.max(25, 100 - risks.length * 20) : 95;
  const level = risks.length >= 3 ? "HIGH" : risks.length >= 1 ? "MEDIUM" : "LOW";

  return {
    score: calculatedScore,
    riskLevel: level,
    summary:
      risks.length > 0
        ? `Contract contains ${risks.length} flagged risk clause(s). 2 free audit items visible, deeper clauses locked behind Pro.`
        : "No immediate predatory clauses detected in basic scan. Always review final terms manually.",
    detectedType: "Freelance Agreement / NDA",
    risks: risks
  };
}

export default function Home() {
  const [contractText, setContractText] = useState(SAMPLE_CONTRACT);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = () => {
    if (!contractText.trim()) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      setResult(analyzeContract(contractText));
      setIsAnalyzing(false);
    }, 600);
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#070b12", color: "#f1f5f9", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      {/* Top Navbar */}
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)", backgroundColor: "rgba(7, 11, 18, 0.85)", backdropFilter: "blur(10px)", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "34px", height: "34px", borderRadius: "9px", background: "linear-gradient(135deg, #2563eb, #3b82f6)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "900", color: "#fff" }}>
            🛡️
          </div>
          <div>
            <span style={{ fontWeight: "800", fontSize: "16px", color: "#ffffff", letterSpacing: "-0.3px" }}>ContractGuard</span>
            <span style={{ marginLeft: "8px", fontSize: "10px", fontWeight: "700", color: "#38bdf8", backgroundColor: "rgba(56, 189, 248, 0.12)", padding: "2px 6px", borderRadius: "4px" }}>FREE TIER</span>
          </div>
        </div>

        <a
          href={PAYMENT_LINK}
          target="_blank"
          rel="noopener noreferrer"
          style={{ backgroundColor: "rgba(37, 99, 235, 0.15)", border: "1px solid rgba(37, 99, 235, 0.4)", color: "#60a5fa", textDecoration: "none", padding: "7px 14px", borderRadius: "8px", fontSize: "12px", fontWeight: "700", display: "flex", alignItems: "center", gap: "6px" }}
        >
          <span>🔒 Unlock Full Pro</span>
        </a>
      </header>

      {/* Main Container */}
      <main style={{ maxWidth: "880px", margin: "0 auto", padding: "36px 18px" }}>
        
        {/* Welcome / Hero Section */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", backgroundColor: "rgba(37, 99, 235, 0.12)", border: "1px solid rgba(59, 130, 246, 0.3)", padding: "4px 14px", borderRadius: "999px", fontSize: "12px", fontWeight: "600", color: "#60a5fa", marginBottom: "14px" }}>
            <span>⚡</span> Automated Legal Risk Scanner
          </div>
          
          <h1 style={{ fontSize: "34px", fontWeight: "800", color: "#ffffff", letterSpacing: "-0.5px", margin: "0 0 10px 0", lineHeight: "1.25" }}>
            Welcome to ContractGuard
          </h1>
          
          <p style={{ fontSize: "15px", color: "#94a3b8", maxWidth: "600px", margin: "0 auto", lineHeight: "1.6" }}>
            ContractGuard helps freelancers and developers audit contracts in seconds. Paste your agreement below to spot predatory IP grabs, indefinite confidentiality, and risky non-compete clauses.
          </p>
        </div>

        {/* Audit Engine Status & Gauge */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px", marginBottom: "24px" }}>
          <div style={{ backgroundColor: "rgba(13, 19, 33, 0.85)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "14px", padding: "18px" }}>
            <span style={{ fontSize: "11px", fontWeight: "700", color: "#0ea5e9", textTransform: "uppercase" }}>Audit Coverage</span>
            <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#fff", margin: "6px 0 4px 0" }}>Clause Risk Scanner</h3>
            <p style={{ fontSize: "12px", color: "#94a3b8", margin: 0 }}>Free scan covers top-tier IP & term checks. Extended clauses locked to Pro inspection.</p>
          </div>

          <div style={{ backgroundColor: "rgba(13, 19, 33, 0.85)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "14px", padding: "18px" }}>
            <span style={{ fontSize: "11px", fontWeight: "700", color: result ? (result.riskLevel === "HIGH" ? "#f87171" : "#34d399") : "#94a3b8", textTransform: "uppercase" }}>
              {result ? `${result.riskLevel} RISK DETECTED` : "READY FOR AUDIT"}
            </span>
            <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginTop: "4px" }}>
              <span style={{ fontSize: "32px", fontWeight: "900", color: result ? (result.riskLevel === "HIGH" ? "#f87171" : "#34d399") : "#ffffff" }}>
                {result ? result.score : "--"}
              </span>
              <span style={{ fontSize: "13px", color: "#64748b" }}>/ 100 Safety Score</span>
            </div>
            <p style={{ fontSize: "12px", color: "#94a3b8", marginTop: "4px" }}>
              {result ? result.summary : "Load sample contract or paste your text to test."}
            </p>
          </div>
        </div>

        {/* Editor Area */}
        <div style={{ backgroundColor: "rgba(13, 19, 33, 0.85)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "14px", padding: "20px", marginBottom: "26px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", flexWrap: "wrap", gap: "8px" }}>
            <span style={{ fontSize: "12px", fontWeight: "700", textTransform: "uppercase", color: "#94a3b8" }}>
              Agreement Workspace
            </span>
            
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                type="button"
                onClick={() => setContractText(SAMPLE_CONTRACT)}
                style={{ background: "rgba(59, 130, 246, 0.15)", border: "1px solid rgba(59, 130, 246, 0.3)", color: "#60a5fa", padding: "6px 12px", borderRadius: "6px", fontSize: "12px", fontWeight: "600", cursor: "pointer" }}
              >
                ⚡ Try Sample Contract
              </button>
              
              {contractText && (
                <button
                  type="button"
                  onClick={() => { setContractText(""); setResult(null); }}
                  style={{ background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.1)", color: "#94a3b8", padding: "6px 12px", borderRadius: "6px", fontSize: "12px", cursor: "pointer" }}
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          <textarea
            value={contractText}
            onChange={(e) => setContractText(e.target.value)}
            style={{ width: "100%", boxSizing: "border-box", height: "210px", backgroundColor: "#060a12", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", padding: "14px", color: "#e2e8f0", fontSize: "13px", lineHeight: "1.6", resize: "vertical", outline: "none" }}
            placeholder="Paste your client contract, NDA, or agreement text here..."
          />

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "14px", flexWrap: "wrap", gap: "10px" }}>
            <span style={{ fontSize: "12px", color: "#64748b" }}>
              🔒 Private & secure: Scanned directly in your browser.
            </span>
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !contractText.trim()}
              style={{ backgroundColor: isAnalyzing ? "#1d4ed8" : "#2563eb", color: "#ffffff", border: "none", padding: "11px 24px", borderRadius: "8px", fontSize: "13px", fontWeight: "700", cursor: isAnalyzing ? "not-allowed" : "pointer" }}
            >
              {isAnalyzing ? "Scanning Clauses..." : "⚡ Run Contract Audit"}
            </button>
          </div>
        </div>

        {/* Identified Vulnerabilities List */}
        {result && (
          <div style={{ backgroundColor: "rgba(13, 19, 33, 0.85)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "14px", padding: "20px" }}>
            <div style={{ fontSize: "13px", fontWeight: "800", color: "#f87171", textTransform: "uppercase", marginBottom: "14px" }}>
              ⚠️ Detected Clause Risks ({result.risks.length})
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {result.risks.map((risk) => (
                <div 
                  key={risk.id} 
                  style={{ 
                    backgroundColor: "#070b14", 
                    border: "1px solid rgba(255,255,255,0.08)", 
                    borderRadius: "10px", 
                    padding: "16px",
                    position: "relative",
                    overflow: "hidden"
                  }}
                >
                  {/* Vercel-style Pro Lock Overlay */}
                  {risk.isLocked && (
                    <div style={{
                      position: "absolute",
                      inset: 0,
                      backgroundColor: "rgba(7, 11, 20, 0.88)",
                      backdropFilter: "blur(4px)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 10,
                      padding: "16px",
                      textAlign: "center"
                    }}>
                      <div style={{ fontSize: "20px", marginBottom: "6px" }}>🔒</div>
                      <div style={{ fontSize: "14px", fontWeight: "700", color: "#ffffff", marginBottom: "4px" }}>
                        Locked Pro Clause Inspection
                      </div>
                      <div style={{ fontSize: "12px", color: "#94a3b8", maxWidth: "360px", marginBottom: "12px" }}>
                        Unlock full redline clause breakdown, unskewed non-compete audits, and custom lawyer-grade revision templates.
                      </div>
                      <a
                        href={PAYMENT_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          backgroundColor: "#2563eb",
                          color: "#ffffff",
                          textDecoration: "none",
                          fontSize: "12px",
                          fontWeight: "700",
                          padding: "8px 18px",
                          borderRadius: "6px"
                        }}
                      >
                        Upgrade to Pro to Reveal →
                      </a>
                    </div>
                  )}

                  {/* Normal Risk Content */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                    <span style={{ fontSize: "15px", fontWeight: "700", color: "#ffffff" }}>{risk.title}</span>
                    <span style={{ backgroundColor: "rgba(239, 68, 68, 0.15)", color: "#f87171", fontSize: "11px", fontWeight: "700", padding: "2px 6px", borderRadius: "4px" }}>{risk.riskLevel} RISK</span>
                  </div>
                  <p style={{ fontSize: "13px", color: "#cbd5e1", margin: "0 0 10px 0", lineHeight: "1.5" }}>{risk.description}</p>
                  <div style={{ backgroundColor: "rgba(37, 99, 235, 0.12)", border: "1px solid rgba(59, 130, 246, 0.25)", borderRadius: "6px", padding: "10px 12px", fontSize: "12px", color: "#93c5fd" }}>
                    <strong>💡 Suggested Revision: </strong> {risk.recommendation}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
      }
      
