import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/db';
import Booking from '@/models/Booking';
import Showtime from '@/models/Showtime';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const status = searchParams.get('status');

    let query: any = {};

    // If user is not admin, only show their own bookings
    if (session.user?.role !== 'admin') {
      query.user = session.user.id;
    } else if (userId) {
      query.user = userId;
    }

    if (status) {
      query.status = status;
    }

    const bookings = await Booking.find(query)
      .populate('movie', 'title posterImage')
      .populate('theater', 'name location')
      .populate('showtime', 'date startTime endTime')
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ bookings });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const body = await request.json();
    const { showtimeId, seats, promoCode, paymentMethod } = body;

    // Get showtime details
    const showtime = await Showtime.findById(showtimeId)
      .populate('movie')
      .populate('theater')
      .populate('screen');

    if (!showtime) {
      return NextResponse.json(
        { message: 'Showtime not found' },
        { status: 404 }
      );
    }

    // Calculate total amount
    const totalAmount = seats.reduce((sum: number, seat: any) => sum + seat.price, 0);
    
    // Apply promo code discount if provided
    let discountAmount = 0;
    if (promoCode) {
      // In real app, validate promo code here
      discountAmount = totalAmount * 0.1; // 10% discount for demo
    }

    const finalAmount = totalAmount - discountAmount;

    // Create booking
    const booking = new Booking({
      user: session.user.id,
      showtime: showtimeId,
      movie: showtime.movie._id,
      theater: showtime.theater._id,
      screen: showtime.screen._id,
      seats,
      totalAmount,
      discountAmount,
      finalAmount,
      paymentStatus: 'pending',
      paymentMethod: paymentMethod || 'momo',
      status: 'confirmed'
    });

    await booking.save();

    // Update showtime available seats
    showtime.availableSeats -= seats.length;
    await showtime.save();

    return NextResponse.json(
      { message: 'Booking created successfully', booking },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
