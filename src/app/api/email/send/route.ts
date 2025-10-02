import { NextRequest, NextResponse } from 'next/server';
import { sendBookingConfirmation, sendPasswordReset, sendWelcomeEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { type, data } = await request.json();

    let success = false;

    switch (type) {
      case 'booking_confirmation':
        success = await sendBookingConfirmation(data);
        break;
      case 'password_reset':
        success = await sendPasswordReset(data);
        break;
      case 'welcome':
        success = await sendWelcomeEmail(data);
        break;
      default:
        return NextResponse.json(
          { message: 'Invalid email type' },
          { status: 400 }
        );
    }

    if (success) {
      return NextResponse.json(
        { message: 'Email sent successfully' },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: 'Failed to send email' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Email API error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
