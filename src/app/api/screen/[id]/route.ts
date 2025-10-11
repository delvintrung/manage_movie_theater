import {NextRequest, NextResponse} from "next/server";
import connectDB from "@/lib/db";
import mongoose from "mongoose";
import ScreenModel from "@/models/Screen";

interface IParams {
     params : { id: string }
}

export async function GET(request: NextRequest, {params}:  IParams ) {
    try {
        await connectDB()
        const {id} = await params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({message: "Invalid ID format"}, {status: 400});
        }
        const result = await ScreenModel.findById(id).populate('theater');

        if (!result) {
            return NextResponse.json({message: "Screen not found"}, {status: 404});
        }

        return NextResponse.json({screen: result}, {status: 200})


    } catch (error) {
        console.error('Error fetching showtime by ID:', error);
    }

}