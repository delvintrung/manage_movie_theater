import mongoose, { Document, Schema } from 'mongoose';

export interface ISeatBooking {
  row: string;
  number: number;
  type: 'regular' | 'premium' | 'vip' | 'wheelchair';
  price: number;
}

export interface IBooking extends Document {
  user: mongoose.Types.ObjectId;
  showtime: mongoose.Types.ObjectId;
  movie: mongoose.Types.ObjectId;
  theater: mongoose.Types.ObjectId;
  screen: mongoose.Types.ObjectId;
  seats: ISeatBooking[];
  totalAmount: number;
  discountAmount: number;
  finalAmount: number;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentMethod: 'momo' | 'zalopay' | 'cash';
  paymentIntentId?: string;
  paymentTransactionId?: string;
  bookingReference: string;
  status: 'confirmed' | 'cancelled' | 'completed';
  cancellationReason?: string;
  cancelledAt?: Date;
  qrCode?: string;
  createdAt: Date;
  updatedAt: Date;
}

const SeatBookingSchema = new Schema<ISeatBooking>({
  row: {
    type: String,
    required: true
  },
  number: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['regular', 'premium', 'vip', 'wheelchair'],
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price cannot be negative']
  }
});

const BookingSchema = new Schema<IBooking>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User reference is required']
  },
  showtime: {
    type: Schema.Types.ObjectId,
    ref: 'Showtime',
    required: [true, 'Showtime reference is required']
  },
  movie: {
    type: Schema.Types.ObjectId,
    ref: 'Movie',
    required: [true, 'Movie reference is required']
  },
  theater: {
    type: Schema.Types.ObjectId,
    ref: 'Theater',
    required: [true, 'Theater reference is required']
  },
  screen: {
    type: Schema.Types.ObjectId,
    ref: 'Screen',
    required: [true, 'Screen reference is required']
  },
  seats: [SeatBookingSchema],
  totalAmount: {
    type: Number,
    required: [true, 'Total amount is required'],
    min: [0, 'Total amount cannot be negative']
  },
  discountAmount: {
    type: Number,
    default: 0,
    min: [0, 'Discount amount cannot be negative']
  },
  finalAmount: {
    type: Number,
    required: [true, 'Final amount is required'],
    min: [0, 'Final amount cannot be negative']
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['momo', 'zalopay', 'cash'],
    required: [true, 'Payment method is required']
  },
  paymentIntentId: {
    type: String
  },
  paymentTransactionId: {
    type: String
  },
  bookingReference: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String,
    enum: ['confirmed', 'cancelled', 'completed'],
    default: 'confirmed'
  },
  cancellationReason: {
    type: String
  },
  cancelledAt: {
    type: Date
  },
  qrCode: {
    type: String
  }
}, {
  timestamps: true
});

// Generate booking reference before saving
BookingSchema.pre('save', async function(next) {
  if (!this.bookingReference) {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    this.bookingReference = `TML${timestamp}${random}`.toUpperCase();
  }
  next();
});

// Index for better query performance
BookingSchema.index({ user: 1, createdAt: -1 });
BookingSchema.index({ bookingReference: 1 });
BookingSchema.index({ paymentStatus: 1, status: 1 });

export default mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);
