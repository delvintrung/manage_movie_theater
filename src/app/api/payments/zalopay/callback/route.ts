import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import connectDB from '@/lib/db';
import Booking from '@/models/Booking';

// ZaloPay server-to-server callback
export async function POST(request: NextRequest) {
  try {
    const body = await request.text(); // ZaloPay sends x-www-form-urlencoded or JSON depending on config
    let payload: any;
    try {
      payload = JSON.parse(body);
    } catch {
      // attempt x-www-form-urlencoded parsing
      payload = Object.fromEntries(new URLSearchParams(body));
    }

    const key2 = process.env.ZALOPAY_KEY2 as string;
    if (!key2) return NextResponse.json({ message: 'ZaloPay not configured' }, { status: 500 });

    const macData = payload.data;
    const reqMac = payload.mac;
    const mac = crypto.createHmac('sha256', key2).update(macData).digest('hex');
    if (mac !== reqMac) {
      return NextResponse.json({ return_code: -1, return_message: 'mac not equal' });
    }

    const dataObj = JSON.parse(macData);

    if (dataObj.return_code === 1) {
      await connectDB();
      await Booking.findOneAndUpdate(
        { bookingReference: { $exists: true } },
        { paymentStatus: 'paid', paymentMethod: 'zalopay', paymentTransactionId: String(dataObj.zp_trans_id) }
      );
    }

    return NextResponse.json({ return_code: 1, return_message: 'ok' });
  } catch (error) {
    console.error('ZaloPay callback error:', error);
    return NextResponse.json({ return_code: 0, return_message: 'error' });
  }
}


