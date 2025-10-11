

export interface Theater {
    _id: string;
    name: string;
    location: {
        address: string;
        city: string;
        state: string;
        zipCode: string;
        coordinates: {
            lat: number;
            lng: number;
        };
    };
    contact: {
        phone: string;
        email: string;
    };
    facilities: string[];
    isActive: boolean;
}

export interface IScreen {
    _id: string;
   name: string;
   screenType: string;
}


export interface BookingData {
    movie: {
      title: string;
      poster: string;
    };
    showtime: {
      date: string;
      time: string;
      theater: string;
      screen: string;
    };
    seats: Array<{
      id: string;
      row: string;
      number: number;
      type: string;
      price: number;
    }>;
    total: number;
    discount: number;
    finalTotal: number;
  }


  export interface IMovie {
    _id: string;
    title: string;
    description: string;
    posterImage: string;
    rating: number;
    duration: number;
    genre: string[];
    releaseDate: string;
    endDate: string;
    director: string;
    cast: string[];
    trailerUrl: string;
    backdropImage: string;
    status: 'now_showing' | 'upcoming' | 'ended';
    ageRating: string;
    isActive: boolean;
    language: string;
      subtitles: string[]
  }

  export interface UserProfile {
      _id: string;
      name: string;
      email: string;
      phone?: string;
      dateOfBirth?: string;
      gender?: string;
      avatar?: string;
      role: string;
      loyaltyPoints: number;
      joinDate: string;
  }


  export interface Booking {
      _id: string;
      movie: string;
      theater: string;
      date: string;
      time: string;
      seats: string[];
      amount: number;
      status: string;
      bookingReference: string;
  }

  interface Price {
    regular?: number;
    vip?: number;
    premium?: number;
    wheelchair?: number;
  }

  export interface IShowtime {
    _id: string;
    movie: string
    theater: string;
    screen: string;
    date: string;
    startTime: string;
    endTime: string;
    avilableSeats: number;
    totalSeats: number;
    isActive: boolean;
    price: Price
  }

export interface IShowtimeDetail {
    _id: string;
    movie: IMovie;
    theater: Theater;
    screen: IScreen;
    date: string;
    startTime: string;
    endTime: string;
    availableSeats: number;
    totalSeats: number;
    isActive: boolean;
    price: Price
}

export interface Seat {
    _id: string;
    row: string;
    number: number;
    type: 'regular' | 'premium' | 'vip' | 'wheelchair';
    price: number;
    isAvailable?: boolean;
    isSelected?: boolean;
}