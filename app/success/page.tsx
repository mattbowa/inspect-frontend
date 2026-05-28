import Link from 'next/link'
import { t } from '../theme'

export default function Success() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <div style={{
        width: 64,
        height: 64,
        borderRadius: '50%',
        background: 'rgba(34, 197, 94, 0.1)',
        border: `1px solid ${t.success}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
      }}>
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke={t.success} strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h1 className="text-3xl font-bold mb-3" style={{ color: t.textPrimary }}>
        You&apos;re all set!
      </h1>
      <p className="text-base max-w-sm mb-8" style={{ color: t.textSecondary }}>
        Your subscription is active. You can now run full site audits.
      </p>

      <Link
        href="/"
        style={{
          borderRadius: 10,
          padding: '12px 28px',
          fontWeight: 600,
          fontSize: 14,
          background: t.accent,
          color: t.textPrimary,
          textDecoration: 'none',
        }}
      >
        Run your first full audit
      </Link>

      <Link
        href="/manage"
        style={{
          marginTop: 16,
          fontSize: 13,
          color: t.textMuted,
          textDecoration: 'none',
        }}
      >
        Manage your subscription →
      </Link>
    </main>
  )
}
