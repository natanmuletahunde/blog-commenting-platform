import { NextResponse } from "next/server";

export async function POST() {
  try {
    const CHAPA_SECRET = process.env.CHAPA_SECRET_KEY;
    const BASE_URL = process.env.URL || "http://localhost:3000"; // 👈 fallback to localhost

    const tx_ref = "tx-" + Date.now();

    const chapaData = {
      amount: "200",
      currency: "ETB",
      email: "natanmuleta77@gmail.com",
      first_name: "Natan",
      last_name: "Muleta",
      tx_ref,
      callback_url: `${BASE_URL}/api/payment/verify?tx_ref=${tx_ref}`,
      return_url: `${BASE_URL}/payment/success?tx_ref=${tx_ref}`,
      customization: {
        title: "Upgrade Plan",
        description: "Unlock premium projects",
      },
    };

    const res = await fetch("https://api.chapa.co/v1/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${CHAPA_SECRET}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(chapaData),
    });

    const text = await res.text();
    console.log("🔍 Raw Chapa Response:", text);

    let data;
    try {
      data = JSON.parse(text);
    } catch (err) {
      console.error("❌ JSON parse error:", err);
      return NextResponse.json(
        { error: "Invalid JSON from Chapa", raw: text },
        { status: 500 }
      );
    }

    // ✅ Check for Chapa checkout URL
    if (!data?.data?.checkout_url) {
      console.error("❌ Missing checkout URL in Chapa response:", data);
      return NextResponse.json(
        { error: "Chapa did not return checkout URL", raw: data },
        { status: 500 }
      );
    }

    // ✅ Return only checkout_url to frontend
    return NextResponse.json({ checkout_url: data.data.checkout_url });
  } catch (error) {
    console.error("❌ Payment Init Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
