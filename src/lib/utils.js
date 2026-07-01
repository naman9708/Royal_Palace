import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(date) {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date))
}

export function generateBookingNumber() {
  const prefix = 'RP'
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substr(2, 4).toUpperCase()
  return `${prefix}${timestamp}${random}`
}

export const EVENT_TYPES = [
  { value: 'WEDDING', label: 'Wedding' },
  { value: 'RECEPTION', label: 'Reception' },
  { value: 'ENGAGEMENT', label: 'Engagement' },
  { value: 'BIRTHDAY', label: 'Birthday Party' },
  { value: 'ANNIVERSARY', label: 'Anniversary' },
  { value: 'CORPORATE', label: 'Corporate Event' },
  { value: 'FAMILY_FUNCTION', label: 'Family Function' },
  { value: 'OTHER', label: 'Other' },
]

export const BOOKING_STATUS_COLORS = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  CONFIRMED: 'bg-green-100 text-green-800',
  REJECTED: 'bg-red-100 text-red-800',
  COMPLETED: 'bg-blue-100 text-blue-800',
  CANCELLED: 'bg-gray-100 text-gray-800',
}
