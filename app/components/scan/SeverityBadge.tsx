'use client'

import styled from '@emotion/styled'
import { css } from '@emotion/react'
import type { IssueSeverity } from './types'
import { t } from '../../theme'

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
        background: ${t.errorBg};
        color: ${t.errorText};
        border: 1px solid ${t.error};
      `
    }
    if (p.variant === 'warning') {
      return css`
        background: ${t.warningBg};
        color: ${t.warningText};
        border: 1px solid ${t.warningBorder};
      `
    }
    return css`
      background: ${t.infoBg};
      color: ${t.info};
      border: 1px solid ${t.infoBorder};
    `
  }}
`

type Props = {
  severity: IssueSeverity
}

export const SeverityBadge = ({ severity }: Props) => {
  return <StyledBadge variant={severity}>{severity}</StyledBadge>
}
