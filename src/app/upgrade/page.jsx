'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function UpgradePage() {
  const [loading, setLoading] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState(null);

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/payment/init', { method: 'POST' });
      const data = await res.json();
      if (data?.checkout_url) {
        setPaymentUrl(data.checkout_url);
        // redirect to Chapa checkout
        window.location.href = data.checkout_url;
      } else {
        alert('Payment initialization failed.');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white p-6">
      <h1 className="text-3xl font-bold mb-4">Upgrade to Premium</h1>
      <p className="text-gray-400 max-w-md text-center mb-8">
        Get full access to all exclusive coding projects and tutorials.
        Support our work and level up your learning experience.
      </p>

      <Button
        onClick={handleUpgrade}
        disabled={loading}
        className="bg-green-600 hover:bg-green-500 text-white px-8 py-3 rounded-lg"
      >
        {loading ? 'Redirecting...' : 'Pay with Chapa (₦200 / month)'}
      </Button>

      {paymentUrl && (
        <p className="mt-4 text-sm text-gray-500">
          Redirecting to Chapa checkout page...
        </p>
      )}
    </div>
  );
}
