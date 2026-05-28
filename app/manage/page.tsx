'use client'

import { useState } from 'react'
import { t } from '../theme'
import { API_BASE } from '../lib/api'

type State = 'idle' | 'loading' | 'error' | 'not_found'

export default function ManagePage() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<State>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setState('loading')
    setErrorMsg('')

    try {
      const res = await fetch(`${API_BASE}/billing/portal`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      })

      if (res.status === 404) {
        setState('not_found')
        return
      }

      if (!res.ok) {
        setErrorMsg('Something went wrong. Please try again.')
        setState('error')
        return
      }

      const data = await res.json()
      window.location.href = data.url
    } catch {
      setErrorMsg('Could not connect to the server. Please try again.')
      setState('error')
    }
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '64px 16px',
        background: t.bg,
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 420,
          background: t.surface,
          border: `1px solid ${t.border}`,
          borderRadius: 16,
          padding: '36px 32px',
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
        }}
      >
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: t.textPrimary, margin: 0, marginBottom: 6 }}>
            Manage subscription
          </h1>
          <p style={{ fontSize: 14, color: t.textSecondary, margin: 0 }}>
            Enter the email address you signed up with and we&apos;ll take you to the billing portal.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={state === 'loading'}
            style={{
              borderRadius: 8,
              border: `1px solid ${t.border}`,
              background: t.bg,
              color: t.textPrimary,
              padding: '10px 12px',
              fontSize: 14,
              outline: 'none',
              width: '100%',
              boxSizing: 'border-box',
              opacity: state === 'loading' ? 0.5 : 1,
            }}
          />

          {state === 'not_found' && (
            <p style={{ fontSize: 13, color: t.errorText, margin: 0 }}>
              No active subscription found for that email.
            </p>
          )}

          {state === 'error' && (
            <p style={{ fontSize: 13, color: t.errorText, margin: 0 }}>{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={!email.trim() || state === 'loading'}
            style={{
              borderRadius: 10,
              padding: '11px 0',
              fontWeight: 600,
              fontSize: 14,
              background: t.accent,
              color: t.textPrimary,
              border: 'none',
              cursor: state === 'loading' ? 'not-allowed' : 'pointer',
              opacity: !email.trim() || state === 'loading' ? 0.6 : 1,
              transition: 'opacity 150ms ease',
            }}
          >
            {state === 'loading' ? 'Redirecting…' : 'Go to billing portal'}
          </button>
        </form>
      </div>
    </main>
  )
}
