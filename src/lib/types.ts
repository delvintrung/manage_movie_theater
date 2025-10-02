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