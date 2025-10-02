import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Showtime from '@/models/Showtime';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const movieId = searchParams.get('movieId');
    const theaterId = searchParams.get('theaterId');
    const date = searchParams.get('date');

    let query: any = { isActive: true };

    if (movieId) {
      query.movie = movieId;
    }

    if (theaterId) {
      query.theater = theaterId;
    }

    if (date) {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);
      
      query.date = {
        $gte: startOfDay,
        $lte: endOfDay
      };
    }

    const showtimes = await Showtime.find(query)
      .populate('movie', 'title posterImage duration ageRating')
      .populate('theater', 'name location')
      .populate('screen', 'name screenType')
      .sort({ date: 1, startTime: 1 })
      .lean();

    return NextResponse.json({ showtimes });
  } catch (error) {
    console.error('Error fetching showtimes:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const showtime = new Showtime(body);
    await showtime.save();

    return NextResponse.json(
      { message: 'Showtime created successfully', showtime },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating showtime:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
