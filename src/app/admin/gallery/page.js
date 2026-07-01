'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { Plus, Trash2, X, Loader2 } from 'lucide-react'

const categories = ['WEDDINGS', 'RECEPTIONS', 'GARDEN', 'HALL', 'DECORATIONS', 'NIGHT_VIEW']

export default function AdminGalleryPage() {
  const [images, setImages] = useState([])
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState({ url: '', title: '', category: 'WEDDINGS' })
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState('ALL')

  useEffect(() => {
    fetch('/api/gallery').then(r => r.json()).then(d => setImages(d.images || []))
  }, [])

  const addImage = async () => {
    if (!form.url || !form.category) { toast.error('URL and category required'); return }
    setLoading(true)
    try {
      const res = await fetch('/api/gallery', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const data = await res.json()
      setImages(imgs => [...imgs, data.image])
      setModal(false)
      setForm({ url: '', title: '', category: 'WEDDINGS' })
      toast.success('Image added!')
    } catch { toast.error('Failed to add image') }
    finally { setLoading(false) }
  }

  const deleteImage = async (id) => {
    if (!confirm('Delete this image?')) return
    await fetch(`/api/gallery/${id}`, { method: 'DELETE' })
    setImages(imgs => imgs.filter(i => i.id !== id))
    toast.success('Image deleted')
  }

  const filtered = filter === 'ALL' ? images : images.filter(i => i.category === filter)

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-serif text-charcoal">Gallery Management</h1>
        <button onClick={() => setModal(true)} className="flex items-center gap-2 px-5 py-2 gold-gradient text-white rounded-full text-sm font-body font-semibold hover:shadow-lg transition-all">
          <Plus size={16} /> Add Image
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {['ALL', ...categories].map(cat => (
          <button key={cat} onClick={() => setFilter(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-body font-semibold transition-all ${filter === cat ? 'gold-gradient text-white' : 'bg-white border border-gray-200 text-gray-600'}`}>
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map(img => (
          <div key={img.id} className="relative group rounded-xl overflow-hidden border border-gray-100">
            <div className="aspect-square relative">
              <img src={img.url} alt={img.title || 'Gallery'} className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
              <button onClick={() => deleteImage(img.id)}
                className="opacity-0 group-hover:opacity-100 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all">
                <Trash2 size={16} />
              </button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-white text-xs font-body">{img.category}</p>
              {img.title && <p className="text-white/70 text-xs font-body">{img.title}</p>}
            </div>
          </div>
        ))}
      </div>

      {modal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xl font-serif text-charcoal">Add Image</h3>
              <button onClick={() => setModal(false)}><X size={20} className="text-gray-400" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-charcoal font-body mb-1">Image URL *</label>
                <input value={form.url} onChange={e => setForm(f => ({ ...f, url: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm font-body focus:outline-none focus:ring-2 focus:ring-gold-400"
                  placeholder="https://res.cloudinary.com/your-cloud-name/image/upload/..." />
              </div>
              <div>
                <label className="block text-xs font-semibold text-charcoal font-body mb-1">Title</label>
                <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm font-body focus:outline-none focus:ring-2 focus:ring-gold-400"
                  placeholder="Image title" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-charcoal font-body mb-1">Category *</label>
                <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm font-body focus:outline-none focus:ring-2 focus:ring-gold-400">
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <button onClick={addImage} disabled={loading}
                className="w-full py-3 gold-gradient text-white rounded-full font-body font-semibold flex items-center justify-center gap-2">
                {loading ? <><Loader2 size={16} className="animate-spin" /> Adding...</> : 'Add Image'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
