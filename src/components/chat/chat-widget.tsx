'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, X, Minimize2, Maximize2 } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'support';
  timestamp: Date;
  isTyping?: boolean;
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! How can I help you today?',
      sender: 'support',
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate support response
    setTimeout(() => {
      const supportMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getSupportResponse(newMessage),
        sender: 'support',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, supportMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const getSupportResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('booking') || message.includes('ticket')) {
      return 'I can help you with booking tickets! You can select your movie, choose seats, and complete payment through our booking system. Is there a specific movie you\'d like to see?';
    }
    
    if (message.includes('refund') || message.includes('cancel')) {
      return 'For refunds and cancellations, you can cancel your booking up to 2 hours before the showtime. Please provide your booking reference number and I\'ll help you process the cancellation.';
    }
    
    if (message.includes('promo') || message.includes('discount')) {
      return 'We have several promotional offers available! Check out our promotions page for current discount codes. Popular codes include WEEKEND20 for 20% off and STUDENT15 for student discounts.';
    }
    
    if (message.includes('food') || message.includes('snack')) {
      return 'Our theaters offer a variety of food and beverages including popcorn, drinks, nachos, and combo meals. You can add food items to your cart during the booking process.';
    }
    
    if (message.includes('theater') || message.includes('location')) {
      return 'We have multiple theater locations across the city. You can find all our theaters and their facilities on our theaters page. Each location offers different amenities like IMAX, 3D, and premium seating.';
    }
    
    if (message.includes('time') || message.includes('showtime')) {
      return 'Showtimes vary by movie and theater. You can check available showtimes by selecting a movie and choosing your preferred date and theater location.';
    }
    
    return 'Thank you for your message! I\'m here to help with any questions about bookings, promotions, theater locations, or general inquiries. How can I assist you further?';
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-600 text-white rounded-full w-14 h-14 shadow-lg z-50"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-80 bg-gray-900 border-gray-800 shadow-2xl z-50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <CardTitle className="text-white text-sm">Customer Support</CardTitle>
              </div>
              <div className="flex items-center space-x-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-gray-400 hover:text-white h-6 w-6 p-0"
                >
                  {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white h-6 w-6 p-0"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </CardHeader>

          {!isMinimized && (
            <CardContent className="p-0">
              {/* Messages */}
              <div className="h-64 overflow-y-auto p-4 space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                        message.sender === 'user'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-800 text-gray-100'
                      }`}
                    >
                      <p>{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-800 text-gray-100 px-3 py-2 rounded-lg text-sm">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-800">
                <div className="flex space-x-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 text-sm"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    size="sm"
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Press Enter to send, Shift+Enter for new line
                </p>
              </div>
            </CardContent>
          )}
        </Card>
      )}
    </>
  );
}
