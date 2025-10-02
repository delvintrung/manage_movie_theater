import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// ZaloPay docs: https://docs.zalopay.vn/v2/docs/gateway-api

export async function POST(request: NextRequest) {
  try {
    const { amount, description } = await request.json();

    const app_id = Number(process.env.ZALOPAY_APP_ID);
    const key1 = process.env.ZALOPAY_KEY1 as string;
    const redirecturl = `${process.env.NEXT_PUBLIC_APP_URL}/payment/zalopay/return`;
    const callback_url = `${process.env.NEXT_PUBLIC_APP_URL}/api/payments/zalopay/callback`;

    if (!app_id || !key1 || !process.env.NEXT_PUBLIC_APP_URL) {
      return NextResponse.json({ message: 'ZaloPay is not configured' }, { status: 500 });
    }

    const app_trans_id = new Date()
      .toISOString()
      .slice(2, 10)
      .replace(/-/g, '') + '_' + Date.now(); // yymmdd_xxx format recommended

    const app_user = 'guest';
    const app_time = Date.now();
    const embed_data = JSON.stringify({ redirecturl });
    const item = JSON.stringify([]);

    const data = app_id + '|' + app_trans_id + '|' + app_user + '|' + amount + '|' + app_time + '|' + embed_data + '|' + item;
    const mac = crypto.createHmac('sha256', key1).update(data).digest('hex');

    const payload = {
      app_id,
      app_user,
      app_time,
      amount,
      app_trans_id,
      embed_data,
      item,
      description: description || 'Movie booking',
      callback_url,
      mac
    };

    const res = await fetch('https://sb-openapi.zalopay.vn/v2/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const zp = await res.json();
    if (!res.ok || zp.return_code !== 1) {
      return NextResponse.json({ message: zp.return_message || 'ZaloPay create payment failed' }, { status: 400 });
    }

    return NextResponse.json({ order_url: zp.order_url, app_trans_id });
  } catch (error) {
    console.error('ZaloPay create error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}


