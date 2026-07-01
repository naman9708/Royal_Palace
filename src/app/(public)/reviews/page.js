'use client'
import { useState, useEffect } from 'react'
import { Star } from 'lucide-react'

const fallbackReviews = [
  { id: '1', customerName: 'Priya & Rahul Sharma', eventType: 'Wedding', rating: 5, review: 'Absolutely breathtaking venue! Our wedding was a dream come true. The staff was incredibly professional and the decoration was beyond our expectations. Every guest complimented the venue. Highly recommended!', createdAt: '2024-01-15' },
  { id: '2', customerName: 'Sunita Verma', eventType: 'Birthday Party', rating: 5, review: "We hosted my mother's 60th birthday here and it was spectacular. The garden setup was beautiful and the catering was excellent. The team managed everything perfectly without any hiccups.", createdAt: '2024-02-20' },
  { id: '3', customerName: 'Amit & Pooja Gupta', eventType: 'Reception', rating: 5, review: 'The Royal Palace truly lives up to its name. The hall was magnificent, the food was amazing, and the service was top-notch. Our reception was unforgettable. Thank you to the entire team!', createdAt: '2024-03-10' },
  { id: '4', customerName: 'Rajesh Kumar', eventType: 'Corporate Event', rating: 4, review: 'Excellent venue for corporate events. Modern facilities, great catering, and professional staff. The AV setup was perfect for our conference. Will definitely book again.', createdAt: '2024-03-25' },
  { id: '5', customerName: 'Meena & Suresh Patel', eventType: 'Engagement', rating: 5, review: "Our engagement ceremony was magical! The venue decoration was stunning, the food was delicious, and the staff made sure everything went smoothly. Couldn't have asked for more!", createdAt: '2024-04-05' },
  { id: '6', customerName: 'Deepika Singh', eventType: 'Anniversary', rating: 5, review: 'Celebrated our 25th anniversary here and it was perfect. The gold and floral decoration was exquisite. The outdoor garden setting for dinner was romantic. Truly a premium experience.', createdAt: '2024-04-18' },
]

export default function ReviewsPage() {
  const [reviews, setReviews] = useState(fallbackReviews)
  const [filter, setFilter] = useState('ALL')

  useEffect(() => {
    fetch('/api/reviews').then(r => r.json()).then(d => { if (d.reviews?.length) setReviews(d.reviews) }).catch(() => {})
  }, [])

  const eventTypes = ['ALL', ...new Set(reviews.map(r => r.eventType).filter(Boolean))]
  const filtered = filter === 'ALL' ? reviews : reviews.filter(r => r.eventType === filter)

  const avgRating = reviews.length ? (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1) : 0
  const distribution = [5, 4, 3, 2, 1].map(r => ({ star: r, count: reviews.filter(rev => rev.rating === r).length }))

  return (
    <div>
      <section className="relative h-72 flex items-center justify-center bg-charcoal">
        <div className="text-center">
          <p className="text-gold-400 text-sm tracking-widest uppercase font-body mb-2">Client Experiences</p>
          <h1 className="text-white text-5xl font-serif font-bold">Customer Reviews</h1>
        </div>
      </section>

      <section className="py-16 bg-ivory">
        <div className="max-w-7xl mx-auto px-4">
          {/* Rating Summary */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gold-100 mb-12 max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="text-center">
                <div className="text-7xl font-serif text-gold-600 font-bold">{avgRating}</div>
                <div className="flex gap-1 justify-center my-2">
                  {[1,2,3,4,5].map(i => <Star key={i} size={18} className={i <= Math.round(avgRating) ? 'text-gold-500 fill-gold-500' : 'text-gray-300'} />)}
                </div>
                <p className="text-gray-500 font-body text-sm">{reviews.length} Reviews</p>
              </div>
              <div className="flex-1 w-full space-y-2">
                {distribution.map(({ star, count }) => (
                  <div key={star} className="flex items-center gap-3">
                    <span className="text-sm font-body text-gray-600 w-6">{star}★</span>
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full gold-gradient rounded-full" style={{ width: `${reviews.length ? (count / reviews.length) * 100 : 0}%` }} />
                    </div>
                    <span className="text-sm font-body text-gray-500 w-4">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {eventTypes.map(type => (
              <button key={type} onClick={() => setFilter(type)}
                className={`px-4 py-2 rounded-full text-sm font-body transition-all ${filter === type ? 'gold-gradient text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-gold-300'}`}>
                {type === 'ALL' ? 'All Reviews' : type}
              </button>
            ))}
          </div>

          {/* Reviews Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(review => (
              <div key={review.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gold-100 card-hover">
                <div className="flex gap-1 mb-3">
                  {[1,2,3,4,5].map(i => <Star key={i} size={16} className={i <= review.rating ? 'text-gold-500 fill-gold-500' : 'text-gray-200'} />)}
                </div>
                <p className="text-gray-600 font-body leading-relaxed mb-5 italic text-sm">"{review.review}"</p>
                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 gold-gradient rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {review.customerName[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-charcoal font-body text-sm">{review.customerName}</p>
                      {review.eventType && <p className="text-gold-600 text-xs font-body">{review.eventType}</p>}
                    </div>
                  </div>
                  {review.createdAt && (
                    <p className="text-gray-400 text-xs font-body">
                      {new Date(review.createdAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
