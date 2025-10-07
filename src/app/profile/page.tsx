'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  Ticket, 
  Star,
  Edit,
  Save,
  X,
  Crown
} from 'lucide-react';
import { toast } from 'sonner';
import { UserProfile, Booking } from '@/lib/types';



export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    dateOfBirth: '',
    gender: ''
  });

  // Sample data - in real app, this would come from API
  const sampleProfile: UserProfile = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    dateOfBirth: '1990-05-15',
    gender: 'male',
    avatar: '',
    role: 'customer',
    loyaltyPoints: 150,
    joinDate: '2024-01-01'
  };

  const sampleBookings: Booking[] = [
    {
      id: '1',
      movie: 'Avatar: The Way of Water',
      theater: 'Downtown Theater',
      date: '2024-01-20',
      time: '19:30',
      seats: ['C5', 'C6'],
      amount: 28.80,
      status: 'confirmed',
      bookingReference: 'TML001'
    },
    {
      id: '2',
      movie: 'Black Panther: Wakanda Forever',
      theater: 'Mall Theater',
      date: '2024-01-18',
      time: '15:00',
      seats: ['A3', 'A4'],
      amount: 24.00,
      status: 'completed',
      bookingReference: 'TML002'
    }
  ];
    const fetchProfile = async () => {
        const res = await fetch(`/api/users/${session?.user?.id}`);
        const data = await res.json();
        setProfile(data.user);
    }

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      router.push('/auth/signin');
      return;
    }

      fetchProfile()


  }, [session, status, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProfile(prev => prev ? {
        ...prev,
        name: formData.name,
        phone: formData.phone,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender
      } : null);
      
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const handleCancel = () => {
    setFormData({
      name: profile?.name || '',
      phone: profile?.phone || '',
      dateOfBirth: profile?.dateOfBirth || '',
      gender: profile?.gender || ''
    });
    setIsEditing(false);
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!session || !profile) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Profile</h1>
          <p className="text-gray-400">Manage your account settings and view your booking history</p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-900 border border-gray-800">
            <TabsTrigger value="profile" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
              Profile
            </TabsTrigger>
            <TabsTrigger value="bookings" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
              My Bookings
            </TabsTrigger>
            <TabsTrigger value="loyalty" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
              Loyalty Points
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Profile Card */}
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={profile.avatar} alt={profile.name} />
                      <AvatarFallback className="bg-yellow-500 text-black text-2xl">
                        {profile.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <CardTitle className="text-white">{profile.name}</CardTitle>
                  <p className="text-gray-400">{profile.email}</p>
                  <Badge className="bg-yellow-500 text-black mt-2">
                    {profile.role.charAt(0).toUpperCase() + profile.role.slice(1)}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Crown className="h-5 w-5 text-yellow-500" />
                      <div>
                        <p className="text-sm text-gray-400">Loyalty Points</p>
                        <p className="text-lg font-semibold text-white">{profile.loyaltyPoints}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-400">Member Since</p>
                        <p className="text-white">{new Date(profile.joinDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Profile Form */}
              <div className="lg:col-span-2">
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white">Personal Information</CardTitle>
                      {!isEditing ? (
                        <Button
                          variant="outline"
                          onClick={() => setIsEditing(true)}
                          className="border-gray-700 text-gray-300 hover:bg-gray-800"
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      ) : (
                        <div className="flex space-x-2">
                          <Button
                            onClick={handleSave}
                            className="bg-yellow-500 hover:bg-yellow-600 text-black"
                          >
                            <Save className="h-4 w-4 mr-2" />
                            Save
                          </Button>
                          <Button
                            variant="outline"
                            onClick={handleCancel}
                            className="border-gray-700 text-gray-300 hover:bg-gray-800"
                          >
                            <X className="h-4 w-4 mr-2" />
                            Cancel
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-300">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-300">Email</Label>
                        <Input
                          id="email"
                          value={profile.email}
                          disabled
                          className="bg-gray-800 border-gray-700 text-gray-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-gray-300">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dateOfBirth" className="text-gray-300">Date of Birth</Label>
                        <Input
                          id="dateOfBirth"
                          name="dateOfBirth"
                          type="date"
                          value={formData.dateOfBirth}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="gender" className="text-gray-300">Gender</Label>
                      <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white disabled:text-gray-400"
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="bookings" className="mt-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Booking History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="p-4 bg-gray-800 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-white">{booking.movie}</h4>
                          <p className="text-sm text-gray-400">
                            {booking.theater} • {new Date(booking.date).toLocaleDateString()} at {booking.time}
                          </p>
                          <p className="text-sm text-gray-400">
                            Seats: {booking.seats.join(', ')} • Ref: {booking.bookingReference}
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge 
                            className={
                              booking.status === 'confirmed' ? 'bg-green-500' :
                              booking.status === 'completed' ? 'bg-blue-500' :
                              'bg-yellow-500'
                            }
                          >
                            {booking.status}
                          </Badge>
                          <p className="text-lg font-semibold text-white mt-2">
                            ${booking.amount}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="loyalty" className="mt-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Crown className="h-5 w-5 mr-2 text-yellow-500" />
                  Loyalty Program
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-yellow-500 mb-2">
                    {profile.loyaltyPoints}
                  </div>
                  <p className="text-gray-400">Current Points</p>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-white">How to Earn Points</h4>
                  <div className="space-y-2 text-sm text-gray-300">
                    <div className="flex justify-between">
                      <span>Movie ticket purchase</span>
                      <span>+10 points per ticket</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Food & beverage purchase</span>
                      <span>+5 points per $10 spent</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Refer a friend</span>
                      <span>+50 points</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Write a review</span>
                      <span>+5 points</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-white">Rewards</h4>
                  <div className="space-y-2 text-sm text-gray-300">
                    <div className="flex justify-between">
                      <span>Free small popcorn</span>
                      <span>100 points</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Free movie ticket</span>
                      <span>500 points</span>
                    </div>
                    <div className="flex justify-between">
                      <span>VIP upgrade</span>
                      <span>1000 points</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
