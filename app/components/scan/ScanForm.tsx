'use client'

import { useState, useEffect, useRef } from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import type { ScanStatus, Report } from './types'
import { StatusBar } from './StatusBar'
import { ScoreRing } from './ScoreRing'
import { AgentCard } from './AgentCard'
import { t } from '../../theme'

import { API_BASE } from '../../lib/api'

// ── Form ──────────────────────────────────────────────────────────────────────

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const InputRow = styled.div`
  display: flex;
  gap: 8px;
`

const InputWrapper = styled.div`
  position: relative;
  flex: 1;
`

const InputPrefix = styled.span`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  color: ${t.textMuted};
  pointer-events: none;
  user-select: none;
`

const Input = styled.input<{ disabled?: boolean }>`
  width: 100%;
  border-radius: 12px;
  border: 1px solid ${t.border};
  background: ${t.surface};
  padding: 14px 16px 14px 72px;
  font-size: 15px;
  color: ${t.textPrimary};
  outline: none;
  transition: border-color 150ms ease, box-shadow 150ms ease;

  &::placeholder {
    color: ${t.textMuted};
  }

  &:focus {
    border-color: ${t.accent};
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
  }

  ${(p) =>
    p.disabled &&
    css`
      opacity: 0.5;
      cursor: not-allowed;
    `}
`

const EmailInput = styled.input<{ disabled?: boolean }>`
  width: 100%;
  border-radius: 12px;
  border: 1px solid ${t.accent};
  background: ${t.surface};
  padding: 12px 16px;
  font-size: 14px;
  color: ${t.textPrimary};
  outline: none;
  transition: border-color 150ms ease, box-shadow 150ms ease;

  &::placeholder {
    color: ${t.textMuted};
  }

  &:focus {
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
  }

  ${(p) =>
    p.disabled &&
    css`
      opacity: 0.5;
      cursor: not-allowed;
    `}
`

const SubscriberPrompt = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 2px 0;
`

const SubscriberLabel = styled.span`
  font-size: 13px;
  color: ${t.textMuted};
  white-space: nowrap;
`

const SubmitButton = styled.button<{ disabled?: boolean }>`
  border-radius: 12px;
  background: linear-gradient(135deg, ${t.accent} 0%, #7c3aed 100%);
  box-shadow: 0 4px 20px rgba(99, 102, 241, 0.35);
  color: ${t.textPrimary};
  font-weight: 600;
  font-size: 15px;
  padding: 14px 24px;
  border: none;
  cursor: pointer;
  white-space: nowrap;
  transition: box-shadow 150ms ease, opacity 150ms ease;

  &:hover:not(:disabled) {
    box-shadow: 0 4px 28px rgba(99, 102, 241, 0.55);
    opacity: 0.92;
  }

  ${(p) =>
    p.disabled &&
    css`
      opacity: 0.5;
      cursor: not-allowed;
      box-shadow: none;
    `}
`

// ── Error ─────────────────────────────────────────────────────────────────────

const ErrorBox = styled.div`
  margin-top: 24px;
  border-radius: 12px;
  border: 1px solid ${t.error};
  background: rgba(157, 34, 53, 0.15);
  padding: 16px 20px;
  font-size: 13px;
  color: ${t.errorText};
`

// ── Upsell ────────────────────────────────────────────────────────────────────

const UpsellBanner = styled.div`
  margin-top: 24px;
  border-radius: 12px;
  border: 1px solid ${t.border};
  background: rgba(55, 48, 163, 0.15);
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
`

const UpsellText = styled.p`
  flex: 1;
  font-size: 13px;
  color: ${t.textSecondary};
  margin: 0;
`

const UpsellButton = styled.a`
  flex-shrink: 0;
  border-radius: 8px;
  background: ${t.accent};
  color: ${t.textPrimary};
  font-weight: 600;
  font-size: 13px;
  padding: 8px 16px;
  text-decoration: none;
  transition: background 150ms ease;

  &:hover {
    background: ${t.accentHover};
  }
`

// ── Report ────────────────────────────────────────────────────────────────────

const ReportWrapper = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`

const ReportHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (min-width: 640px) {
    flex-direction: row;
    align-items: flex-start;
  }
`

const ReportMeta = styled.div`
  flex: 1;
`

const MetaHint = styled.p`
  font-size: 12px;
  color: ${t.textMuted};
  margin: 0 0 4px;
`

const MetaUrl = styled.p`
  font-family: monospace;
  font-size: 14px;
  color: ${t.textSecondary};
  word-break: break-all;
  margin: 0 0 4px;
`

const MetaScanId = styled.p`
  font-size: 11px;
  color: ${t.textMuted};
  margin: 0;
`

const ActionsCard = styled.div`
  border-radius: 12px;
  border: 1px solid ${t.border};
  background: ${t.surface};
  padding: 20px;
`

const ActionsTitle = styled.h2`
  font-weight: 600;
  font-size: 15px;
  color: ${t.textPrimary};
  margin: 0 0 16px;
`

const ActionsList = styled.ol`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 0;
  padding: 0;
  list-style: none;
`

const ActionItem = styled.li`
  display: flex;
  gap: 12px;
  font-size: 13px;
  color: ${t.textSecondary};
`

const ActionNumber = styled.span`
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${t.border};
  color: ${t.textPrimary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  margin-top: 1px;
`

const FindingsTitle = styled.h2`
  font-weight: 600;
  font-size: 15px;
  color: ${t.textPrimary};
  margin: 0;
`

const FindingsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

// ── Component ─────────────────────────────────────────────────────────────────

export const ScanForm = () => {
  const [url, setUrl] = useState('')
  const [email, setEmail] = useState('')
  const [notify, setNotify] = useState(false)
  const [showEmailPrompt, setShowEmailPrompt] = useState(false)
  const [maxPages, setMaxPages] = useState(1)
  const [status, setStatus] = useState<ScanStatus>('idle')
  const [scanId, setScanId] = useState<string | null>(null)
  const [report, setReport] = useState<Report | null>(null)
  const [error, setError] = useState<string | null>(null)
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const reportRef = useRef<HTMLDivElement | null>(null)
  const domainCheckRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (pollRef.current) clearInterval(pollRef.current)
      if (domainCheckRef.current) clearTimeout(domainCheckRef.current)
    }
  }, [])

  useEffect(() => {
    fetch(`${API_BASE}/config`)
      .then((r) => r.json())
      .then((data) => setMaxPages(data.free_page_limit))
      .catch(() => {})
  }, [])

  function handleUrlChange(value: string) {
    setUrl(value)
    setShowEmailPrompt(false)
    setEmail('')

    if (domainCheckRef.current) clearTimeout(domainCheckRef.current)

    const trimmed = value.trim()
    if (!trimmed || trimmed.length < 4) return

    domainCheckRef.current = setTimeout(async () => {
      let normalized = trimmed
      if (!/^https?:\/\//i.test(normalized)) normalized = 'https://' + normalized
      try {
        const res = await fetch(`${API_BASE}/billing/check-domain`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ website: normalized }),
        })
        if (!res.ok) return
        const data = await res.json()
        if (data.website_subscribed) setShowEmailPrompt(true)
      } catch {
        // silently ignore — don't block scanning if check fail
      }
    }, 600)
  }

  async function startScan(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setReport(null)
    setScanId(null)
    setStatus('pending')

    let normalized = url.trim()
    if (!/^https?:\/\//i.test(normalized)) normalized = 'https://' + normalized

    try {
      const trimmedEmail = email.trim()
      const body: Record<string, unknown> = {
        url: normalized,
        max_pages: trimmedEmail ? 200 : maxPages,
      }
      if (trimmedEmail) {
        body.email = trimmedEmail
        body.notify = notify
      }

      const res = await fetch(`${API_BASE}/scans`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (!res.ok) throw new Error(`API error ${res.status}`)
      const data = await res.json()
      setScanId(data.scan_id)
      poll(data.scan_id)
    } catch (err) {
      setStatus('failed')
      setError(err instanceof Error ? err.message : 'Failed to start scan')
    }
  }

  function poll(id: string) {
    if (pollRef.current) clearInterval(pollRef.current)
    pollRef.current = setInterval(async () => {
      try {
        const res = await fetch(`${API_BASE}/scans/${id}/status`)
        if (!res.ok) throw new Error(`Status check failed: ${res.status}`)
        const data = await res.json()
        const s: ScanStatus = data.status
        setStatus(s)
        if (s === 'done') {
          clearInterval(pollRef.current!)
          fetchReport(id)
        } else if (s === 'failed') {
          clearInterval(pollRef.current!)
          setError('Scan failed. Check that the backend is running and the URL is accessible.')
        }
      } catch (err) {
        clearInterval(pollRef.current!)
        setStatus('failed')
        setError(err instanceof Error ? err.message : 'Polling error')
      }
    }, 2000)
  }

  async function fetchReport(id: string) {
    try {
      const res = await fetch(`${API_BASE}/reports/${id}`)
      if (!res.ok) throw new Error(`Report fetch failed: ${res.status}`)
      const data: Report = await res.json()
      setReport(data)
      setTimeout(() => reportRef.current?.scrollIntoView({ behavior: 'smooth' }), 100)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch report')
    }
  }

  const isScanning = status === 'pending' || status === 'crawling' || status === 'analysing'

  return (
    <div>
      <Form onSubmit={startScan}>
        <InputRow>
          <InputWrapper>
            <InputPrefix>https://</InputPrefix>
            <Input
              type="text"
              value={url}
              onChange={(e) => handleUrlChange(e.target.value)}
              placeholder="yoursite.com"
              required
              disabled={isScanning}
            />
          </InputWrapper>
          <SubmitButton type="submit" disabled={isScanning || !url.trim()}>
            {isScanning ? 'Scanning…' : 'Run Audit'}
          </SubmitButton>
        </InputRow>

        {showEmailPrompt && (
          <>
            <SubscriberPrompt>
              <SubscriberLabel>Subscriber email</SubscriberLabel>
              <EmailInput
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com — unlock unlimited pages"
                disabled={isScanning}
                autoFocus
              />
            </SubscriberPrompt>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', userSelect: 'none' }}>
              <input
                type="checkbox"
                checked={notify}
                onChange={(e) => setNotify(e.target.checked)}
                disabled={isScanning}
                style={{ accentColor: t.accentHover, width: 14, height: 14 }}
              />
              <span style={{ fontSize: 13, color: t.textSubtle }}>Email me a copy of this report</span>
            </label>
          </>
        )}
      </Form>

      <StatusBar status={status} />

      {error && <ErrorBox>{error}</ErrorBox>}

      {report && report.pages_crawled > 0 && report.pages_crawled < report.pages_discovered && (
        <UpsellBanner>
          <UpsellText>
            Free scan: audited <strong>{report.pages_crawled}</strong> of{' '}
            <strong>~{report.pages_discovered}</strong> pages found on your site. Upgrade to scan
            your entire site.
          </UpsellText>
          <UpsellButton href="/pricing">Upgrade</UpsellButton>
        </UpsellBanner>
      )}

      {report && (
        <ReportWrapper ref={reportRef}>
          <ReportHeader>
            <ScoreRing score={report.seo_score} />
            <ReportMeta>
              <MetaHint>Audit for</MetaHint>
              <MetaUrl>{report.url}</MetaUrl>
              <MetaScanId>
                {report.pages_discovered > 0 && (
                  <>
                    {report.pages_crawled > 0 ? report.pages_crawled : maxPages} of ~{report.pages_discovered} pages analysed &middot;{' '}
                  </>
                )}
                Scan ID: {report.scan_id}
              </MetaScanId>
            </ReportMeta>
          </ReportHeader>

          {report.top_actions?.length > 0 && (
            <ActionsCard>
              <ActionsTitle>Top Actions</ActionsTitle>
              <ActionsList>
                {report.top_actions.map((action, i) => (
                  <ActionItem key={i}>
                    <ActionNumber>{i + 1}</ActionNumber>
                    {action}
                  </ActionItem>
                ))}
              </ActionsList>
            </ActionsCard>
          )}

          {report.agents?.length > 0 && (
            <div>
              <FindingsTitle>Detailed Findings</FindingsTitle>
              <FindingsList style={{ marginTop: 12 }}>
                {report.agents.map((agent) => (
                  <AgentCard key={agent.agent} result={agent} />
                ))}
              </FindingsList>
            </div>
          )}

          {report.agents?.some((a) =>
            a.issues.some((i) => i.severity === 'error' || i.severity === 'warning')
          ) && (
            <div style={{
              borderRadius: 14,
              border: `1px solid rgba(99, 102, 241, 0.4)`,
              background: 'rgba(79, 70, 229, 0.07)',
              padding: '20px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 16,
              flexWrap: 'wrap',
            }}>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, color: t.textPrimary, margin: '0 0 4px' }}>
                  Want us to fix these issues for you?
                </p>
                <p style={{ fontSize: 13, color: t.textSecondary, margin: 0 }}>
                  Our team can resolve technical SEO issues starting from $99.
                </p>
              </div>
              <a
                href="/services"
                style={{
                  flexShrink: 0,
                  borderRadius: 9,
                  background: t.accent,
                  color: t.textPrimary,
                  fontWeight: 600,
                  fontSize: 13,
                  padding: '9px 18px',
                  textDecoration: 'none',
                }}
              >
                View services
              </a>
            </div>
          )}
        </ReportWrapper>
      )}
    </div>
  )
}
