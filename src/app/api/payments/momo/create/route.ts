import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// Docs: https://developers.momo.vn/#/docs/en/aiov2/?id=payment-method

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, orderInfo, extraData } = body;

    const partnerCode = process.env.MOMO_PARTNER_CODE as string;
    const accessKey = process.env.MOMO_ACCESS_KEY as string;
    const secretKey = process.env.MOMO_SECRET_KEY as string;
    const redirectUrl = `${process.env.NEXT_PUBLIC_APP_URL}/payment/momo/return`;
    const ipnUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/payments/momo/callback`;

    if (!partnerCode || !accessKey || !secretKey || !process.env.NEXT_PUBLIC_APP_URL) {
      return NextResponse.json({ message: 'MoMo is not configured' }, { status: 500 });
    }

    const requestId = `${partnerCode}-${Date.now()}`;
    const orderId = `${partnerCode}-${Date.now()}`;
    const requestType = 'captureWallet';

    const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData || ''}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;
    const signature = crypto.createHmac('sha256', secretKey).update(rawSignature).digest('hex');

    const payload = {
      partnerCode,
      accessKey,
      requestId,
      amount,
      orderId,
      orderInfo,
      redirectUrl,
      ipnUrl,
      extraData: extraData || '',
      requestType,
      signature
    };

    const res = await fetch('https://test-payment.momo.vn/v2/gateway/api/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (!res.ok || data.resultCode !== 0) {
      return NextResponse.json({ message: data.message || 'MoMo create payment failed' }, { status: 400 });
    }

    return NextResponse.json({ payUrl: data.payUrl, deeplink: data.deeplink, orderId });
  } catch (error) {
    console.error('MoMo create error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}


