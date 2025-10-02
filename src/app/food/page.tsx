'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Minus, ShoppingCart, Heart, Star, Clock, Leaf } from 'lucide-react';
import { toast } from 'sonner';

interface FoodItem {
  id: string;
  name: string;
  description: string;
  category: 'popcorn' | 'drinks' | 'snacks' | 'combo';
  price: number;
  image: string;
  isAvailable: boolean;
  stock: number;
  allergens?: string[];
  nutritionInfo?: {
    calories: number;
    fat: number;
    protein: number;
    carbs: number;
  };
  isVegetarian?: boolean;
  isVegan?: boolean;
  isGlutenFree?: boolean;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export default function FoodPage() {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Sample data - in real app, this would come from API
  const sampleFoodItems: FoodItem[] = [
    {
      id: '1',
      name: 'Large Popcorn',
      description: 'Freshly popped buttery popcorn with real butter',
      category: 'popcorn',
      price: 8.99,
      image: 'https://images.unsplash.com/photo-1574267432553-4b4628081c31?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      stock: 100,
      allergens: ['Dairy'],
      nutritionInfo: { calories: 400, fat: 25, protein: 5, carbs: 40 },
      isVegetarian: true
    },
    {
      id: '2',
      name: 'Medium Popcorn',
      description: 'Perfect size popcorn for sharing',
      category: 'popcorn',
      price: 6.99,
      image: 'https://images.unsplash.com/photo-1574267432553-4b4628081c31?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      stock: 150,
      allergens: ['Dairy'],
      nutritionInfo: { calories: 300, fat: 18, protein: 4, carbs: 30 },
      isVegetarian: true
    },
    {
      id: '3',
      name: 'Coca Cola',
      description: 'Refreshing Coca Cola soft drink',
      category: 'drinks',
      price: 4.99,
      image: 'https://images.unsplash.com/photo-1581636625402-29b2a704ef13?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      stock: 200,
      allergens: [],
      nutritionInfo: { calories: 140, fat: 0, protein: 0, carbs: 35 }
    },
    {
      id: '4',
      name: 'Pepsi',
      description: 'Classic Pepsi cola drink',
      category: 'drinks',
      price: 4.99,
      image: 'https://images.unsplash.com/photo-1581636625402-29b2a704ef13?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      stock: 180,
      allergens: [],
      nutritionInfo: { calories: 140, fat: 0, protein: 0, carbs: 35 }
    },
    {
      id: '5',
      name: 'Nachos Supreme',
      description: 'Loaded nachos with cheese, jalapeños, and sour cream',
      category: 'snacks',
      price: 12.99,
      image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      stock: 50,
      allergens: ['Dairy', 'Gluten'],
      nutritionInfo: { calories: 650, fat: 35, protein: 15, carbs: 70 },
      isVegetarian: true
    },
    {
      id: '6',
      name: 'Chicken Wings',
      description: 'Crispy buffalo chicken wings with ranch dip',
      category: 'snacks',
      price: 14.99,
      image: 'https://images.unsplash.com/photo-1567620832904-9fe5cf23db13?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      stock: 30,
      allergens: ['Dairy'],
      nutritionInfo: { calories: 800, fat: 45, protein: 35, carbs: 20 }
    },
    {
      id: '7',
      name: 'Movie Combo',
      description: 'Large popcorn + Large drink + Candy',
      category: 'combo',
      price: 18.99,
      image: 'https://images.unsplash.com/photo-1574267432553-4b4628081c31?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      stock: 75,
      allergens: ['Dairy'],
      nutritionInfo: { calories: 800, fat: 30, protein: 8, carbs: 120 },
      isVegetarian: true
    },
    {
      id: '8',
      name: 'Family Combo',
      description: '2 Large popcorns + 4 Drinks + 2 Candies',
      category: 'combo',
      price: 32.99,
      image: 'https://images.unsplash.com/photo-1574267432553-4b4628081c31?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      stock: 40,
      allergens: ['Dairy'],
      nutritionInfo: { calories: 1600, fat: 60, protein: 16, carbs: 240 },
      isVegetarian: true
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setFoodItems(sampleFoodItems);
      setLoading(false);
    }, 1000);
  }, []);

  const addToCart = (item: FoodItem) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      setCart(cart.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, {
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
        image: item.image
      }]);
    }
    
    toast.success(`${item.name} added to cart!`);
  };

  const removeFromCart = (itemId: string) => {
    setCart(cart.filter(item => item.id !== itemId));
    toast.success('Item removed from cart');
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(itemId);
    } else {
      setCart(cart.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      ));
    }
  };

  const toggleFavorite = (itemId: string) => {
    setFavorites(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'popcorn':
        return '🍿';
      case 'drinks':
        return '🥤';
      case 'snacks':
        return '🍗';
      case 'combo':
        return '🎁';
      default:
        return '🍽️';
    }
  };

  const getCategoryItems = (category: string) => {
    return foodItems.filter(item => item.category === category);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading menu...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Food & Beverages</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Enhance your movie experience with our delicious selection of snacks, drinks, and combo meals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Menu */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-5 bg-gray-900 border border-gray-800">
                <TabsTrigger value="all" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
                  All Items
                </TabsTrigger>
                <TabsTrigger value="popcorn" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
                  Popcorn
                </TabsTrigger>
                <TabsTrigger value="drinks" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
                  Drinks
                </TabsTrigger>
                <TabsTrigger value="snacks" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
                  Snacks
                </TabsTrigger>
                <TabsTrigger value="combo" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
                  Combos
                </TabsTrigger>
              </TabsList>

              {['all', 'popcorn', 'drinks', 'snacks', 'combo'].map(category => (
                <TabsContent key={category} value={category} className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {(category === 'all' ? foodItems : getCategoryItems(category)).map((item) => (
                      <Card key={item.id} className="bg-gray-900 border-gray-800 overflow-hidden hover:scale-105 transition-transform duration-300">
                        <div className="flex">
                          <div className="w-32 h-32 flex-shrink-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <CardContent className="flex-1 p-4">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="font-semibold text-white text-lg">{item.name}</h3>
                                <p className="text-gray-400 text-sm line-clamp-2">{item.description}</p>
                              </div>
                              <button
                                onClick={() => toggleFavorite(item.id)}
                                className="text-gray-400 hover:text-red-500 transition-colors"
                              >
                                <Heart 
                                  className={`h-5 w-5 ${favorites.includes(item.id) ? 'fill-current text-red-500' : ''}`} 
                                />
                              </button>
                            </div>

                            <div className="flex items-center space-x-2 mb-3">
                              <Badge className="bg-yellow-500 text-black">
                                {getCategoryIcon(item.category)}
                              </Badge>
                              {item.isVegetarian && (
                                <Badge variant="outline" className="border-green-500 text-green-500">
                                  <Leaf className="h-3 w-3 mr-1" />
                                  Veg
                                </Badge>
                              )}
                              {item.isVegan && (
                                <Badge variant="outline" className="border-green-500 text-green-500">
                                  Vegan
                                </Badge>
                              )}
                              {item.isGlutenFree && (
                                <Badge variant="outline" className="border-blue-500 text-blue-500">
                                  Gluten Free
                                </Badge>
                              )}
                            </div>

                            {item.nutritionInfo && (
                              <div className="text-xs text-gray-400 mb-3">
                                <div className="flex space-x-4">
                                  <span>{item.nutritionInfo.calories} cal</span>
                                  <span>{item.nutritionInfo.fat}g fat</span>
                                  <span>{item.nutritionInfo.protein}g protein</span>
                                </div>
                              </div>
                            )}

                            <div className="flex items-center justify-between">
                              <div className="text-xl font-bold text-yellow-500">
                                ${item.price}
                              </div>
                              <Button
                                onClick={() => addToCart(item)}
                                disabled={!item.isAvailable || item.stock === 0}
                                className="bg-yellow-500 hover:bg-yellow-600 text-black"
                              >
                                <Plus className="h-4 w-4 mr-1" />
                                Add
                              </Button>
                            </div>

                            {item.allergens && item.allergens.length > 0 && (
                              <div className="text-xs text-gray-500 mt-2">
                                Contains: {item.allergens.join(', ')}
                              </div>
                            )}
                          </CardContent>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>

          {/* Cart Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-900 border-gray-800 sticky top-8">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Cart ({cart.reduce((total, item) => total + item.quantity, 0)})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-400">Your cart is empty</p>
                    <p className="text-gray-500 text-sm">Add some delicious snacks!</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {cart.map((item) => (
                        <div key={item.id} className="flex items-center space-x-3 p-2 bg-gray-800 rounded">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">{item.name}</p>
                            <p className="text-xs text-gray-400">${item.price}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="h-6 w-6 p-0"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="text-sm text-white w-6 text-center">{item.quantity}</span>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="h-6 w-6 p-0"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-gray-700 pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-semibold text-white">Total:</span>
                        <span className="text-xl font-bold text-yellow-500">${getTotalPrice().toFixed(2)}</span>
                      </div>
                      <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                        Proceed to Checkout
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
