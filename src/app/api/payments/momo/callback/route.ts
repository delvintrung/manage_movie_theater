import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import connectDB from '@/lib/db';
import Booking from '@/models/Booking';

// MoMo server-to-server callback (IPN)
export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();

    const secretKey = process.env.MOMO_SECRET_KEY as string;
    if (!secretKey) {
      return NextResponse.json({ message: 'MoMo not configured' }, { status: 500 });
    }

    // Validate signature
    const {
      partnerCode,
      orderId,
      requestId,
      amount,
      orderInfo,
      orderType,
      transId,
      resultCode,
      message,
      payType,
      responseTime,
      extraData,
      signature
    } = payload;

    const rawSignature = `amount=${amount}&extraData=${extraData || ''}&message=${message}&orderId=${orderId}&orderInfo=${orderInfo}&orderType=${orderType}&partnerCode=${partnerCode}&payType=${payType}&requestId=${requestId}&responseTime=${responseTime}&resultCode=${resultCode}&transId=${transId}`;
    const computed = crypto.createHmac('sha256', secretKey).update(rawSignature).digest('hex');
    if (computed !== signature) {
      return NextResponse.json({ message: 'Invalid signature' }, { status: 400 });
    }

    await connectDB();

    // Link to booking if extraData contains bookingId
    if (resultCode === 0) {
      const extra = extraData ? JSON.parse(Buffer.from(extraData, 'base64').toString('utf8')) : null;
      const bookingFilter = extra?.bookingId ? { _id: extra.bookingId } : { bookingReference: { $exists: true } };
      await Booking.findOneAndUpdate(
        bookingFilter,
        { paymentStatus: 'paid', paymentMethod: 'momo', paymentTransactionId: String(transId) }
      );
    }

    return NextResponse.json({ message: 'ok' });
  } catch (error) {
    console.error('MoMo IPN error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}


