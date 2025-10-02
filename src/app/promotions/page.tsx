'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Gift, Percent, Star, Clock, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

interface Promotion {
  id: string;
  code: string;
  name: string;
  description: string;
  type: 'percentage' | 'fixed' | 'buy_one_get_one';
  value: number;
  minOrderAmount?: number;
  maxDiscountAmount?: number;
  usageLimit?: number;
  usedCount: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export default function PromotionsPage() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Sample data - in real app, this would come from API
  const samplePromotions: Promotion[] = [
    {
      id: '1',
      code: 'WEEKEND20',
      name: 'Weekend Special',
      description: 'Get 20% off on all movie tickets this weekend! Perfect for family outings and date nights.',
      type: 'percentage',
      value: 20,
      minOrderAmount: 20,
      usageLimit: 100,
      usedCount: 45,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      isActive: true
    },
    {
      id: '2',
      code: 'STUDENT15',
      name: 'Student Discount',
      description: 'Students get 15% off with valid student ID. Show your ID at the theater for verification.',
      type: 'percentage',
      value: 15,
      minOrderAmount: 15,
      usageLimit: 50,
      usedCount: 23,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      isActive: true
    },
    {
      id: '3',
      code: 'FIRST10',
      name: 'First Time User',
      description: 'Welcome to Theater My Life! Get 10% off your first booking as our way of saying thank you.',
      type: 'percentage',
      value: 10,
      minOrderAmount: 10,
      usageLimit: 1,
      usedCount: 0,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      isActive: true
    },
    {
      id: '4',
      code: 'COMBO2',
      name: 'Combo Deal',
      description: 'Buy 2 tickets, get 1 free popcorn and drink combo! Great for couples and friends.',
      type: 'buy_one_get_one',
      value: 0,
      minOrderAmount: 24,
      usageLimit: 25,
      usedCount: 12,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      isActive: true
    },
    {
      id: '5',
      code: 'SENIOR12',
      name: 'Senior Citizen',
      description: 'Senior citizens (65+) get 12% off on all tickets. Valid ID required at theater.',
      type: 'percentage',
      value: 12,
      minOrderAmount: 12,
      usageLimit: 30,
      usedCount: 8,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      isActive: true
    },
    {
      id: '6',
      code: 'FAMILY25',
      name: 'Family Package',
      description: 'Get 25% off when you buy 4 or more tickets. Perfect for family movie nights!',
      type: 'percentage',
      value: 25,
      minOrderAmount: 48,
      usageLimit: 20,
      usedCount: 5,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      isActive: true
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPromotions(samplePromotions);
      setLoading(false);
    }, 1000);
  }, []);

  const copyToClipboard = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      toast.success('Promo code copied to clipboard!');
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (error) {
      toast.error('Failed to copy promo code');
    }
  };

  const getPromotionIcon = (type: string) => {
    switch (type) {
      case 'percentage':
        return <Percent className="h-6 w-6" />;
      case 'fixed':
        return <Gift className="h-6 w-6" />;
      case 'buy_one_get_one':
        return <Star className="h-6 w-6" />;
      default:
        return <Gift className="h-6 w-6" />;
    }
  };

  const getPromotionColor = (type: string) => {
    switch (type) {
      case 'percentage':
        return 'bg-blue-500';
      case 'fixed':
        return 'bg-green-500';
      case 'buy_one_get_one':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getUsagePercentage = (used: number, limit: number) => {
    return Math.round((used / limit) * 100);
  };

  const isExpiringSoon = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const daysLeft = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return daysLeft <= 7 && daysLeft > 0;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading promotions...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Special Offers & Promotions</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Save big on your next movie experience! Use these exclusive promo codes to get amazing discounts on tickets, food, and more.
          </p>
        </div>

        {/* How to Use Section */}
        <Card className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/20 mb-12">
          <CardHeader>
            <CardTitle className="text-white text-center">How to Use Promo Codes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-yellow-500 text-black rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-3">1</div>
                <h4 className="font-semibold text-white mb-2">Select Your Movie</h4>
                <p className="text-gray-400 text-sm">Choose your movie and showtime</p>
              </div>
              <div className="text-center">
                <div className="bg-yellow-500 text-black rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-3">2</div>
                <h4 className="font-semibold text-white mb-2">Choose Seats</h4>
                <p className="text-gray-400 text-sm">Pick your preferred seats</p>
              </div>
              <div className="text-center">
                <div className="bg-yellow-500 text-black rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-3">3</div>
                <h4 className="font-semibold text-white mb-2">Enter Code</h4>
                <p className="text-gray-400 text-sm">Apply your promo code at checkout</p>
              </div>
              <div className="text-center">
                <div className="bg-yellow-500 text-black rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-3">4</div>
                <h4 className="font-semibold text-white mb-2">Enjoy Savings</h4>
                <p className="text-gray-400 text-sm">Complete your purchase and save!</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Promotions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {promotions.map((promotion) => (
            <Card key={promotion.id} className="bg-gray-900 border-gray-800 overflow-hidden hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${getPromotionColor(promotion.type)}`}>
                      {getPromotionIcon(promotion.type)}
                    </div>
                    <div>
                      <CardTitle className="text-white text-lg">{promotion.name}</CardTitle>
                      <Badge className="bg-yellow-500 text-black mt-1">
                        {promotion.type === 'percentage' ? `${promotion.value}% OFF` :
                         promotion.type === 'fixed' ? `$${promotion.value} OFF` :
                         'BOGO DEAL'}
                      </Badge>
                    </div>
                  </div>
                  {isExpiringSoon(promotion.endDate) && (
                    <Badge className="bg-red-500 text-white">
                      <Clock className="h-3 w-3 mr-1" />
                      Expires Soon
                    </Badge>
                  )}
                </div>
                
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">Promo Code</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(promotion.code)}
                      className="text-yellow-500 hover:text-yellow-400"
                    >
                      {copiedCode === promotion.code ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <div className="text-2xl font-bold text-yellow-500 font-mono">
                    {promotion.code}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-gray-300 text-sm leading-relaxed">
                  {promotion.description}
                </p>

                {/* Terms */}
                <div className="space-y-2 text-xs text-gray-400">
                  {promotion.minOrderAmount && (
                    <div>Minimum order: ${promotion.minOrderAmount}</div>
                  )}
                  {promotion.maxDiscountAmount && (
                    <div>Maximum discount: ${promotion.maxDiscountAmount}</div>
                  )}
                  <div>Valid until: {new Date(promotion.endDate).toLocaleDateString()}</div>
                </div>

                {/* Usage Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Usage</span>
                    <span className="text-white">
                      {promotion.usedCount}/{promotion.usageLimit} used
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${getUsagePercentage(promotion.usedCount, promotion.usageLimit)}%` }}
                    ></div>
                  </div>
                </div>

                <Button 
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
                  onClick={() => copyToClipboard(promotion.code)}
                >
                  Copy Code & Book Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Terms & Conditions */}
        <Card className="bg-gray-900 border-gray-800 mt-12">
          <CardHeader>
            <CardTitle className="text-white">Terms & Conditions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-gray-400">
            <div>
              <h4 className="font-semibold text-white mb-2">General Terms</h4>
              <ul className="space-y-1 list-disc list-inside">
                <li>Promo codes are valid for online bookings only</li>
                <li>Cannot be combined with other offers</li>
                <li>Subject to availability and blackout dates</li>
                <li>Management reserves the right to modify or cancel offers</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Student & Senior Discounts</h4>
              <ul className="space-y-1 list-disc list-inside">
                <li>Valid ID required at theater for verification</li>
                <li>Student discount valid for full-time students</li>
                <li>Senior discount valid for ages 65 and above</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Refund Policy</h4>
              <ul className="space-y-1 list-disc list-inside">
                <li>Promo codes cannot be refunded or exchanged for cash</li>
                <li>Standard cancellation policy applies</li>
                <li>Contact customer service for assistance</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
