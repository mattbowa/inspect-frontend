import Link from 'next/link'
import { t } from '../theme'

const faqCategories = [
  { label: 'General', href: '/faq#general' },
  { label: 'Scans & checks', href: '/faq#scans-checks' },
  { label: 'Monitoring & alerts', href: '/faq#monitoring-alerts' },
  { label: 'Services', href: '/faq#services' },
  { label: 'Billing', href: '/faq#billing' },
]

const links = [
  { label: 'History', href: '/history' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
  { label: 'Manage plan', href: '/manage' },
]

export function Footer() {
  return (
    <footer
      style={{
        borderTop: `1px solid ${t.border}`,
        background: t.surface,
        marginTop: 'auto',
      }}
    >
      <div
        style={{
          maxWidth: 960,
          margin: '0 auto',
          padding: '40px 24px 32px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: 40,
        }}
      >
        {/* Brand */}
        <div>
          <p style={{ fontSize: 14, fontWeight: 700, color: t.textPrimary, marginBottom: 8 }}>
            InspectFlux
          </p>
          <p style={{ fontSize: 12, color: t.textMuted, lineHeight: 1.6 }}>
            AI-powered SEO auditing for any website.
          </p>
        </div>

        {/* FAQ */}
        <div>
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: t.textMuted,
              marginBottom: 12,
            }}
          >
            FAQ
          </p>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {faqCategories.map((c) => (
              <li key={c.label}>
                <Link
                  href={c.href}
                  style={{ fontSize: 13, color: t.textSecondary, textDecoration: 'none' }}
                >
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Links */}
        <div>
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: t.textMuted,
              marginBottom: 12,
            }}
          >
            Links
          </p>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {links.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  style={{ fontSize: 13, color: t.textSecondary, textDecoration: 'none' }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        style={{
          borderTop: `1px solid ${t.border}`,
          maxWidth: 960,
          margin: '0 auto',
          padding: '16px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 8,
        }}
      >
        <p style={{ fontSize: 12, color: t.textMuted, margin: 0 }}>
          © {new Date().getFullYear()} InspectFlux
        </p>
        <Link href="/faq" style={{ fontSize: 12, color: t.textMuted, textDecoration: 'none' }}>
          Help & FAQ
        </Link>
      </div>
    </footer>
  )
}
