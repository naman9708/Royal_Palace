import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-serif text-gold-500 font-bold mb-4">404</div>
        <h1 className="text-3xl font-serif text-charcoal mb-3">Page Not Found</h1>
        <p className="text-gray-600 font-body mb-8">The page you are looking for does not exist or has been moved.</p>
        <Link href="/" className="px-8 py-3 gold-gradient text-white rounded-full font-body font-semibold hover:shadow-lg transition-all">
          Back to Home
        </Link>
      </div>
    </div>
  )
}
