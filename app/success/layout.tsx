import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Welcome to InspectFlux",
  robots: { index: false, follow: false },
}

export default function SuccessLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
