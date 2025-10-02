import { NextRequest, NextResponse } from 'next/server';
import { seedDatabase } from '@/lib/seed-data';

export async function POST(request: NextRequest) {
  try {
    // In production, you might want to add authentication here
    // to prevent unauthorized seeding
    
    await seedDatabase();
    
    return NextResponse.json(
      { message: 'Database seeded successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error seeding database:', error);
    return NextResponse.json(
      { message: 'Error seeding database', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
