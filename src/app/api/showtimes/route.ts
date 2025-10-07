import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Showtime from "@/models/Showtime";
import Theater from "@/models/Theater";
import Screen from "@/models/Screen";
import Movie from "@/models/Movie";
import mongoose from "mongoose";

export async function GET(request: NextRequest) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const movieId = searchParams.get("movieId");
        const theaterId = searchParams.get("theaterId");
        const date = searchParams.get("date");

        const query: any = { isActive: true };

        // 🎬 lọc theo phim
        if (movieId) {
            query.movie = new mongoose.Types.ObjectId(movieId);
        }

        // 🎭 lọc theo rạp
        if (theaterId) {
            query.theater = new mongoose.Types.ObjectId(theaterId);
        }


        if (date) {
            const startOfDay = new Date(`${date}T00:00:00.000Z`);
            const endOfDay = new Date(`${date}T23:59:59.999Z`);

            query.date = {
                $gte: startOfDay,
                $lte: endOfDay,
            };
        }

        console.log("📌 Query:", query);

        const showtimes = await Showtime.find(query)
            .populate("movie", "title posterImage duration ageRating")
            .populate("theater", "name location")
            .populate("screen", "name screenType")
            .sort({ date: 1, startTime: 1 })
            .lean();

        return NextResponse.json(showtimes);
    } catch (error) {
        console.error("❌ Error fetching showtimes:", error);
        return NextResponse.json(
            { message: "Internal server error" },
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
            { message: "Showtime created successfully", showtime },
            { status: 201 }
        );
    } catch (error) {
        console.error("❌ Error creating showtime:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
