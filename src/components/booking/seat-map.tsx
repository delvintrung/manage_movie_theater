'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Trash2, ShoppingCart } from 'lucide-react';

interface Seat {
  id: string;
  row: string;
  number: number;
  type: 'regular' | 'premium' | 'vip' | 'wheelchair';
  price: number;
  isAvailable: boolean;
  isSelected: boolean;
}

interface SeatMapProps {
  onSeatSelection: (seats: Seat[]) => void;
  selectedSeats: Seat[];
}

export function SeatMap({ onSeatSelection, selectedSeats }: SeatMapProps) {
  const [seats, setSeats] = useState<Seat[]>([
    // Row A
    { id: 'A1', row: 'A', number: 1, type: 'regular', price: 12, isAvailable: true, isSelected: false },
    { id: 'A2', row: 'A', number: 2, type: 'regular', price: 12, isAvailable: true, isSelected: false },
    { id: 'A3', row: 'A', number: 3, type: 'regular', price: 12, isAvailable: false, isSelected: false },
    { id: 'A4', row: 'A', number: 4, type: 'regular', price: 12, isAvailable: true, isSelected: false },
    { id: 'A5', row: 'A', number: 5, type: 'regular', price: 12, isAvailable: true, isSelected: false },
    { id: 'A6', row: 'A', number: 6, type: 'regular', price: 12, isAvailable: true, isSelected: false },
    { id: 'A7', row: 'A', number: 7, type: 'regular', price: 12, isAvailable: false, isSelected: false },
    { id: 'A8', row: 'A', number: 8, type: 'regular', price: 12, isAvailable: true, isSelected: false },
    { id: 'A9', row: 'A', number: 9, type: 'regular', price: 12, isAvailable: true, isSelected: false },
    { id: 'A10', row: 'A', number: 10, type: 'regular', price: 12, isAvailable: true, isSelected: false },
    
    // Row B
    { id: 'B1', row: 'B', number: 1, type: 'regular', price: 12, isAvailable: true, isSelected: false },
    { id: 'B2', row: 'B', number: 2, type: 'regular', price: 12, isAvailable: true, isSelected: false },
    { id: 'B3', row: 'B', number: 3, type: 'regular', price: 12, isAvailable: true, isSelected: false },
    { id: 'B4', row: 'B', number: 4, type: 'regular', price: 12, isAvailable: false, isSelected: false },
    { id: 'B5', row: 'B', number: 5, type: 'regular', price: 12, isAvailable: true, isSelected: false },
    { id: 'B6', row: 'B', number: 6, type: 'regular', price: 12, isAvailable: true, isSelected: false },
    { id: 'B7', row: 'B', number: 7, type: 'regular', price: 12, isAvailable: true, isSelected: false },
    { id: 'B8', row: 'B', number: 8, type: 'regular', price: 12, isAvailable: false, isSelected: false },
    { id: 'B9', row: 'B', number: 9, type: 'regular', price: 12, isAvailable: true, isSelected: false },
    { id: 'B10', row: 'B', number: 10, type: 'regular', price: 12, isAvailable: true, isSelected: false },
    
    // Row C (Premium)
    { id: 'C1', row: 'C', number: 1, type: 'premium', price: 18, isAvailable: true, isSelected: false },
    { id: 'C2', row: 'C', number: 2, type: 'premium', price: 18, isAvailable: true, isSelected: false },
    { id: 'C3', row: 'C', number: 3, type: 'premium', price: 18, isAvailable: false, isSelected: false },
    { id: 'C4', row: 'C', number: 4, type: 'premium', price: 18, isAvailable: true, isSelected: false },
    { id: 'C5', row: 'C', number: 5, type: 'premium', price: 18, isAvailable: true, isSelected: false },
    { id: 'C6', row: 'C', number: 6, type: 'premium', price: 18, isAvailable: true, isSelected: false },
    { id: 'C7', row: 'C', number: 7, type: 'premium', price: 18, isAvailable: false, isSelected: false },
    { id: 'C8', row: 'C', number: 8, type: 'premium', price: 18, isAvailable: true, isSelected: false },
    { id: 'C9', row: 'C', number: 9, type: 'premium', price: 18, isAvailable: true, isSelected: false },
    { id: 'C10', row: 'C', number: 10, type: 'premium', price: 18, isAvailable: true, isSelected: false },
    
    // Row D (VIP)
    { id: 'D1', row: 'D', number: 1, type: 'vip', price: 25, isAvailable: true, isSelected: false },
    { id: 'D2', row: 'D', number: 2, type: 'vip', price: 25, isAvailable: true, isSelected: false },
    { id: 'D3', row: 'D', number: 3, type: 'vip', price: 25, isAvailable: true, isSelected: false },
    { id: 'D4', row: 'D', number: 4, type: 'vip', price: 25, isAvailable: false, isSelected: false },
    { id: 'D5', row: 'D', number: 5, type: 'vip', price: 25, isAvailable: true, isSelected: false },
    { id: 'D6', row: 'D', number: 6, type: 'vip', price: 25, isAvailable: true, isSelected: false },
    { id: 'D7', row: 'D', number: 7, type: 'vip', price: 25, isAvailable: true, isSelected: false },
    { id: 'D8', row: 'D', number: 8, type: 'vip', price: 25, isAvailable: false, isSelected: false },
    { id: 'D9', row: 'D', number: 9, type: 'vip', price: 25, isAvailable: true, isSelected: false },
    { id: 'D10', row: 'D', number: 10, type: 'vip', price: 25, isAvailable: true, isSelected: false },
  ]);

  const handleSeatClick = (seatId: string) => {
    setSeats(prevSeats => {
      const updatedSeats = prevSeats.map(seat => {
        if (seat.id === seatId && seat.isAvailable) {
          return { ...seat, isSelected: !seat.isSelected };
        }
        return seat;
      });
      
      const selectedSeats = updatedSeats.filter(seat => seat.isSelected);
      onSeatSelection(selectedSeats);
      
      return updatedSeats;
    });
  };

  const getSeatColor = (seat: Seat) => {
    if (!seat.isAvailable) return 'bg-gray-600 cursor-not-allowed';
    if (seat.isSelected) return 'bg-yellow-500 hover:bg-yellow-600';
    
    switch (seat.type) {
      case 'regular':
        return 'bg-gray-700 hover:bg-gray-600';
      case 'premium':
        return 'bg-blue-600 hover:bg-blue-500';
      case 'vip':
        return 'bg-purple-600 hover:bg-purple-500';
      case 'wheelchair':
        return 'bg-green-600 hover:bg-green-500';
      default:
        return 'bg-gray-700 hover:bg-gray-600';
    }
  };

  const getSeatTypeLabel = (type: string) => {
    switch (type) {
      case 'regular':
        return 'Regular';
      case 'premium':
        return 'Premium';
      case 'vip':
        return 'VIP';
      case 'wheelchair':
        return 'Wheelchair Accessible';
      default:
        return 'Regular';
    }
  };

  const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

  // Group seats by row
  const seatsByRow = seats.reduce((acc, seat) => {
    if (!acc[seat.row]) {
      acc[seat.row] = [];
    }
    acc[seat.row].push(seat);
    return acc;
  }, {} as Record<string, Seat[]>);

  return (
    <div className="space-y-6">
      {/* Screen */}
      <div className="text-center">
        <div className="bg-gray-800 rounded-lg p-4 mx-auto max-w-md">
          <div className="text-white font-semibold text-lg">SCREEN</div>
        </div>
      </div>

      {/* Seat Map */}
      <div className="space-y-4">
        {Object.entries(seatsByRow).map(([row, rowSeats]) => (
          <div key={row} className="flex items-center justify-center space-x-2">
            <div className="w-8 text-center font-semibold text-white">{row}</div>
            <div className="flex space-x-1">
              {rowSeats.map((seat) => (
                <button
                  key={seat.id}
                  onClick={() => handleSeatClick(seat.id)}
                  disabled={!seat.isAvailable}
                  className={`w-8 h-8 rounded text-xs font-semibold text-white transition-colors ${getSeatColor(seat)}`}
                >
                  {seat.number}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gray-700 rounded"></div>
          <span className="text-sm text-gray-300">Available</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-yellow-500 rounded"></div>
          <span className="text-sm text-gray-300">Selected</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gray-600 rounded"></div>
          <span className="text-sm text-gray-300">Occupied</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-600 rounded"></div>
          <span className="text-sm text-gray-300">Premium</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-purple-600 rounded"></div>
          <span className="text-sm text-gray-300">VIP</span>
        </div>
      </div>

      {/* Selected Seats Summary */}
      {selectedSeats.length > 0 && (
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <ShoppingCart className="h-5 w-5 mr-2" />
              Selected Seats ({selectedSeats.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedSeats.map((seat) => (
              <div key={seat.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="border-yellow-500 text-yellow-500">
                    {seat.row}{seat.number}
                  </Badge>
                  <span className="text-gray-300">{getSeatTypeLabel(seat.type)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-white font-semibold">${seat.price}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleSeatClick(seat.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            <Separator className="bg-gray-700" />
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-white">Total:</span>
              <span className="text-xl font-bold text-yellow-500">${totalPrice}</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
