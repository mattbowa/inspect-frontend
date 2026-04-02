'use client'

import styled from '@emotion/styled'
import { css } from '@emotion/react'
import type { IssueSeverity } from './types'

export enum SeverityVariant {
  Error = 'error',
  Warning = 'warning',
  Info = 'info',
}

const StyledBadge = styled.span<{ variant: IssueSeverity }>`
  display: inline-block;
  border-radius: 4px;
  padding: 2px 8px;
  font-size: 11px;
  font-weight: 500;
  line-height: 1.6;

  ${(p) => {
    if (p.variant === 'error') {
      return css`
        background: #2d0a0a;
        color: #f87171;
        border: 1px solid #7f1d1d;
      `
    }
    if (p.variant === 'warning') {
      return css`
        background: #2d1b00;
        color: #fbbf24;
        border: 1px solid #78350f;
      `
    }
    return css`
      background: #1c1c1e;
      color: #a1a1aa;
      border: 1px solid #3f3f46;
    `
  }}
`

type Props = {
  severity: IssueSeverity
}

export const SeverityBadge = ({ severity }: Props) => {
  return <StyledBadge variant={severity}>{severity}</StyledBadge>
}
