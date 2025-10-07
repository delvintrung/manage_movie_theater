import {NextRequest, NextResponse} from "next/server";
import User from "@/models/User";

interface IParams {
    params: {id: string }
}

export const GET = async (req: NextRequest, { params }: IParams) => {

    try {

        const result = await User.findById(params.id);

        if (!result) {
            return NextResponse.json({message: "User not found"}, {status: 404});
        }

        return  NextResponse.json({user: result}, {status: 200})


    }
    catch (error) {
        console.error('Error fetching user by ID:', error);
        return new Response(
            JSON.stringify({message: 'Internal server error'}),
            {status: 500}
        );
    }
}