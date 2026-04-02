'use client'

import { useState, useEffect, useRef } from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import type { ScanStatus, Report } from './types'
import { StatusBar } from './StatusBar'
import { ScoreRing } from './ScoreRing'
import { AgentCard } from './AgentCard'

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'

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
  color: #52525b;
  pointer-events: none;
  user-select: none;
`

const Input = styled.input<{ disabled?: boolean }>`
  width: 100%;
  border-radius: 12px;
  border: 1px solid #3f3f46;
  background: #111113;
  padding: 14px 16px 14px 80px;
  font-size: 15px;
  color: #fafafa;
  outline: none;
  transition: border-color 150ms ease, box-shadow 150ms ease;

  &::placeholder {
    color: #52525b;
  }

  &:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
  }

  ${(p) =>
    p.disabled &&
    css`
      opacity: 0.5;
      cursor: not-allowed;
    `}
`

const SubmitButton = styled.button<{ disabled?: boolean }>`
  border-radius: 12px;
  background: #4f46e5;
  color: #fff;
  font-weight: 600;
  font-size: 15px;
  padding: 14px 24px;
  border: none;
  cursor: pointer;
  white-space: nowrap;
  transition: background 150ms ease;

  &:hover:not(:disabled) {
    background: #6366f1;
  }

  ${(p) =>
    p.disabled &&
    css`
      opacity: 0.5;
      cursor: not-allowed;
    `}
`

const SliderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const SliderLabel = styled.label`
  font-size: 13px;
  color: #71717a;
  white-space: nowrap;
`

const Slider = styled.input`
  flex: 1;
  accent-color: #6366f1;
`

const SliderValue = styled.span`
  font-size: 13px;
  color: #d4d4d8;
  width: 28px;
  text-align: right;
`

// ── Error ─────────────────────────────────────────────────────────────────────

const ErrorBox = styled.div`
  margin-top: 24px;
  border-radius: 12px;
  border: 1px solid #7f1d1d;
  background: rgba(127, 29, 29, 0.2);
  padding: 16px 20px;
  font-size: 13px;
  color: #fca5a5;
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
  color: #52525b;
  margin: 0 0 4px;
`

const MetaUrl = styled.p`
  font-family: monospace;
  font-size: 14px;
  color: #d4d4d8;
  word-break: break-all;
  margin: 0 0 4px;
`

const MetaScanId = styled.p`
  font-size: 11px;
  color: #52525b;
  margin: 0;
`

const ActionsCard = styled.div`
  border-radius: 12px;
  border: 1px solid #27272a;
  background: #111113;
  padding: 20px;
`

const ActionsTitle = styled.h2`
  font-weight: 600;
  font-size: 15px;
  color: #fafafa;
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
  color: #d4d4d8;
`

const ActionNumber = styled.span`
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #1e1b4b;
  color: #a5b4fc;
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
  color: #fafafa;
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
  const [maxPages, setMaxPages] = useState(20)
  const [status, setStatus] = useState<ScanStatus>('idle')
  const [scanId, setScanId] = useState<string | null>(null)
  const [report, setReport] = useState<Report | null>(null)
  const [error, setError] = useState<string | null>(null)
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const reportRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    return () => {
      if (pollRef.current) clearInterval(pollRef.current)
    }
  }, [])

  async function startScan(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setReport(null)
    setScanId(null)
    setStatus('pending')

    let normalized = url.trim()
    if (!/^https?:\/\//i.test(normalized)) normalized = 'https://' + normalized

    try {
      const res = await fetch(`${API_BASE}/scans`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: normalized, max_pages: maxPages }),
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
              onChange={(e) => setUrl(e.target.value)}
              placeholder="yoursite.com"
              required
              disabled={isScanning}
            />
          </InputWrapper>
          <SubmitButton type="submit" disabled={isScanning || !url.trim()}>
            {isScanning ? 'Scanning…' : 'Run Audit'}
          </SubmitButton>
        </InputRow>

        <SliderRow>
          <SliderLabel htmlFor="maxPages">Pages to crawl:</SliderLabel>
          <Slider
            id="maxPages"
            type="range"
            min={1}
            max={100}
            value={maxPages}
            onChange={(e) => setMaxPages(Number(e.target.value))}
            disabled={isScanning}
          />
          <SliderValue>{maxPages}</SliderValue>
        </SliderRow>
      </Form>

      <StatusBar status={status} />

      {error && <ErrorBox>{error}</ErrorBox>}

      {report && (
        <ReportWrapper ref={reportRef}>
          <ReportHeader>
            <ScoreRing score={report.seo_score} />
            <ReportMeta>
              <MetaHint>Audit for</MetaHint>
              <MetaUrl>{report.url}</MetaUrl>
              <MetaScanId>Scan ID: {report.scan_id}</MetaScanId>
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
        </ReportWrapper>
      )}
    </div>
  )
}
