import connectDB from './db';
import User from '@/models/User';
import Movie from '@/models/Movie';
import Theater from '@/models/Theater';
import Screen from '@/models/Screen';
import Showtime from '@/models/Showtime';
import Promotion from '@/models/Promotion';
import FoodItem from '@/models/FoodItem';

export async function seedDatabase() {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany({});
    await Movie.deleteMany({});
    await Theater.deleteMany({});
    await Screen.deleteMany({});
    await Showtime.deleteMany({});
    await Promotion.deleteMany({});
    await FoodItem.deleteMany({});

    // Create admin user
    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@theatermylife.com',
      password: 'admin123',
      role: 'admin',
      isEmailVerified: true
    });
    await adminUser.save();

    // Create sample customer
    const customer = new User({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      role: 'customer',
      phone: '+1234567890',
      isEmailVerified: true,
      loyaltyPoints: 150
    });
    await customer.save();

    // Create theaters
    const theater1 = new Theater({
      name: 'Downtown Theater',
      location: {
        address: '123 Cinema Street',
        city: 'Movie City',
        state: 'MC',
        zipCode: '12345',
        coordinates: { lat: 40.7128, lng: -74.0060 }
      },
      contact: {
        phone: '+1 (555) 123-4567',
        email: 'downtown@theatermylife.com'
      },
      facilities: ['IMAX', '4DX', 'Dolby Atmos', 'Premium Seating']
    });
    await theater1.save();

    const theater2 = new Theater({
      name: 'Mall Theater',
      location: {
        address: '456 Shopping Center',
        city: 'Mall City',
        state: 'MC',
        zipCode: '12346',
        coordinates: { lat: 40.7589, lng: -73.9851 }
      },
      contact: {
        phone: '+1 (555) 234-5678',
        email: 'mall@theatermylife.com'
      },
      facilities: ['3D', 'Premium Seating', 'Food Court']
    });
    await theater2.save();

    // Create screens
    const screen1 = new Screen({
      name: 'Screen 1',
      theater: theater1._id,
      capacity: 200,
      screenType: 'IMAX',
      seats: generateSeats(10, 20, 'IMAX')
    });
    await screen1.save();

    const screen2 = new Screen({
      name: 'Screen 2',
      theater: theater1._id,
      capacity: 150,
      screenType: '3D',
      seats: generateSeats(8, 18, '3D')
    });
    await screen2.save();

    const screen3 = new Screen({
      name: 'Screen 1',
      theater: theater2._id,
      capacity: 120,
      screenType: '2D',
      seats: generateSeats(6, 20, '2D')
    });
    await screen3.save();

    // Create movies
    const movies = [
      {
        title: 'Avatar: The Way of Water',
        description: 'Set more than a decade after the events of the first film, Avatar: The Way of Water begins to tell the story of the Sully family, the trouble that follows them, the lengths they go to keep each other safe.',
        genre: ['Action', 'Adventure', 'Sci-Fi'],
        duration: 192,
        releaseDate: new Date('2024-01-15'),
        endDate: new Date('2024-04-15'),
        director: 'James Cameron',
        cast: ['Sam Worthington', 'Zoe Saldana', 'Sigourney Weaver'],
        trailerUrl: 'https://www.youtube.com/watch?v=d9MyW72ELq0',
        posterImage: 'https://images.unsplash.com/photo-1489599809510-7b0b3b0b3b0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        backdropImage: 'https://images.unsplash.com/photo-1489599809510-7b0b3b0b3b0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        rating: 8.2,
        ageRating: 'PG-13',
        language: 'English',
        subtitles: ['Spanish', 'French'],
        status: 'now_showing'
      },
      {
        title: 'Black Panther: Wakanda Forever',
        description: 'The nation of Wakanda is pitted against intervening world powers as they mourn the loss of King T\'Challa.',
        genre: ['Action', 'Adventure', 'Drama'],
        duration: 161,
        releaseDate: new Date('2024-02-10'),
        endDate: new Date('2024-05-10'),
        director: 'Ryan Coogler',
        cast: ['Letitia Wright', 'Angela Bassett', 'Lupita Nyong\'o'],
        trailerUrl: 'https://www.youtube.com/watch?v=_Z3QKkl1WyM',
        posterImage: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        backdropImage: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        rating: 7.8,
        ageRating: 'PG-13',
        language: 'English',
        subtitles: ['Spanish', 'French'],
        status: 'now_showing'
      },
      {
        title: 'Spider-Man: No Way Home',
        description: 'With Spider-Man\'s identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear.',
        genre: ['Action', 'Adventure', 'Fantasy'],
        duration: 148,
        releaseDate: new Date('2024-04-20'),
        endDate: new Date('2024-07-20'),
        director: 'Jon Watts',
        cast: ['Tom Holland', 'Zendaya', 'Benedict Cumberbatch'],
        trailerUrl: 'https://www.youtube.com/watch?v=JfVOs4VSpmA',
        posterImage: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        backdropImage: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        rating: 8.4,
        ageRating: 'PG-13',
        language: 'English',
        subtitles: ['Spanish', 'French'],
        status: 'upcoming'
      }
    ];

    const createdMovies = [];
    for (const movieData of movies) {
      const movie = new Movie(movieData);
      await movie.save();
      createdMovies.push(movie);
    }

    // Create showtimes
    const today = new Date();
    const showtimes = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      // Create showtimes for each movie and screen
      for (const movie of createdMovies) {
        for (const screen of [screen1, screen2, screen3]) {
          const times = ['10:00', '13:30', '17:00', '20:30'];
          
          for (const time of times) {
            const showtime = new Showtime({
              movie: movie._id,
              theater: screen.theater,
              screen: screen._id,
              date: date,
              startTime: time,
              endTime: calculateEndTime(time, movie.duration),
              price: {
                regular: 12,
                premium: 18,
                vip: 25,
                wheelchair: 12
              },
              availableSeats: screen.capacity,
              totalSeats: screen.capacity
            });
            await showtime.save();
            showtimes.push(showtime);
          }
        }
      }
    }

    // Create promotions
    const promotions = [
      {
        code: 'WEEKEND20',
        name: 'Weekend Special',
        description: 'Get 20% off on all movie tickets this weekend!',
        type: 'percentage',
        value: 20,
        minOrderAmount: 20,
        usageLimit: 100,
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        isActive: true
      },
      {
        code: 'STUDENT15',
        name: 'Student Discount',
        description: 'Students get 15% off with valid ID',
        type: 'percentage',
        value: 15,
        minOrderAmount: 15,
        usageLimit: 50,
        startDate: new Date(),
        endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days from now
        isActive: true
      },
      {
        code: 'FIRST10',
        name: 'First Time User',
        description: 'Welcome! Get 10% off your first booking',
        type: 'percentage',
        value: 10,
        minOrderAmount: 10,
        usageLimit: 1,
        startDate: new Date(),
        endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days from now
        isActive: true
      }
    ];

    for (const promoData of promotions) {
      const promotion = new Promotion(promoData);
      await promotion.save();
    }

    // Create food items
    const foodItems = [
      {
        name: 'Large Popcorn',
        description: 'Freshly popped buttery popcorn',
        category: 'popcorn',
        price: 8.99,
        image: 'https://images.unsplash.com/photo-1574267432553-4b4628081c31?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
        stock: 100,
        allergens: ['Dairy'],
        nutritionInfo: {
          calories: 400,
          fat: 25,
          protein: 5,
          carbs: 40
        }
      },
      {
        name: 'Coca Cola',
        description: 'Refreshing Coca Cola soft drink',
        category: 'drinks',
        price: 4.99,
        image: 'https://images.unsplash.com/photo-1581636625402-29b2a704ef13?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
        stock: 200,
        allergens: [],
        nutritionInfo: {
          calories: 140,
          fat: 0,
          protein: 0,
          carbs: 35
        }
      },
      {
        name: 'Nachos Supreme',
        description: 'Loaded nachos with cheese, jalapeños, and sour cream',
        category: 'snacks',
        price: 12.99,
        image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
        stock: 50,
        allergens: ['Dairy', 'Gluten'],
        nutritionInfo: {
          calories: 650,
          fat: 35,
          protein: 15,
          carbs: 70
        }
      },
      {
        name: 'Movie Combo',
        description: 'Large popcorn + Large drink + Candy',
        category: 'combo',
        price: 18.99,
        image: 'https://images.unsplash.com/photo-1574267432553-4b4628081c31?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
        stock: 75,
        allergens: ['Dairy'],
        nutritionInfo: {
          calories: 800,
          fat: 30,
          protein: 8,
          carbs: 120
        }
      }
    ];

    for (const foodData of foodItems) {
      const foodItem = new FoodItem(foodData);
      await foodItem.save();
    }

    console.log('Database seeded successfully!');
    console.log('Created:');
    console.log('- 2 users (1 admin, 1 customer)');
    console.log('- 2 theaters');
    console.log('- 3 screens');
    console.log('- 3 movies');
    console.log('- Multiple showtimes');
    console.log('- 3 promotions');
    console.log('- 4 food items');

  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}

function generateSeats(rows: number, seatsPerRow: number, screenType: string) {
  const seats = [];
  const rowLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  
  for (let row = 0; row < rows; row++) {
    for (let seat = 1; seat <= seatsPerRow; seat++) {
      let type = 'regular';
      let price = 12;
      
      // Premium seats in middle rows
      if (row >= 2 && row <= 4) {
        type = 'premium';
        price = 18;
      }
      
      // VIP seats in back rows
      if (row >= 5) {
        type = 'vip';
        price = 25;
      }
      
      // Wheelchair accessible seats
      if (seat === 1 || seat === seatsPerRow) {
        type = 'wheelchair';
        price = 12;
      }
      
      seats.push({
        row: rowLetters[row],
        number: seat,
        type,
        price
      });
    }
  }
  
  return seats;
}

function calculateEndTime(startTime: string, duration: number): string {
  const [hours, minutes] = startTime.split(':').map(Number);
  const startMinutes = hours * 60 + minutes;
  const endMinutes = startMinutes + duration;
  
  const endHours = Math.floor(endMinutes / 60);
  const endMins = endMinutes % 60;
  
  return `${endHours.toString().padStart(2, '0')}:${endMins.toString().padStart(2, '0')}`;
}
