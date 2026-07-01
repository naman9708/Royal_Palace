const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create admin user
  const hashedPassword = await bcrypt.hash('Royal@8434', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'royalplace831@gmail.com' },
    update: {},
    create: {
      name: 'Admin',
      email: 'royalplace831@gmail.com',
      password: hashedPassword,
      role: 'ADMIN',
      isVerified: true,
      emailVerified: new Date(),
    },
  })
  console.log('Admin created:', admin.email)

  // Create packages
  const packages = [
    {
      name: 'Basic Package',
      slug: 'basic',
      description: 'Perfect for intimate gatherings and small celebrations',
      price: 75000,
      guestCapacity: 200,
      features: ['Hall Decoration', 'Basic Catering (Veg)', 'Sound System', 'Lighting Setup', 'Parking', 'Security', 'Housekeeping', 'Drinking Water'],
      isActive: true,
      isPopular: false,
    },
    {
      name: 'Standard Package',
      slug: 'standard',
      description: 'Our most popular package for grand celebrations',
      price: 150000,
      guestCapacity: 500,
      features: ['Premium Hall & Garden Decoration', 'Catering (Veg & Non-Veg)', 'DJ & Sound System', 'Professional Lighting', 'Photography (8 hours)', 'Parking', 'Security', 'Housekeeping', 'Bridal Room', 'Generator Backup', 'Drinking Water', 'Flower Arrangements'],
      isActive: true,
      isPopular: true,
    },
    {
      name: 'Premium Package',
      slug: 'premium',
      description: 'The ultimate luxury experience for your special day',
      price: 300000,
      guestCapacity: 1000,
      features: ['Luxury Hall & Garden Decoration', 'Premium Catering (Multi-Cuisine)', 'Live Music & DJ', 'Professional Photography & Videography', 'Cinematic Videography', 'Premium Lighting Show', 'Floral Entrance Decoration', 'Bridal Suite (2 nights)', 'Valet Parking', 'Dedicated Event Manager', 'Security Team', 'Complete Housekeeping', 'Cake & Sweet Arrangements', 'Welcome Drinks', 'Generator Backup', 'Fire Works Arrangement'],
      isActive: true,
      isPopular: false,
    },
  ]

  for (const pkg of packages) {
    await prisma.package.upsert({
      where: { slug: pkg.slug },
      update: {},
      create: pkg,
    })
  }
  console.log('Packages seeded')

  // Create reviews
  const reviews = [
    { customerName: 'Priya & Rahul Sharma', eventType: 'Wedding', rating: 5, review: 'Absolutely breathtaking venue! Our wedding was a dream come true. The staff was incredibly professional and the decoration was beyond our expectations. Every guest complimented the venue. Highly recommended!' },
    { customerName: 'Sunita Verma', eventType: 'Birthday Party', rating: 5, review: 'We hosted my mother\'s 60th birthday here and it was spectacular. The garden setup was beautiful and the catering was excellent. The team managed everything perfectly without any hiccups.' },
    { customerName: 'Amit & Pooja Gupta', eventType: 'Reception', rating: 5, review: 'The Royal Palace truly lives up to its name. The hall was magnificent, the food was amazing, and the service was top-notch. Our reception was unforgettable. Thank you to the entire team!' },
    { customerName: 'Rajesh Kumar', eventType: 'Corporate Event', rating: 4, review: 'Excellent venue for corporate events. Modern facilities, great catering, and professional staff. The AV setup was perfect for our conference. Will definitely book again for future events.' },
    { customerName: 'Meena & Suresh Patel', eventType: 'Engagement', rating: 5, review: 'Our engagement ceremony was magical! The venue decoration was stunning, the food was delicious, and the staff made sure everything went smoothly. Couldn\'t have asked for more!' },
    { customerName: 'Deepika Singh', eventType: 'Anniversary', rating: 5, review: 'Celebrated our 25th anniversary here and it was perfect. The gold and floral decoration was exquisite. The outdoor garden setting for dinner was romantic. Truly a premium experience.' },
  ]

  for (const review of reviews) {
    await prisma.review.create({ data: review })
  }
  console.log('Reviews seeded')

  // Create FAQs
  const faqs = [
    { question: 'How do I book the venue?', answer: 'You can book our venue by filling the booking form on our website, calling us directly, or visiting us in person. We recommend booking at least 3-6 months in advance for popular dates.', category: 'Booking', sortOrder: 1 },
    { question: 'What is the advance payment required?', answer: 'We require 30% of the total package amount as advance to confirm your booking. The remaining amount can be paid 7 days before the event date.', category: 'Payment', sortOrder: 2 },
    { question: 'Can I cancel my booking?', answer: 'Yes, cancellations are allowed. If cancelled 30+ days before event: 50% refund. If cancelled 15-30 days before: 25% refund. If cancelled less than 15 days before: No refund. Please check our cancellation policy for full details.', category: 'Cancellation', sortOrder: 3 },
    { question: 'Do you provide catering services?', answer: 'Yes, we offer in-house catering services with a variety of vegetarian and non-vegetarian options. We can customize menus based on your preferences and dietary requirements. Outside catering is also permitted with prior approval.', category: 'Catering', sortOrder: 4 },
    { question: 'Is decoration included in the packages?', answer: 'Yes, all our packages include decoration. The extent of decoration varies by package - Basic includes standard hall decoration, Standard includes premium hall and garden decoration, and Premium includes luxury decoration with floral arrangements.', category: 'Decoration', sortOrder: 5 },
    { question: 'How many cars can be parked?', answer: 'Our venue has ample parking space for 200+ vehicles. We have dedicated parking attendants to manage vehicles efficiently. Valet parking is available with our Premium Package.', category: 'Parking', sortOrder: 6 },
    { question: 'How do I check availability for my preferred date?', answer: 'You can check availability on our Availability page which shows a real-time calendar. Green dates are available, red are booked, and yellow are pending. You can also call us directly to verify availability.', category: 'Availability', sortOrder: 7 },
    { question: 'Do you have AC facilities?', answer: 'Yes, our main hall is fully air-conditioned with modern HVAC systems. The garden area is naturally open but we can arrange air-cooled tents during summer months on request.', category: 'Facilities', sortOrder: 8 },
    { question: 'Is there a generator backup?', answer: 'Absolutely! We have 100% power backup with industrial-grade generators to ensure your event is never disrupted by power cuts. The backup kicks in automatically within seconds.', category: 'Facilities', sortOrder: 9 },
    { question: 'Can we bring our own DJ?', answer: 'Yes, you can bring your own DJ or entertainment. Our venue has a professional sound and lighting infrastructure. We charge a nominal setup fee for external DJs. Please inform us in advance so we can coordinate.', category: 'Services', sortOrder: 10 },
  ]

  for (const faq of faqs) {
    await prisma.fAQ.create({ data: faq })
  }
  console.log('FAQs seeded')

  // Create sample gallery images (using placeholder URLs)
  const galleryImages = [
    { url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800', title: 'Grand Wedding Ceremony', category: 'WEDDINGS' },
    { url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800', title: 'Floral Decoration', category: 'WEDDINGS' },
    { url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800', title: 'Reception Hall', category: 'RECEPTIONS' },
    { url: 'https://images.unsplash.com/photo-1478146059778-26028b07395a?w=800', title: 'Garden Setup', category: 'GARDEN' },
    { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800', title: 'Main Hall', category: 'HALL' },
    { url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800', title: 'Wedding Decoration', category: 'DECORATIONS' },
    { url: 'https://images.unsplash.com/photo-1470753937643-efeb931202a9?w=800', title: 'Night View', category: 'NIGHT_VIEW' },
    { url: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800', title: 'Bride & Groom', category: 'WEDDINGS' },
  ]

  for (const img of galleryImages) {
    await prisma.galleryImage.create({ data: img })
  }
  console.log('Gallery images seeded')

  console.log('Database seeded successfully!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
