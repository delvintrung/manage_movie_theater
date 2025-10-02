'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function MomoReturnPage() {
  const params = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'success' | 'failed' | 'processing'>('processing');

  useEffect(() => {
    const resultCode = params.get('resultCode');
    if (resultCode === '0') setStatus('success');
    else setStatus('failed');
  }, [params]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="max-w-md w-full text-center p-8">
        {status === 'processing' && <p>Processing payment...</p>}
        {status === 'success' && (
          <>
            <h1 className="text-2xl font-bold mb-4">Payment Successful</h1>
            <p className="text-gray-300 mb-6">Thank you! Your MoMo payment was successful.</p>
            <button onClick={() => router.push('/profile')} className="px-4 py-2 bg-yellow-500 text-black font-semibold rounded">View Bookings</button>
          </>
        )}
        {status === 'failed' && (
          <>
            <h1 className="text-2xl font-bold mb-4">Payment Failed</h1>
            <p className="text-gray-300 mb-6">Your payment could not be completed. Please try again.</p>
            <button onClick={() => router.push('/payment/checkout')} className="px-4 py-2 bg-yellow-500 text-black font-semibold rounded">Try Again</button>
          </>
        )}
      </div>
    </div>
  );
}


