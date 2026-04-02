import { ScanForm } from './components/scan/ScanForm'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-16 sm:px-6">
      {/* Hero */}
      <div className="w-full max-w-2xl flex flex-col items-center text-center mb-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-800 bg-indigo-950/40 px-3 py-1 text-xs text-indigo-300 mb-6">
          AI-powered SEO auditing
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-50 leading-tight mb-4">
          Find what&apos;s holding your{' '}
          <span className="text-indigo-400">SEO back</span>
        </h1>
        <p className="text-zinc-400 text-lg max-w-lg">
          Enter your website URL and get a full audit — technical issues, content
          gaps, internal linking opportunities, and a prioritised action plan.
        </p>
      </div>

      {/* Scan form + results */}
      <div className="w-full max-w-2xl">
        <ScanForm />
      </div>

      {/* Feature pills */}
      <div className="mt-16 flex flex-wrap justify-center gap-3 max-w-2xl">
        {[
          'Meta tags',
          'Heading structure',
          'Image SEO',
          'Structured data',
          'Content quality',
          'Internal linking',
        ].map((f) => (
          <span
            key={f}
            className="rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-sm text-zinc-400"
          >
            {f}
          </span>
        ))}
      </div>
    </main>
  )
}
