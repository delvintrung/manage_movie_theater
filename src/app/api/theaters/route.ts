import { NextResponse } from 'next/server';
import Theater from '@/models/Theater';
import connectDB from "@/lib/db";
export async function GET() {
    try {
        await connectDB();
        const theaters = await Theater.find({isActive: true}).lean();
        return NextResponse.json([...theaters] );
    }
    catch (error) {
        console.error('Error fetching theaters:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}