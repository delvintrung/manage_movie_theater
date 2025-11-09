'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Gift, Percent, Star } from 'lucide-react';

const promotions = [
  {
    id: 1,
    title: "Weekend Special",
    description: "Get 20% off on all movie tickets this weekend!",
    discount: "20% OFF",
    code: "WEEKEND20",
    image: "https://images.unsplash.com/photo-1489599809510-7b0b3b0b3b0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    validUntil: "2024-12-31",
    type: "discount"
  },
  {
    id: 2,
    title: "Student Discount",
    description: "Students get 15% off with valid ID",
    discount: "15% OFF",
    code: "STUDENT15",
    image: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    validUntil: "2024-12-31",
    type: "student"
  },
  {
    id: 3,
    title: "Combo Deal",
    description: "Buy 2 tickets, get 1 free popcorn and drink combo!",
    discount: "FREE COMBO",
    code: "COMBO2",
    image: "https://images.unsplash.com/photo-1574267432553-4b4628081c31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    validUntil: "2024-12-31",
    type: "combo"
  }
];

export function PromotionalBanner() {
  const [currentPromo, setCurrentPromo] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPromo((prev) => (prev + 1) % promotions.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const promotion = promotions[currentPromo];

  const getIcon = (type: string) => {
    switch (type) {
      case 'discount':
        return <Percent className="h-6 w-6" />;
      case 'student':
        return <Star className="h-6 w-6" />;
      case 'combo':
        return <Gift className="h-6 w-6" />;
      default:
        return <Gift className="h-6 w-6" />;
    }
  };

  return (
    <section className="py-16 bg-gradient-to-r from-yellow-500/10 to-orange-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Special Offers & Promotions
          </h2>
          <p className="text-gray-400 text-lg">
            Don't miss out on these amazing deals!
          </p>
        </div>

        <div className="relative">
          <div 
            className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl overflow-hidden border border-gray-700"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${promotion.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="p-2 bg-yellow-500/20 rounded-lg">
                      {getIcon(promotion.type)}
                    </div>
                    <Badge className="bg-yellow-500 text-black font-semibold">
                      {promotion.discount}
                    </Badge>
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-bold mb-4">
                    {promotion.title}
                  </h3>
                  
                  <p className="text-gray-300 text-lg mb-6">
                    {promotion.description}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                      Use Code: {promotion.code}
                    </Button>
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                      View All Promotions
                    </Button>
                  </div>
                  
                  <div><p className="text-sm text-gray-400 mt-4">
                    Valid until {new Date(promotion.validUntil).toLocaleDateString()}
                  </p>
                      </div>
                </div>
                
                <div className="hidden lg:block">
                  <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-gray-600">
                    <h4 className="text-xl font-semibold mb-4">How to Use:</h4>
                    <ol className="space-y-2 text-gray-300">
                      <li className="flex items-start space-x-2">
                        <span className="bg-yellow-500 text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span>
                        <span>Select your movie and showtime</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="bg-yellow-500 text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span>
                        <span>Choose your seats</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="bg-yellow-500 text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span>
                        <span>Enter promo code at checkout</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="bg-yellow-500 text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</span>
                        <span>Enjoy your savings!</span>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {promotions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPromo(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentPromo ? 'bg-yellow-500' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
