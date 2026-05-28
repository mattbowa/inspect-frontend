'use client'

import { useState } from 'react'
import Link from 'next/link'
import { t } from '../theme'
import { API_BASE } from '../lib/api'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [reason, setReason] = useState('General enquiry')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch(`${API_BASE}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), reason, message: message.trim() }),
      })
      if (!res.ok) throw new Error(`Error ${res.status}`)
      setSent(true)
    } catch {
      setError('Failed to send message. Please email us directly at audits@inspectflux.com')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%',
    borderRadius: 10,
    border: `1px solid ${t.border}`,
    background: t.surface,
    padding: '12px 14px',
    fontSize: 14,
    color: t.textPrimary,
    outline: 'none',
    boxSizing: 'border-box' as const,
  }

  const labelStyle = {
    fontSize: 12,
    fontWeight: 600,
    color: t.textMuted,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
    display: 'block',
    marginBottom: 6,
  }

  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-16 sm:px-6">
      <div className="w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-2" style={{ color: t.textPrimary }}>
          Contact
        </h1>
        <p className="mb-10" style={{ fontSize: 14, color: t.textSecondary }}>
          Have a question or need help? We&apos;ll get back to you shortly.
        </p>

        {sent ? (
          <div style={{
            borderRadius: 16,
            border: `1px solid ${t.success}`,
            background: 'rgba(34, 197, 94, 0.08)',
            padding: 28,
            textAlign: 'center',
          }}>
            <p style={{ fontSize: 16, fontWeight: 600, color: t.success, margin: '0 0 8px' }}>Message sent</p>
            <p style={{ fontSize: 13, color: t.textSecondary, margin: 0 }}>
              We&apos;ll get back to you at {email}.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <label style={labelStyle}>Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                disabled={loading}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                disabled={loading}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Reason</label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                disabled={loading}
                style={{ ...inputStyle, cursor: 'pointer' }}
              >
                <option>General enquiry</option>
                <option>Fix my SEO issues</option>
                <option>Billing &amp; plans</option>
                <option>Bug report</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label style={labelStyle}>Message</label>
              <textarea
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can we help?"
                rows={5}
                disabled={loading}
                style={{ ...inputStyle, resize: 'vertical' }}
              />
            </div>

            {error && (
              <p style={{ fontSize: 13, color: t.errorText, margin: 0 }}>{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                borderRadius: 10,
                background: t.accent,
                color: t.textPrimary,
                fontWeight: 600,
                fontSize: 14,
                padding: '12px 0',
                border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.6 : 1,
              }}
            >
              {loading ? 'Sending…' : 'Send message'}
            </button>
          </form>
        )}

        <div className="mt-12">
          <Link href="/" style={{ fontSize: 13, color: t.textMuted, textDecoration: 'none' }}>
            ← Back to audit
          </Link>
        </div>
      </div>
    </main>
  )
}
