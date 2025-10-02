'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { SeatMap } from '@/components/booking/seat-map';
import { ArrowLeft, CreditCard, Popcorn, Clock, MapPin } from 'lucide-react';
import { toast } from 'sonner';

interface Seat {
  id: string;
  row: string;
  number: number;
  type: 'regular' | 'premium' | 'vip' | 'wheelchair';
  price: number;
  isAvailable: boolean;
  isSelected: boolean;
}

export default function BookingPage() {
  const params = useParams();
  const router = useRouter();
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  // Sample showtime data - in real app, this would come from API
  const showtimeData = {
    id: params.showtimeId,
    movie: {
      title: "Avatar: The Way of Water",
      poster: "https://images.unsplash.com/photo-1489599809510-7b0b3b0b3b0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      duration: 192,
      ageRating: "PG-13"
    },
    theater: {
      name: "Downtown Theater",
      location: "123 Cinema Street, Movie City"
    },
    screen: {
      name: "Screen 1",
      type: "IMAX"
    },
    date: "2024-01-20",
    time: "19:30",
    endTime: "22:42"
  };

  const handleSeatSelection = (seats: Seat[]) => {
    setSelectedSeats(seats);
  };

  const handlePromoCode = async () => {
    if (!promoCode.trim()) {
      toast.error('Please enter a promo code');
      return;
    }

    // Simulate promo code validation
    const validCodes = ['WEEKEND20', 'STUDENT15', 'FIRST10'];
    if (validCodes.includes(promoCode.toUpperCase())) {
      const discountAmount = promoCode.toUpperCase() === 'WEEKEND20' ? 20 : 
                           promoCode.toUpperCase() === 'STUDENT15' ? 15 : 10;
      setDiscount(discountAmount);
      toast.success(`Promo code applied! ${discountAmount}% discount`);
    } else {
      toast.error('Invalid promo code');
    }
  };

  const calculateTotal = () => {
    const subtotal = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
    const discountAmount = (subtotal * discount) / 100;
    return subtotal - discountAmount;
  };

  const handleCheckout = async () => {
    if (selectedSeats.length === 0) {
      toast.error('Please select at least one seat');
      return;
    }

    setIsProcessing(true);
    
    try {
      // Simulate booking process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Booking successful! Redirecting to payment...');
      
      // In real app, redirect to payment gateway
      router.push('/payment/checkout');
    } catch (error) {
      toast.error('Booking failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
            <h1 className="text-3xl font-bold">Select Your Seats</h1>
            <p className="text-gray-400">Choose your preferred seats for the best viewing experience</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Seat Selection */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Seat Map</CardTitle>
              </CardHeader>
              <CardContent>
                <SeatMap
                  onSeatSelection={handleSeatSelection}
                  selectedSeats={selectedSeats}
                />
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div className="space-y-6">
            {/* Movie Info */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Movie Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={showtimeData.movie.poster}
                    alt={showtimeData.movie.title}
                    className="w-16 h-20 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-semibold text-white">{showtimeData.movie.title}</h3>
                    <Badge className="bg-yellow-500 text-black mt-1">
                      {showtimeData.movie.ageRating}
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-300">
                      {showtimeData.time} - {showtimeData.endTime}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-300">{showtimeData.theater.name}</span>
                  </div>
                  <div className="text-gray-300">
                    {showtimeData.screen.name} • {showtimeData.screen.type}
                  </div>
                  <div className="text-gray-300">
                    {new Date(showtimeData.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Promo Code */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Promo Code</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                  />
                  <Button
                    onClick={handlePromoCode}
                    className="bg-yellow-500 hover:bg-yellow-600 text-black"
                  >
                    Apply
                  </Button>
                </div>
                {discount > 0 && (
                  <div className="text-green-400 text-sm">
                    {discount}% discount applied!
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Food & Drinks */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Popcorn className="h-5 w-5 mr-2" />
                  Food & Drinks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  variant="outline"
                  className="w-full border-gray-700 text-gray-300 hover:bg-gray-800"
                >
                  Add Food & Drinks
                </Button>
              </CardContent>
            </Card>

            {/* Booking Summary */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {selectedSeats.map((seat) => (
                    <div key={seat.id} className="flex justify-between text-sm">
                      <span className="text-gray-300">
                        {seat.row}{seat.number} ({seat.type})
                      </span>
                      <span className="text-white">${seat.price}</span>
                    </div>
                  ))}
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Discount ({discount}%)</span>
                    <span className="text-green-400">
                      -${((selectedSeats.reduce((sum, seat) => sum + seat.price, 0) * discount) / 100).toFixed(2)}
                    </span>
                  </div>
                )}
                
                <div className="border-t border-gray-700 pt-2">
                  <div className="flex justify-between font-semibold">
                    <span className="text-white">Total</span>
                    <span className="text-yellow-500">${calculateTotal().toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  onClick={handleCheckout}
                  disabled={selectedSeats.length === 0 || isProcessing}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
                >
                  {isProcessing ? (
                    'Processing...'
                  ) : (
                    <>
                      <CreditCard className="h-4 w-4 mr-2" />
                      Proceed to Payment
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
