import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const tx_ref = searchParams.get('tx_ref');

  try {
    const res = await fetch(`https://api.chapa.co/v1/transaction/verify/${tx_ref}`, {
      headers: {
        Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
      },
    });

    const data = await res.json();

    if (data?.status === 'success' && data.data.status === 'success') {
      // ✅ Update user in your DB
      // Example: await Users.updateOne({ email }, { isPremium: true });

      console.log('Payment verified ✅');
      return NextResponse.redirect(`${process.env.URL}/upgrade-success`); // 👈 uses your URL env
    } else {
      console.log('Payment verification failed ❌');
      return NextResponse.redirect(`${process.env.URL}/upgrade-failed`); // 👈 uses your URL env
    }
  } catch (err) {
    console.error('Error verifying payment:', err);
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 });
  }
}
