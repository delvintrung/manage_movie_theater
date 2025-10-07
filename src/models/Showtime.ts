import mongoose, { Document, Schema } from 'mongoose';
import './Theater';
import './Movie';
import './Screen';

export interface IShowtime extends Document {
  movie: mongoose.Types.ObjectId;
  theater: mongoose.Types.ObjectId;
  screen: mongoose.Types.ObjectId;
  date: Date;
  startTime: string; // Format: "HH:MM"
  endTime: string; // Format: "HH:MM"
  price: {
    regular: number;
    premium: number;
    vip: number;
    wheelchair: number;
  };
  availableSeats: number;
  totalSeats: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ShowtimeSchema = new Schema<IShowtime>({
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
  date: {
    type: Date,
    required: [true, 'Show date is required']
  },
  startTime: {
    type: String,
    required: [true, 'Start time is required'],
    match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter a valid time format (HH:MM)']
  },
  endTime: {
    type: String,
    required: [true, 'End time is required'],
    match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter a valid time format (HH:MM)']
  },
  price: {
    regular: {
      type: Number,
      required: true,
      min: [0, 'Price cannot be negative']
    },
    premium: {
      type: Number,
      required: true,
      min: [0, 'Price cannot be negative']
    },
    vip: {
      type: Number,
      required: true,
      min: [0, 'Price cannot be negative']
    },
    wheelchair: {
      type: Number,
      required: true,
      min: [0, 'Price cannot be negative']
    }
  },
  availableSeats: {
    type: Number,
    required: true,
    min: [0, 'Available seats cannot be negative']
  },
  totalSeats: {
    type: Number,
    required: true,
    min: [1, 'Total seats must be at least 1']
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for better query performance
ShowtimeSchema.index({ movie: 1, theater: 1, date: 1 });
ShowtimeSchema.index({ date: 1, startTime: 1 });

export default mongoose.models.Showtime || mongoose.model<IShowtime>('Showtime', ShowtimeSchema);
