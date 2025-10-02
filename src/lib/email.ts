// Email notification utilities
// In a real application, you would integrate with services like SendGrid, AWS SES, or Nodemailer

export interface EmailTemplate {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export interface BookingConfirmationData {
  user: {
    name: string;
    email: string;
  };
  booking: {
    reference: string;
    movie: string;
    theater: string;
    date: string;
    time: string;
    seats: string[];
    amount: number;
  };
}

export interface PasswordResetData {
  user: {
    name: string;
    email: string;
  };
  resetLink: string;
}

export interface WelcomeEmailData {
  user: {
    name: string;
    email: string;
  };
}

// Email templates
export const emailTemplates = {
  bookingConfirmation: (data: BookingConfirmationData): EmailTemplate => ({
    to: data.user.email,
    subject: `Booking Confirmation - ${data.booking.reference}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Booking Confirmation</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #1a1a1a; color: #fff; padding: 20px; text-align: center; }
            .content { background: #f9f9f9; padding: 20px; }
            .booking-details { background: #fff; padding: 20px; margin: 20px 0; border-radius: 8px; }
            .qr-code { text-align: center; margin: 20px 0; }
            .footer { background: #1a1a1a; color: #fff; padding: 20px; text-align: center; font-size: 12px; }
            .highlight { color: #fbbf24; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎬 Theater My Life</h1>
              <h2>Booking Confirmation</h2>
            </div>
            
            <div class="content">
              <p>Dear ${data.user.name},</p>
              
              <p>Thank you for your booking! Your tickets have been confirmed.</p>
              
              <div class="booking-details">
                <h3>Booking Details</h3>
                <p><strong>Booking Reference:</strong> <span class="highlight">${data.booking.reference}</span></p>
                <p><strong>Movie:</strong> ${data.booking.movie}</p>
                <p><strong>Theater:</strong> ${data.booking.theater}</p>
                <p><strong>Date:</strong> ${data.booking.date}</p>
                <p><strong>Time:</strong> ${data.booking.time}</p>
                <p><strong>Seats:</strong> ${data.booking.seats.join(', ')}</p>
                <p><strong>Total Amount:</strong> $${data.booking.amount}</p>
              </div>
              
              <div class="qr-code">
                <p><strong>Your QR Code:</strong></p>
                <div style="background: #000; color: #fff; padding: 20px; font-family: monospace; font-size: 24px; letter-spacing: 2px;">
                  ${data.booking.reference}
                </div>
                <p><small>Show this code at the theater entrance</small></p>
              </div>
              
              <p><strong>Important:</strong></p>
              <ul>
                <li>Please arrive 15 minutes before showtime</li>
                <li>Bring a valid ID for verification</li>
                <li>You can cancel up to 2 hours before showtime</li>
              </ul>
              
              <p>Enjoy your movie experience!</p>
              
              <p>Best regards,<br>The Theater My Life Team</p>
            </div>
            
            <div class="footer">
              <p>This is an automated email. Please do not reply to this message.</p>
              <p>© 2024 Theater My Life. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
      Booking Confirmation - ${data.booking.reference}
      
      Dear ${data.user.name},
      
      Thank you for your booking! Your tickets have been confirmed.
      
      Booking Details:
      - Booking Reference: ${data.booking.reference}
      - Movie: ${data.booking.movie}
      - Theater: ${data.booking.theater}
      - Date: ${data.booking.date}
      - Time: ${data.booking.time}
      - Seats: ${data.booking.seats.join(', ')}
      - Total Amount: $${data.booking.amount}
      
      Important:
      - Please arrive 15 minutes before showtime
      - Bring a valid ID for verification
      - You can cancel up to 2 hours before showtime
      
      Enjoy your movie experience!
      
      Best regards,
      The Theater My Life Team
    `
  }),

  passwordReset: (data: PasswordResetData): EmailTemplate => ({
    to: data.user.email,
    subject: 'Password Reset - Theater My Life',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Password Reset</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #1a1a1a; color: #fff; padding: 20px; text-align: center; }
            .content { background: #f9f9f9; padding: 20px; }
            .button { background: #fbbf24; color: #000; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: bold; }
            .footer { background: #1a1a1a; color: #fff; padding: 20px; text-align: center; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎬 Theater My Life</h1>
              <h2>Password Reset</h2>
            </div>
            
            <div class="content">
              <p>Dear ${data.user.name},</p>
              
              <p>We received a request to reset your password for your Theater My Life account.</p>
              
              <p>Click the button below to reset your password:</p>
              
              <p style="text-align: center; margin: 30px 0;">
                <a href="${data.resetLink}" class="button">Reset Password</a>
              </p>
              
              <p>If the button doesn't work, copy and paste this link into your browser:</p>
              <p style="word-break: break-all; background: #eee; padding: 10px; font-family: monospace;">
                ${data.resetLink}
              </p>
              
              <p><strong>Important:</strong></p>
              <ul>
                <li>This link will expire in 1 hour</li>
                <li>If you didn't request this reset, please ignore this email</li>
                <li>For security, never share this link with anyone</li>
              </ul>
              
              <p>If you have any questions, please contact our support team.</p>
              
              <p>Best regards,<br>The Theater My Life Team</p>
            </div>
            
            <div class="footer">
              <p>This is an automated email. Please do not reply to this message.</p>
              <p>© 2024 Theater My Life. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
      Password Reset - Theater My Life
      
      Dear ${data.user.name},
      
      We received a request to reset your password for your Theater My Life account.
      
      To reset your password, click the following link:
      ${data.resetLink}
      
      Important:
      - This link will expire in 1 hour
      - If you didn't request this reset, please ignore this email
      - For security, never share this link with anyone
      
      If you have any questions, please contact our support team.
      
      Best regards,
      The Theater My Life Team
    `
  }),

  welcome: (data: WelcomeEmailData): EmailTemplate => ({
    to: data.user.email,
    subject: 'Welcome to Theater My Life!',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Welcome to Theater My Life</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #1a1a1a; color: #fff; padding: 20px; text-align: center; }
            .content { background: #f9f9f9; padding: 20px; }
            .button { background: #fbbf24; color: #000; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: bold; }
            .footer { background: #1a1a1a; color: #fff; padding: 20px; text-align: center; font-size: 12px; }
            .highlight { color: #fbbf24; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎬 Theater My Life</h1>
              <h2>Welcome to the Family!</h2>
            </div>
            
            <div class="content">
              <p>Dear ${data.user.name},</p>
              
              <p>Welcome to Theater My Life! We're excited to have you join our community of movie lovers.</p>
              
              <p>As a new member, you'll enjoy:</p>
              <ul>
                <li>🎫 Easy online ticket booking</li>
                <li>🍿 Delicious food and beverages</li>
                <li>⭐ Exclusive member discounts</li>
                <li>🎁 Special promotions and offers</li>
                <li>📱 Mobile-friendly experience</li>
              </ul>
              
              <p>Get started by exploring our current movies and booking your first show!</p>
              
              <p style="text-align: center; margin: 30px 0;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL}/movies" class="button">Browse Movies</a>
              </p>
              
              <p>Don't forget to check out our <span class="highlight">WEEKEND20</span> promo code for 20% off your first booking!</p>
              
              <p>If you have any questions, our customer support team is here to help.</p>
              
              <p>Enjoy your movie experience!</p>
              
              <p>Best regards,<br>The Theater My Life Team</p>
            </div>
            
            <div class="footer">
              <p>This is an automated email. Please do not reply to this message.</p>
              <p>© 2024 Theater My Life. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
      Welcome to Theater My Life!
      
      Dear ${data.user.name},
      
      Welcome to Theater My Life! We're excited to have you join our community of movie lovers.
      
      As a new member, you'll enjoy:
      - Easy online ticket booking
      - Delicious food and beverages
      - Exclusive member discounts
      - Special promotions and offers
      - Mobile-friendly experience
      
      Get started by exploring our current movies and booking your first show!
      
      Don't forget to check out our WEEKEND20 promo code for 20% off your first booking!
      
      If you have any questions, our customer support team is here to help.
      
      Enjoy your movie experience!
      
      Best regards,
      The Theater My Life Team
    `
  })
};

// Email sending function (mock implementation)
export async function sendEmail(template: EmailTemplate): Promise<boolean> {
  try {
    // In a real application, you would integrate with an email service
    console.log('📧 Email sent:', {
      to: template.to,
      subject: template.subject,
      timestamp: new Date().toISOString()
    });
    
    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return true;
  } catch (error) {
    console.error('❌ Failed to send email:', error);
    return false;
  }
}

// Convenience functions
export async function sendBookingConfirmation(data: BookingConfirmationData): Promise<boolean> {
  const template = emailTemplates.bookingConfirmation(data);
  return await sendEmail(template);
}

export async function sendPasswordReset(data: PasswordResetData): Promise<boolean> {
  const template = emailTemplates.passwordReset(data);
  return await sendEmail(template);
}

export async function sendWelcomeEmail(data: WelcomeEmailData): Promise<boolean> {
  const template = emailTemplates.welcome(data);
  return await sendEmail(template);
}
