import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const CHAPA_SECRET = process.env.CHAPA_SECRET_KEY;
    const BASE_URL = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

    const tx_ref = 'tx-' + Date.now();

    const chapaData = {
      amount: '200',
      currency: 'ETB',
      email: 'natanmuleta77@gmail.com', // ✅ must be a valid email
      first_name: 'natan',
      last_name: 'muleta',
      tx_ref,
      callback_url: `${BASE_URL}/api/payment/verify?tx_ref=${tx_ref}`,
      return_url: `${BASE_URL}/payment/success?tx_ref=${tx_ref}`,
      customization: {
        title: 'UpgradePlan ',
        description: 'Unlock premium projects',
      },
    };

    const res = await fetch('https://api.chapa.co/v1/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${CHAPA_SECRET}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(chapaData),
    });

    const data = await res.json();

    if (data.status === 'success') {
      return NextResponse.json({ checkout_url: data.data.checkout_url });
    }

    console.error('Chapa Init Error:', data);
    return NextResponse.json({ error: 'Payment init failed', details: data }, { status: 400 });
  } catch (err) {
    console.error('Payment Init Error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
