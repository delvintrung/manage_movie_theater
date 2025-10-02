import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Movie from '@/models/Movie';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const genre = searchParams.get('genre');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    let query: any = { isActive: true };

    if (status) {
      query.status = status;
    }

    if (genre) {
      query.genre = { $in: [genre] };
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { genre: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const skip = (page - 1) * limit;

    const movies = await Movie.find(query)
      .sort({ releaseDate: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Movie.countDocuments(query);

    return NextResponse.json({
      movies,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching movies:', error);
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
    const movie = new Movie(body);
    await movie.save();

    return NextResponse.json(
      { message: 'Movie created successfully', movie },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating movie:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
