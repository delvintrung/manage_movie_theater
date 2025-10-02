'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CreditCard, Lock, ArrowLeft, Check } from 'lucide-react';
import { toast } from 'sonner';
import { BookingData } from '@/lib/types';


export default function CheckoutPage() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('momo');
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    email: '',
    phone: ''
  });

  // Sample booking data - in real app, this would come from context or API
  const bookingData: BookingData = {
    movie: {
      title: "Avatar: The Way of Water",
      poster: "https://images.unsplash.com/photo-1489599809510-7b0b3b0b3b0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    showtime: {
      date: "2024-01-20",
      time: "19:30",
      theater: "Downtown Theater",
      screen: "Screen 1 (IMAX)"
    },
    seats: [
      { id: 'C5', row: 'C', number: 5, type: 'premium', price: 18 },
      { id: 'C6', row: 'C', number: 6, type: 'premium', price: 18 }
    ],
    total: 36,
    discount: 20,
    finalTotal: 28.8
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
    if (formattedValue.length > 19) formattedValue = formattedValue.substr(0, 19);
    setFormData(prev => ({
      ...prev,
      cardNumber: formattedValue
    }));
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    setFormData(prev => ({
      ...prev,
      expiryDate: value
    }));
  };

  const handlePayment = async () => {
    if (!formData.cardNumber || !formData.expiryDate || !formData.cvv || !formData.cardholderName) {
      toast.error('Please fill in all payment details');
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      toast.success('Payment successful! Your tickets have been booked.');
      
      // In real app, redirect to success page with booking details
      router.push('/booking/success');
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="text-gray-300 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Complete Your Booking</h1>
            <p className="text-gray-400">Secure payment powered by MoMo/ZaloPay</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Payment Form */}
          <div className="space-y-6">
            {/* Booking Summary */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={bookingData.movie.poster}
                    alt={bookingData.movie.title}
                    className="w-16 h-20 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-semibold text-white">{bookingData.movie.title}</h3>
                    <p className="text-gray-400 text-sm">
                      {new Date(bookingData.showtime.date).toLocaleDateString()} at {bookingData.showtime.time}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {bookingData.showtime.theater} • {bookingData.showtime.screen}
                    </p>
                  </div>
                </div>
                
                <Separator className="bg-gray-700" />
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-white">Selected Seats:</h4>
                  {bookingData.seats.map((seat) => (
                    <div key={seat.id} className="flex justify-between text-sm">
                      <span className="text-gray-300">
                        {seat.row}{seat.number} ({seat.type})
                      </span>
                      <span className="text-white">${seat.price}</span>
                    </div>
                  ))}
                </div>
                
                <Separator className="bg-gray-700" />
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Subtotal</span>
                    <span className="text-white">${bookingData.total}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Discount (20%)</span>
                    <span className="text-green-400">-${(bookingData.total * bookingData.discount / 100).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg">
                    <span className="text-white">Total</span>
                    <span className="text-yellow-500">${bookingData.finalTotal}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="momo" className="text-white hover:bg-gray-700">MoMo</SelectItem>
                    <SelectItem value="zalopay" className="text-white hover:bg-gray-700">ZaloPay</SelectItem>
                  </SelectContent>
                </Select>

                {paymentMethod === 'momo' && (
                  <div className="text-sm text-gray-400">You'll be redirected to MoMo to complete the payment.</div>
                )}
                {paymentMethod === 'zalopay' && (
                  <div className="text-sm text-gray-400">You'll be redirected to ZaloPay to complete the payment.</div>
                )}

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-300">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="delvintrung@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-gray-300">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+84906000000"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Lock className="h-4 w-4" />
                  <span>Your payment information is secure and encrypted</span>
                </div>

                <Button
                  onClick={async () => {
                    if (paymentMethod === 'momo') {
                      try {
                        setIsProcessing(true);
                        const res = await fetch('/api/payments/momo/create', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            amount: Math.round(bookingData.finalTotal * 1000),
                            orderInfo: `Booking for ${bookingData.movie.title}`
                          })
                        });
                        const data = await res.json();
                        if (!res.ok) throw new Error(data.message || 'Failed to create MoMo payment');
                        window.location.href = data.payUrl || data.shortLink;
                        return;
                      } catch (err) {
                        toast.error('Unable to initiate MoMo payment');
                      } finally {
                        setIsProcessing(false);
                      }
                    } else if (paymentMethod === 'zalopay') {
                      try {
                        setIsProcessing(true);
                        const res = await fetch('/api/payments/zalopay/create', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            amount: Math.round(bookingData.finalTotal * 1000),
                            description: `Booking for ${bookingData.movie.title}`
                          })
                        });
                        const data = await res.json();
                        if (!res.ok) throw new Error(data.message || 'Failed to create ZaloPay payment');
                        window.location.href = data.order_url;
                        return;
                      } catch (err) {
                        toast.error('Unable to initiate ZaloPay payment');
                      } finally {
                        setIsProcessing(false);
                      }
                    } else {
                      await handlePayment();
                    }
                  }}
                  disabled={isProcessing}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
                >
                  {isProcessing ? (
                    'Processing Payment...'
                  ) : (
                    <>
                      <CreditCard className="h-4 w-4 mr-2" />
                      Pay ${bookingData.finalTotal}
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Security & Features */}
          <div className="space-y-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Why Choose Us?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Check className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-white">Secure Payment</h4>
                    <p className="text-gray-400 text-sm">256-bit SSL encryption protects your data</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-white">Instant Confirmation</h4>
                    <p className="text-gray-400 text-sm">Get your tickets immediately via email</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-white">Easy Cancellation</h4>
                    <p className="text-gray-400 text-sm">Cancel up to 2 hours before showtime</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-white">Mobile Tickets</h4>
                    <p className="text-gray-400 text-sm">Show your phone at the theater</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-gray-400 text-sm">
                  <p>Having trouble with your booking?</p>
                  <p className="mt-2">
                    Contact our support team at{' '}
                    <a href="tel:+84906000000" className="text-yellow-500 hover:text-yellow-400">
                      +84906000000
                    </a>
                  </p>
                  <p className="mt-2">
                    Or email us at{' '}
                    <a href="mailto:support@theatermylife.com" className="text-yellow-500 hover:text-yellow-400">
                      support@theatermylife.com
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
