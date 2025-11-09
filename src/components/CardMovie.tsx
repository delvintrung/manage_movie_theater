import React from 'react';
import {Button} from "@/components/ui/button";
import {Clock, Play, Star} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {Card, CardContent} from "@/components/ui/card";
import Link from "next/link";
import {IMovie} from "@/lib/types";
import Image from "next/image";

const CardMovie = ({props}: { props: IMovie }) => {
    console.log(props.posterImage);
    return (
        <Card className="bg-gray-900 border-gray-800 overflow-hidden group hover:scale-105 transition-transform duration-300">
            <div className="relative">
                <Image
                    width={1000}
                    height={320}
                    src={props.posterImage}
                    alt={props.title}
                    className="object-cover"
                    priority={true}
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Link href={props.trailerUrl} target="_blank"><Button size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-black">
                        <Play className="h-4 w-4 mr-2"/>
                        Watch Trailer
                    </Button></Link>
                </div>
                <Badge className="absolute top-2 right-2 bg-yellow-500 text-black">
                    {props.ageRating}
                </Badge>
            </div>
            <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-1">{props.title}</h3>
                <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                    <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span>{props.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{props.duration} min</span>
                    </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-4">
                    {props.genre.slice(0, 2).map((genre, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                            {genre}
                        </Badge>
                    ))}
                </div>
                <Button asChild className="w-full bg-yellow-500 hover:bg-yellow-600 hover:text-white text-black">
                    <Link href={`/movies/${props._id}`}>
                        Book Now
                    </Link>
                </Button>
            </CardContent>
        </Card>
    );
};

export default CardMovie;