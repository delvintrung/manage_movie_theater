import connectDB from "@/lib/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import Showtime from "@/models/Showtime";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();

        const id = params.id;
        console.log("ID from route:", id);

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
        }

        const result = await Showtime.findById(id).populate("movie").populate("theater").populate("screen");
        if (!result) {
            return NextResponse.json({ message: "Not found" }, { status: 404 });
        }

        return NextResponse.json(result);
    } catch (e) {
        console.error(e);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
