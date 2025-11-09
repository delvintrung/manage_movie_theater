import {NextRequest, NextResponse} from "next/server";
import connectDB from "@/lib/db";
import FoodItem from "@/models/FoodItem";

export async function GET() {
    try {
        await connectDB()

        const foods = await FoodItem.find().lean()

        return NextResponse.json({foods})
    }
    catch (error) {
        console.error('Error fetching food items:', error);
        return NextResponse.json(
            {message: 'Internal server error'},
            {status: 500}
        );
    }
}