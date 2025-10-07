import {NextRequest, NextResponse} from "next/server";
import connectDB from "@/lib/db";
import Movie from "@/models/Movie";
import mongoose from "mongoose";


interface IParams {
    params: {id: string }
}
export const GET = async (req: NextRequest,{params}: IParams) => {
    try {
        await connectDB()

        const {id} = await params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
        }

        const result = await Movie.findById(id);

        if (!result) {
            return NextResponse.json({message: "Movie not found"}, {status: 404});
        }

        return NextResponse.json({movie: result}, {status: 200})
    }
    catch (error) {
        console.error('Error fetching movie by ID:', error);
        return NextResponse.json(
            {message: 'Internal server error'},
            {status: 500}
        );
    }
}

/**
 * @swagger
 * /api/movies/{id}:
 *   get:
 *     summary: Get movie by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The movie ID
 *     responses:
 *       200:
 *         description: Movie found
 *       404:
 *         description: Movie not found
 */
