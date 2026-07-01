import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function sendBookingConfirmation(booking) {
  try {
    await transporter.sendMail({
      from: `"Royal Palace" <${process.env.SMTP_FROM}>`,
      to: booking.customerEmail,
      subject: `Booking Confirmation - ${booking.bookingNumber}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #fdf8f0; padding: 40px;">
          <div style="text-align: center; border-bottom: 2px solid #e8a413; padding-bottom: 20px; margin-bottom: 30px;">
            <h1 style="color: #1a1a2e; font-size: 28px;">Royal Palace Marriage Hall</h1>
            <p style="color: #e8a413; font-size: 16px;">Booking Confirmation</p>
          </div>
          <p style="color: #333;">Dear ${booking.customerName},</p>
          <p style="color: #333;">Your booking request has been received successfully!</p>
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #f1be2e;">
            <h3 style="color: #1a1a2e; margin-top: 0;">Booking Details</h3>
            <p><strong>Booking Number:</strong> ${booking.bookingNumber}</p>
            <p><strong>Event Date:</strong> ${new Date(booking.eventDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            <p><strong>Event Type:</strong> ${booking.eventType}</p>
            <p><strong>Status:</strong> <span style="color: #e8a413;">Pending Confirmation</span></p>
          </div>
          <p style="color: #333;">Our team will review your request and confirm within 24 hours.</p>
          <p style="color: #666; font-size: 14px;">For queries: +91 98765 43210</p>
        </div>
      `,
    })
  } catch (error) {
    console.error('Email error:', error)
  }
}

export async function sendBookingStatusUpdate(booking) {
  try {
    const statusLabel = booking.status === 'CONFIRMED' ? 'Confirmed' : 'Rejected'
    const subject = booking.status === 'CONFIRMED'
      ? `Booking Confirmed - ${booking.bookingNumber}`
      : `Booking Rejected - ${booking.bookingNumber}`
    const message = booking.status === 'CONFIRMED'
      ? `Your booking has been confirmed. We look forward to hosting your event on ${new Date(booking.eventDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}.`
      : `We are sorry to inform you that your booking request could not be accepted at this time. Please contact us if you have any questions or would like to request a new date.`

    await transporter.sendMail({
      from: `"Royal Palace" <${process.env.SMTP_FROM}>`,
      to: booking.customerEmail,
      subject,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #fdf8f0; padding: 40px;">
          <div style="text-align: center; border-bottom: 2px solid #e8a413; padding-bottom: 20px; margin-bottom: 30px;">
            <h1 style="color: #1a1a2e; font-size: 28px;">Royal Palace Marriage Hall</h1>
            <p style="color: #e8a413; font-size: 16px;">Booking ${statusLabel}</p>
          </div>
          <p style="color: #333;">Dear ${booking.customerName},</p>
          <p style="color: #333;">${message}</p>
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #f1be2e;">
            <h3 style="color: #1a1a2e; margin-top: 0;">Booking Details</h3>
            <p><strong>Booking Number:</strong> ${booking.bookingNumber}</p>
            <p><strong>Event Date:</strong> ${new Date(booking.eventDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            <p><strong>Event Type:</strong> ${booking.eventType}</p>
            <p><strong>Status:</strong> <span style="color: #e8a413;">${statusLabel}</span></p>
          </div>
          <p style="color: #666; font-size: 14px;">If you have any questions, please reply to this email or call us at +91 98765 43210.</p>
        </div>
      `,
    })
  } catch (error) {
    console.error('Booking status email error:', error)
  }
}

export async function sendVerificationOtp(email, otp) {
  try {
    await transporter.sendMail({
      from: `"Royal Palace" <${process.env.SMTP_FROM}>`,
      to: email,
      subject: 'Your Royal Palace verification code',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; background: #f8f6f1; border-radius: 12px;">
          <h2 style="color: #b78308;">Verify Your Email</h2>
          <p style="color: #333;">Use the following OTP to complete your registration:</p>
          <p style="font-size: 32px; font-weight: bold; letter-spacing: 6px; margin: 20px 0;">${otp}</p>
          <p style="color: #555;">This code will expire in 15 minutes.</p>
          <p style="color: #999; font-size: 14px; margin-top: 30px;">If you did not request this, please ignore this email.</p>
        </div>
      `,
    })
  } catch (error) {
    console.error('Verification email error:', error)
    throw error
  }
}
