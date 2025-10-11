import React from 'react';
import {Button} from "@/components/ui/button";
import {IShowtimeDetail} from "@/lib/types";
import { useRouter } from "next/navigation";
const ShowtimeCard = ({showtime}: { showtime: IShowtimeDetail }) => {

    const router = useRouter();
    const handleBookNow = (showtimeId: string) => {
        router.push(`/booking/${showtimeId}`);
    };
    return (
        <div key={showtime._id} className="p-4 bg-gray-800 rounded-lg">
            <div className="flex items-center justify-between mb-2">
                <div>
                    <h4 className="font-semibold text-white">{showtime.startTime}</h4>
                    <p className="text-sm text-gray-400">
                        {showtime.theater.name} • {showtime.screen.screenType} ({showtime.screen.screenType})
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-sm text-gray-400">
                        {showtime.availableSeats} seats available
                    </p>
                    <p className="text-sm text-white">
                        From ${showtime.price.regular}
                    </p>
                </div>
            </div>
            <Button
                onClick={() => handleBookNow(showtime._id)}
                className="w-full bg-yellow-500 hover:bg-yellow-600 hover:text-white text-black"
                disabled={showtime.availableSeats === 0}
            >
                {showtime.availableSeats === 0 ? 'Sold Out' : 'Book Now'}
            </Button>
        </div>
    );
};

export default ShowtimeCard;