'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Film, 
  Calendar, 
  Ticket, 
  DollarSign, 
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';
import { useEffect } from 'react';

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalUsers: 1250,
    totalMovies: 45,
    totalBookings: 3200,
    totalRevenue: 125000,
    todayBookings: 45,
    todayRevenue: 2500
  });

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session || session.user?.role !== 'admin') {
      router.push('/auth/signin');
      return;
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!session || session.user?.role !== 'admin') {
    return null;
  }

  const recentBookings = [
    {
      id: 'TML001',
      movie: 'Avatar: The Way of Water',
      user: 'John Doe',
      seats: 'C5, C6',
      amount: 28.80,
      status: 'confirmed',
      date: '2024-01-20'
    },
    {
      id: 'TML002',
      movie: 'Black Panther: Wakanda Forever',
      user: 'Jane Smith',
      seats: 'A3, A4',
      amount: 24.00,
      status: 'confirmed',
      date: '2024-01-20'
    },
    {
      id: 'TML003',
      movie: 'Top Gun: Maverick',
      user: 'Bob Johnson',
      seats: 'D7, D8',
      amount: 50.00,
      status: 'pending',
      date: '2024-01-20'
    }
  ];

  const recentMovies = [
    {
      id: 1,
      title: 'Avatar: The Way of Water',
      status: 'now_showing',
      bookings: 150,
      revenue: 2500
    },
    {
      id: 2,
      title: 'Black Panther: Wakanda Forever',
      status: 'now_showing',
      bookings: 120,
      revenue: 2000
    },
    {
      id: 3,
      title: 'Spider-Man: No Way Home',
      status: 'upcoming',
      bookings: 0,
      revenue: 0
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-400">Welcome back, {session.user?.name}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Users</p>
                  <p className="text-2xl font-bold text-white">{stats.totalUsers.toLocaleString()}</p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Movies</p>
                  <p className="text-2xl font-bold text-white">{stats.totalMovies}</p>
                </div>
                <Film className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Bookings</p>
                  <p className="text-2xl font-bold text-white">{stats.totalBookings.toLocaleString()}</p>
                </div>
                <Ticket className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Revenue</p>
                  <p className="text-2xl font-bold text-white">${stats.totalRevenue.toLocaleString()}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Today's Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Today's Bookings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-white">{stats.todayBookings}</p>
                  <p className="text-gray-400 text-sm">bookings today</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <DollarSign className="h-5 w-5 mr-2" />
                Today's Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-white">${stats.todayRevenue.toLocaleString()}</p>
                  <p className="text-gray-400 text-sm">revenue today</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Management Tabs */}
        <Tabs defaultValue="bookings" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-900 border border-gray-800">
            <TabsTrigger value="bookings" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
              Bookings
            </TabsTrigger>
            <TabsTrigger value="movies" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
              Movies
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
              Users
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bookings" className="mt-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Recent Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="font-semibold text-white">{booking.movie}</p>
                          <p className="text-gray-400 text-sm">{booking.user} • {booking.seats}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="font-semibold text-white">${booking.amount}</p>
                          <Badge 
                            className={booking.status === 'confirmed' ? 'bg-green-500' : 'bg-yellow-500'}
                          >
                            {booking.status}
                          </Badge>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="ghost">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="movies" className="mt-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Movie Management</CardTitle>
                  <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Movie
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentMovies.map((movie) => (
                    <div key={movie.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="font-semibold text-white">{movie.title}</p>
                          <p className="text-gray-400 text-sm">
                            {movie.bookings} bookings • ${movie.revenue} revenue
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge 
                          className={movie.status === 'now_showing' ? 'bg-green-500' : 'bg-blue-500'}
                        >
                          {movie.status.replace('_', ' ')}
                        </Badge>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="ghost">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="text-red-400">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="mt-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">User management features coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Analytics & Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">Analytics dashboard coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
