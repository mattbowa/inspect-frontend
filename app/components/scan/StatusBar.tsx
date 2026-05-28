'use client'

import styled from '@emotion/styled'
import { css } from '@emotion/react'
import type { ScanStatus } from './types'
import { STATUS_LABEL } from './types'
import { t } from '../../theme'

const STEPS: ScanStatus[] = ['pending', 'crawling', 'analysing', 'done']

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 24px;
`

const Step = styled.div<{ state: 'done' | 'active' | 'upcoming' }>`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;

  ${(p) => {
    if (p.state === 'done') return css`color: ${t.success};`
    if (p.state === 'active') return css`color: ${t.textPrimary};`
    return css`color: ${t.textMuted};`
  }}
`

const Connector = styled.div<{ filled: boolean }>`
  height: 1px;
  width: 24px;
  background: ${(p) => (p.filled ? t.successDim : t.border)};
`

const IconCheck = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
)

const IconSpinner = () => (
  <svg
    width="16"
    height="16"
    fill="none"
    viewBox="0 0 24 24"
    style={{ animation: 'spin 1s linear infinite' }}
  >
    <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25" />
    <path fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" opacity="0.75" />
  </svg>
)

const IconDot = () => (
  <svg width="16" height="16" viewBox="0 0 16 16">
    <circle cx="8" cy="8" r="6" fill="none" stroke={t.border} strokeWidth="1.5" />
  </svg>
)

type Props = {
  status: ScanStatus
}

export const StatusBar = ({ status }: Props) => {
  if (status === 'idle' || status === 'failed') return null

  const currentIdx = STEPS.indexOf(status)

  return (
    <Wrapper>
      {STEPS.map((step, i) => {
        const isDone = i < currentIdx || status === 'done'
        const isActive = i === currentIdx && status !== 'done'
        const state = isDone ? 'done' : isActive ? 'active' : 'upcoming'

        return (
          <div key={step} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Step state={state}>
              {isDone ? <IconCheck /> : isActive ? <IconSpinner /> : <IconDot />}
              <span>{STATUS_LABEL[step]}</span>
            </Step>
            {i < STEPS.length - 1 && <Connector filled={i < currentIdx} />}
          </div>
        )
      })}
    </Wrapper>
  )
}
