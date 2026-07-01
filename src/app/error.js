'use client'
import Link from 'next/link'

export default function Error({ error, reset }) {
  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">⚠️</div>
        <h1 className="text-3xl font-serif text-charcoal mb-3">Something Went Wrong</h1>
        <p className="text-gray-600 font-body mb-8">An unexpected error occurred. Please try again.</p>
        <div className="flex justify-center gap-4">
          <button onClick={reset} className="px-6 py-3 gold-gradient text-white rounded-full font-body font-semibold">Try Again</button>
          <Link href="/" className="px-6 py-3 border-2 border-gold-500 text-gold-600 rounded-full font-body font-semibold">Go Home</Link>
        </div>
      </div>
    </div>
  )
}
