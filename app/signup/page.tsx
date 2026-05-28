'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { t } from '../theme'
import { API_BASE } from '../lib/api'

const PLAN_LABELS: Record<string, { name: string; price: string }> = {
  business: { name: 'Business', price: '9.99' },
  enterprise: { name: 'Enterprise', price: '29.99' },
}

async function fetchWithRetry(url: string, options: RequestInit, retries = 1): Promise<Response> {
  try {
    return await fetch(url, options)
  } catch (err) {
    if (retries > 0) {
      await new Promise(r => setTimeout(r, 2500))
      return fetchWithRetry(url, options, retries - 1)
    }
    throw err
  }
}

function SignupForm() {
  const params = useSearchParams()
  const plan = params.get('plan') ?? 'business'
  const planMeta = PLAN_LABELS[plan] ?? PLAN_LABELS.business

  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim() || !website.trim()) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetchWithRetry(`${API_BASE}/billing/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), plan, website: website.trim() }),
      })
      if (!res.ok) throw new Error('Failed to start checkout')
      const data = await res.json()
      window.location.href = data.url
    } catch {
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-16 sm:px-6">
      <div
        style={{
          width: '100%',
          maxWidth: 440,
          background: t.surface,
          border: `1px solid ${t.border}`,
          borderRadius: 16,
          padding: '36px 32px',
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
        }}
      >
        {/* Header */}
        <div>
          <p style={{ fontSize: 12, fontWeight: 600, color: t.accent, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
            {planMeta.name} plan — ${planMeta.price}/mo
          </p>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: t.textPrimary, margin: 0, marginBottom: 6 }}>
            Get started
          </h1>
          <p style={{ fontSize: 14, color: t.textSecondary, margin: 0 }}>
            Enter your details and we&apos;ll take you to checkout.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 500, color: t.textSecondary }}>
              Work email
            </label>
            <input
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 500, color: t.textSecondary }}>
              Website URL
            </label>
            <input
              type="url"
              placeholder="https://yoursite.com"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              required
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
              }}
            />
          </div>

          {error && <p style={{ fontSize: 13, color: t.errorText, margin: 0 }}>{error}</p>}

          <button
            type="submit"
            disabled={!email.trim() || !website.trim() || loading}
            style={{
              marginTop: 4,
              borderRadius: 10,
              padding: '12px 0',
              fontWeight: 600,
              fontSize: 14,
              background: t.accent,
              color: t.textPrimary,
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: !email.trim() || !website.trim() || loading ? 0.6 : 1,
              transition: 'opacity 150ms ease',
            }}
          >
            {loading ? 'Redirecting…' : 'Continue to payment'}
          </button>
        </form>

        <p style={{ fontSize: 12, color: t.textMuted, margin: 0, textAlign: 'center' }}>
          Wrong plan?{' '}
          <Link href="/pricing" style={{ color: t.accent, textDecoration: 'none' }}>
            Go back to pricing
          </Link>
        </p>
      </div>
    </main>
  )
}

export default function SignupPage() {
  return (
    <Suspense>
      <SignupForm />
    </Suspense>
  )
}
