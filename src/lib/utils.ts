import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {IShowtime} from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const reduceShowtimes = (showtimes: IShowtime[]) =>
    showtimes.reduce((acc, item) => {
    const key = item.theater;
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
}, {});
