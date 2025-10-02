# Theater My Life - Cinema Management System

A comprehensive cinema management web application built with Next.js, MongoDB, and modern web technologies. This application provides both customer-facing features for booking movie tickets and an admin panel for theater management.

## 🎬 Features

### Customer Features
- **Home Page**: Movie carousel, promotional banners, and quick search
- **Movie Management**: Browse movies, view details, watch trailers
- **Seat Selection**: Interactive seat map with real-time availability
- **Booking System**: Complete booking flow with payment integration
- **User Authentication**: Sign up, sign in with email or social providers
- **User Profile**: Manage account, view booking history
- **Promotions**: Apply discount codes and special offers
- **Food & Beverage**: Order snacks and drinks with tickets
- **Real-time Chat**: Customer support chat
- **Mobile Responsive**: Optimized for all devices

### Admin Features
- **Dashboard**: Analytics and key metrics
- **Movie Management**: Add, edit, delete movies and showtimes
- **Theater Management**: Manage theaters, screens, and seating
- **Booking Management**: View and manage all bookings
- **User Management**: Manage customer accounts
- **Promotion Management**: Create and manage discount codes
- **Reporting**: Generate revenue and booking reports
- **Staff Management**: Manage staff roles and permissions

## 🛠️ Technology Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn UI** - Modern component library
- **Framer Motion** - Animation library
- **React Hook Form** - Form handling
- **Zod** - Schema validation

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **NextAuth.js** - Authentication
- **JWT** - JSON Web Tokens
- **MoMo** - Payment processing for Vietnam (ZaloPay optional)

### Additional Tools
- **Socket.io** - Real-time communication
- **Recharts** - Data visualization
- **React Player** - Video player
- **Date-fns** - Date manipulation
- **Lucide React** - Icon library

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB (local or cloud)
- MoMo account (for payments)
- Google/Facebook OAuth apps (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/delvintrung/manage_movie_theater.git
   cd theater-my-life
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/theater-my-life

   # NextAuth.js
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here

   # OAuth Providers (Optional)
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   FACEBOOK_CLIENT_ID=your-facebook-client-id
   FACEBOOK_CLIENT_SECRET=your-facebook-client-secret

   # MoMo
   MOMO_PARTNER_CODE=your_partner_code
   MOMO_ACCESS_KEY=your_access_key
   MOMO_SECRET_KEY=your_secret_key

   # ZaloPay
   ZALOPAY_APP_ID=your_app_id
   ZALOPAY_KEY1=your_key1
   ZALOPAY_KEY2=your_key2

   # JWT
   JWT_SECRET=your-jwt-secret-key

   # Email (for notifications)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password

   # App Configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Database Setup**
   - Install MongoDB locally or use MongoDB Atlas
   - Update the `MONGODB_URI` in your `.env.local` file
   - The application will automatically create the necessary collections

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
theater-my-life/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   ├── auth/              # Authentication pages
│   │   ├── admin/             # Admin panel
│   │   ├── booking/           # Booking pages
│   │   ├── movies/            # Movie pages
│   │   └── payment/           # Payment pages
│   ├── components/            # React components
│   │   ├── ui/                # Shadcn UI components
│   │   ├── home/              # Home page components
│   │   └── booking/           # Booking components
│   ├── lib/                   # Utility functions
│   ├── models/                # MongoDB models
│   └── types/                 # TypeScript types
├── public/                    # Static assets
└── README.md
```

## 🎯 Key Features Implementation

### Authentication
- JWT-based authentication with NextAuth.js
- Support for email/password and OAuth providers
- Role-based access control (customer, admin, staff)
- Password reset and email verification

### Seat Booking System
- Interactive seat map with real-time availability
- Different seat types (regular, premium, VIP, wheelchair)
- Dynamic pricing based on seat type
- Real-time seat locking during selection

### Payment Integration
- Stripe payment processing
- Support for multiple payment methods
- Secure payment form with validation
- Payment confirmation and receipt generation

### Real-time Features
- Live seat availability updates
- Real-time chat support
- Live booking notifications
- WebSocket integration for real-time updates

## 🔧 Configuration

### OAuth Setup (Optional)
1. **Google OAuth**:
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create a new project or select existing
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add authorized redirect URIs

2. **Facebook OAuth**:
   - Go to [Facebook Developers](https://developers.facebook.com)
   - Create a new app
   - Add Facebook Login product
   - Configure OAuth redirect URIs

### Email Configuration
1. Set up SMTP credentials for email notifications
2. For Gmail, use App Passwords instead of regular passwords
3. Configure email templates for booking confirmations

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push

### Other Platforms
- **Netlify**: Similar to Vercel, supports Next.js
- **Railway**: Good for full-stack applications
- **DigitalOcean**: VPS deployment with Docker

### Database
- **MongoDB Atlas**: Cloud MongoDB service
- **Railway MongoDB**: Managed MongoDB hosting
- **Self-hosted**: Deploy MongoDB on your server

## 📊 Database Schema

### Collections
- **users**: User accounts and profiles
- **movies**: Movie information and metadata
- **theaters**: Theater locations and details
- **screens**: Screen configurations and seating
- **showtimes**: Movie showtimes and availability
- **bookings**: Ticket bookings and payments
- **promotions**: Discount codes and offers
- **fooditems**: Food and beverage menu

## 🔒 Security Features

- **SSL/TLS**: HTTPS encryption
- **JWT Tokens**: Secure authentication
- **Input Validation**: Zod schema validation
- **SQL Injection Protection**: MongoDB with Mongoose
- **XSS Protection**: React's built-in protection
- **CSRF Protection**: NextAuth.js built-in protection
- **Rate Limiting**: API rate limiting
- **Environment Variables**: Secure configuration

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 📱 Mobile App (Future)

The application is designed to be mobile-first and can be extended to include:
- React Native mobile app
- Progressive Web App (PWA)
- Mobile-specific features (push notifications, offline support)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@theatermylife.com or join our Discord community.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Shadcn UI](https://ui.shadcn.com/) - Component library
- [Stripe](https://stripe.com/) - Payment processing
- [MongoDB](https://www.mongodb.com/) - Database
- [Vercel](https://vercel.com/) - Deployment platform

---

**Theater My Life** - Experience the magic of cinema! 🎬✨