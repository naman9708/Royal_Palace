'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { X, ZoomIn } from 'lucide-react'

const categories = ['ALL', 'WEDDINGS', 'RECEPTIONS', 'GARDEN', 'HALL', 'DECORATIONS', 'NIGHT_VIEW']
const categoryLabels = { ALL: 'All', WEDDINGS: 'Weddings', RECEPTIONS: 'Receptions', GARDEN: 'Garden', HALL: 'Hall', DECORATIONS: 'Decorations', NIGHT_VIEW: 'Night View' }

const fallbackImages = [
  { url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800', title: 'Grand Wedding', category: 'WEDDINGS' },
  { url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800', title: 'Floral Setup', category: 'DECORATIONS' },
  { url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800', title: 'Reception Hall', category: 'RECEPTIONS' },
  { url: 'https://images.unsplash.com/photo-1478146059778-26028b07395a?w=800', title: 'Garden', category: 'GARDEN' },
  { url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800', title: 'Wedding Decor', category: 'DECORATIONS' },
  { url: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800', title: 'Ceremony', category: 'WEDDINGS' },
  { url: 'https://images.unsplash.com/photo-1470753937643-efeb931202a9?w=800', title: 'Night View', category: 'NIGHT_VIEW' },
  { url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800', title: 'Engagement', category: 'WEDDINGS' },
  { url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800', title: 'Main Hall', category: 'HALL' },
  { url: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800', title: 'Party Setup', category: 'RECEPTIONS' },
  { url: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800', title: 'Evening Garden', category: 'GARDEN' },
  { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800', title: 'Hall Interior', category: 'HALL' },
]

export default function GalleryPage() {
  const [images, setImages] = useState(fallbackImages)
  const [category, setCategory] = useState('ALL')
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => {
    fetch(`/api/gallery${category !== 'ALL' ? `?category=${category}` : ''}`)
      .then(r => r.json())
      .then(data => { if (data.images?.length) setImages(data.images) })
      .catch(() => {})
  }, [category])

  const filtered = category === 'ALL' ? images : images.filter(i => i.category === category)

  return (
    <div>
      <section className="relative h-72 flex items-center justify-center">
        <div className="absolute inset-0 bg-charcoal" />
        <div className="relative z-10 text-center">
          <p className="text-gold-400 text-sm tracking-widest uppercase font-body mb-2">Visual Stories</p>
          <h1 className="text-white text-5xl font-serif font-bold">Our Gallery</h1>
        </div>
      </section>

      <section className="py-12 bg-ivory">
        <div className="max-w-7xl mx-auto px-4">
          {/* Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-body transition-all ${category === cat ? 'gold-gradient text-white shadow-lg' : 'bg-white text-gray-600 hover:text-gold-600 border border-gray-200'}`}>
                {categoryLabels[cat]}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {filtered.map((img, i) => (
              <div key={i} className="break-inside-avoid relative group cursor-pointer overflow-hidden rounded-xl"
                onClick={() => setLightbox(i)}>
                <img src={img.url} alt={img.title || `Gallery ${i+1}`} className="w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={32} />
                </div>
                {img.title && (
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white text-sm font-body">{img.title}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button className="absolute top-6 right-6 text-white hover:text-gold-400 transition-colors">
            <X size={32} />
          </button>
          <div className="max-w-5xl max-h-screen relative" onClick={e => e.stopPropagation()}>
            <img src={filtered[lightbox]?.url} alt="Gallery" className="max-h-[85vh] w-auto object-contain rounded-xl" />
          </div>
          {/* Prev/Next */}
          <button onClick={e => { e.stopPropagation(); setLightbox((lightbox - 1 + filtered.length) % filtered.length) }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-gold-400">‹</button>
          <button onClick={e => { e.stopPropagation(); setLightbox((lightbox + 1) % filtered.length) }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-gold-400">›</button>
        </div>
      )}
    </div>
  )
}
