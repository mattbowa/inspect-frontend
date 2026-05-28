'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { t } from '../theme'

const links = [
  { href: '/services', label: 'Services' },
  { href: '/faq', label: 'FAQ' },
  { href: '/manage', label: 'Manage plan' },
  { href: '/history', label: 'History' },
  { href: '/contact', label: 'Contact' },
]

export function NavBar() {
  const pathname = usePathname()

  return (
    <nav style={{ borderBottom: `1px solid ${t.border}`, background: t.bg }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
        <Link href="/" style={{ fontWeight: 700, fontSize: 15, color: t.textPrimary, textDecoration: 'none' }}>
          InspectFlux
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <Link
            href="/pricing"
            className="text-sm font-semibold transition-opacity duration-150 hover:opacity-90"
            style={{
              color: t.textPrimary,
              background: t.accent,
              padding: '6px 14px',
              borderRadius: 8,
              textDecoration: 'none',
            }}
          >
            Get started
          </Link>
          {links.map(({ href, label }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className="text-sm font-medium transition-colors duration-150 hover:!text-indigo-400"
                style={{
                  color: active ? t.textPrimary : t.textSecondary,
                  textDecoration: 'none',
                  borderBottom: active ? `2px solid ${t.accent}` : '2px solid transparent',
                  paddingBottom: 2,
                }}
              >
                {label}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
