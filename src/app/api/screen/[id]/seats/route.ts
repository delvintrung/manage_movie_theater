import connectDB from "@/lib/db";
import ScreenModel from "@/models/Screen";
import {NextResponse} from "next/server";
import mongoose from "mongoose";

export async function GET(request: Request, {params}: { params: { id: string } }) {
    try {
        await connectDB()
        const {id} = await params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({message: "Invalid ID format"}, {status: 400});
        }
        const result = await ScreenModel.find({_id: new mongoose.Types.ObjectId(id)}, {seats: 1, _id: 0});

        return NextResponse.json(result, {status: 200})
    } catch (e) {
        console.log(e)
    }
}