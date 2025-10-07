import {NextRequest, NextResponse} from "next/server";
import connectDB from "@/lib/db";
import Showtime from "@/models/Showtime";
import mongoose from "mongoose";

interface IParams {
     params : { showtimeId: string }
}

export async function GET(request: NextRequest, {params}:  IParams ) {
    try {
        await connectDB()
        const {showtimeId} = await params;
        if (!mongoose.Types.ObjectId.isValid(showtimeId)) {
            return NextResponse.json({message: "Invalid ID format"}, {status: 400});
        }
        const result = await Showtime.findById(showtimeId);

        if (!result) {
            return NextResponse.json({message: "Showtime not found"}, {status: 404});
        }

        return NextResponse.json({showtime: result}, {status: 200})


    } catch (error) {
        console.error('Error fetching showtime by ID:', error);
    }

}