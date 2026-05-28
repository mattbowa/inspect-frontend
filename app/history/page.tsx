'use client'

import { useState } from 'react'
import Link from 'next/link'
import { t } from '../theme'
import { API_BASE } from '../lib/api'

interface NewIssue {
  page_url: string
  type: string
}

interface DiffResult {
  new_issues: NewIssue[]
  previous_scan_id: string | null
}

interface AgentSummary {
  agent: string
  summary: string
  issue_counts: { error: number; warning: number; info: number }
}

interface ReportSummary {
  top_actions: string[]
  agents: AgentSummary[]
  pages_crawled: number
  pages_discovered: number
}

interface ScanSummary {
  scan_id: string
  url: string
  seo_score: number | null
  status: string
  created_at: string
  report: ReportSummary | null
}

const AGENT_LABEL: Record<string, string> = {
  technical: 'Technical',
  content: 'Content',
  linking: 'Internal Linking',
  strategy: 'Strategy',
}

function scoreColor(score: number | null) {
  if (score === null) return t.textMuted
  if (score >= 80) return t.success
  if (score >= 50) return t.warning
  return t.errorText
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function ScanRow({ scan, email }: { scan: ScanSummary; email: string }) {
  const [open, setOpen] = useState(false)
  const [diff, setDiff] = useState<DiffResult | null>(null)
  const report = scan.report

  async function handleOpen() {
    const next = !open
    setOpen(next)
    if (next && diff === null && scan.status === 'done') {
      try {
        const params = new URLSearchParams({ email })
        const res = await fetch(`${API_BASE}/history/${scan.scan_id}/diff?${params}`)
        if (res.ok) setDiff(await res.json())
      } catch {
        // silently ignore — diff is a bonus, not critical
      }
    }
  }

  return (
    <div style={{ borderRadius: 12, border: `1px solid ${open ? t.accent : t.border}`, background: t.surface, overflow: 'hidden', transition: 'border-color 150ms ease' }}>
      {/* Row header */}
      <button
        onClick={handleOpen}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          padding: '14px 18px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <span style={{ fontSize: 22, fontWeight: 700, color: scoreColor(scan.seo_score), minWidth: 40, textAlign: 'center' }}>
          {scan.seo_score ?? '—'}
        </span>

        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: 13, fontWeight: 500, color: t.textPrimary, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {scan.url}
          </p>
          <p style={{ fontSize: 11, color: t.textMuted, margin: '2px 0 0' }}>
            {formatDate(scan.created_at)}
          </p>
        </div>

        <span style={{ fontSize: 11, fontWeight: 600, color: scan.status === 'done' ? t.success : t.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em', flexShrink: 0 }}>
          {scan.status}
        </span>

        <svg
          width="14" height="14" fill="none" viewBox="0 0 24 24"
          stroke={t.textMuted} strokeWidth={2} style={{ flexShrink: 0, transition: 'transform 200ms ease', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Expanded detail */}
      {open && (
        <div style={{ borderTop: `1px solid ${t.border}`, padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {report ? (
            <>
              {/* Top actions */}
              {report.top_actions?.length > 0 && (
                <div>
                  <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: t.textMuted, marginBottom: 8 }}>
                    Top Actions
                  </p>
                  <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {report.top_actions.map((action, i) => (
                      <li key={i} style={{ display: 'flex', gap: 10, fontSize: 13, color: t.textSecondary }}>
                        <span style={{ flexShrink: 0, width: 18, height: 18, borderRadius: '50%', background: t.border, color: t.textPrimary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, marginTop: 1 }}>
                          {i + 1}
                        </span>
                        {action}
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {/* Agent summaries */}
              {report.agents?.length > 0 && (
                <div>
                  <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: t.textMuted, marginBottom: 8 }}>
                    Agent Findings
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {report.agents.map((agent) => (
                      <div key={agent.agent} style={{ borderRadius: 8, border: `1px solid ${t.border}`, padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                        <div>
                          <p style={{ fontSize: 13, fontWeight: 600, color: t.textPrimary, margin: '0 0 2px' }}>
                            {AGENT_LABEL[agent.agent] ?? agent.agent}
                          </p>
                          <p style={{ fontSize: 12, color: t.textSecondary, margin: 0 }}>{agent.summary}</p>
                        </div>
                        <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                          {agent.issue_counts.error > 0 && (
                            <span style={{ fontSize: 11, fontWeight: 600, color: t.errorText }}>{agent.issue_counts.error} error{agent.issue_counts.error > 1 ? 's' : ''}</span>
                          )}
                          {agent.issue_counts.warning > 0 && (
                            <span style={{ fontSize: 11, fontWeight: 600, color: t.warning }}>{agent.issue_counts.warning} warning{agent.issue_counts.warning > 1 ? 's' : ''}</span>
                          )}
                          {agent.issue_counts.error === 0 && agent.issue_counts.warning === 0 && (
                            <span style={{ fontSize: 11, fontWeight: 600, color: t.success }}>Clean</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* New issues since last scan */}
              {diff && (
                <div>
                  <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: t.textMuted, marginBottom: 8 }}>
                    New since last scan
                  </p>
                  {diff.new_issues.length === 0 ? (
                    <p style={{ fontSize: 13, color: t.success, margin: 0 }}>No new issues detected.</p>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      {diff.new_issues.map((issue, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: t.textSecondary }}>
                          <span style={{ color: t.errorText, flexShrink: 0, marginTop: 1 }}>↑</span>
                          <span>
                            <span style={{ color: t.errorText, fontWeight: 500 }}>{issue.type.replace(/_/g, ' ')}</span>
                            {' '}on <span style={{ fontFamily: 'monospace', fontSize: 11, color: t.textMuted }}>{issue.page_url}</span>
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <p style={{ fontSize: 11, color: t.textMuted, margin: 0 }}>
                {report.pages_crawled} page{report.pages_crawled !== 1 ? 's' : ''} crawled · Scan ID: {scan.scan_id}
              </p>
            </>
          ) : (
            <p style={{ fontSize: 13, color: t.textMuted, margin: 0 }}>
              This was an automated monitoring scan — no detailed report stored. Scan ID: {scan.scan_id}
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export default function History() {
  const [email, setEmail] = useState('')
  const [scans, setScans] = useState<ScanSummary[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function fetchHistory(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setScans(null)

    try {
      const params = new URLSearchParams({ email: email.trim() })
      const res = await fetch(`${API_BASE}/history?${params}`)
      if (res.status === 403) {
        setError('No active subscription found for this email.')
        return
      }
      if (!res.ok) throw new Error(`Error ${res.status}`)
      const data: ScanSummary[] = await res.json()
      setScans(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load history')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-16 sm:px-6">
      <div className="w-full max-w-3xl">

        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-2" style={{ color: t.textPrimary }}>Scan History</h1>
          <p style={{ fontSize: 14, color: t.textSecondary }}>Enter your subscriber email to view past scans.</p>
        </div>

        <form onSubmit={fetchHistory} style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            style={{ flex: 1, borderRadius: 12, border: `1px solid ${t.border}`, background: t.surface, padding: '12px 16px', fontSize: 14, color: t.textPrimary, outline: 'none' }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{ borderRadius: 12, background: t.accent, color: t.textPrimary, fontWeight: 600, fontSize: 14, padding: '12px 24px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.6 : 1, whiteSpace: 'nowrap' }}
          >
            {loading ? 'Loading…' : 'View history'}
          </button>
        </form>

        {error && (
          <div style={{ borderRadius: 12, border: `1px solid ${t.error}`, background: 'rgba(157, 34, 53, 0.15)', padding: '14px 18px', fontSize: 13, color: t.errorText, marginBottom: 24 }}>
            {error}
            {error.includes('subscription') && (
              <Link href="/pricing" style={{ color: t.accent, marginLeft: 8, textDecoration: 'none', fontWeight: 600 }}>View plans →</Link>
            )}
          </div>
        )}

        {scans !== null && (
          scans.length === 0 ? (
            <p style={{ fontSize: 14, color: t.textMuted }}>No scans found for this account.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {scans.map((scan) => (
                <ScanRow key={scan.scan_id} scan={scan} email={email} />
              ))}
            </div>
          )
        )}

        <div className="mt-12">
          <Link href="/" style={{ fontSize: 13, color: t.textMuted, textDecoration: 'none' }}>← Back to audit</Link>
        </div>
      </div>
    </main>
  )
}
