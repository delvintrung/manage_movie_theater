import mongoose, { Document, Schema } from 'mongoose';

export interface IMovie extends Document {
  title: string;
  description: string;
  genre: string[];
  duration: number; // in minutes
  releaseDate: Date;
  endDate: Date;
  director: string;
  cast: string[];
  trailerUrl: string;
  posterImage: string;
  backdropImage: string;
  rating: number;
  ageRating: 'G' | 'PG' | 'PG-13' | 'R' | 'NC-17';
  language: string;
  subtitles: string[];
  status: 'upcoming' | 'now_showing' | 'ended';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const MovieSchema = new Schema<IMovie>({
  title: {
    type: String,
    required: [true, 'Movie title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Movie description is required'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  genre: [{
    type: String,
    required: true
  }],
  duration: {
    type: Number,
    required: [true, 'Movie duration is required'],
    min: [1, 'Duration must be at least 1 minute']
  },
  releaseDate: {
    type: Date,
    required: [true, 'Release date is required']
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required']
  },
  director: {
    type: String,
    required: [true, 'Director is required'],
    trim: true
  },
  cast: [{
    type: String,
    trim: true
  }],
  trailerUrl: {
    type: String,
    required: [true, 'Trailer URL is required'],
    match: [/^https?:\/\/.+/, 'Please enter a valid URL']
  },
  posterImage: {
    type: String,
    required: [true, 'Poster image is required']
  },
  backdropImage: {
    type: String,
    required: [true, 'Backdrop image is required']
  },
  rating: {
    type: Number,
    default: 0,
    min: [0, 'Rating cannot be negative'],
    max: [10, 'Rating cannot be more than 10']
  },
  ageRating: {
    type: String,
    enum: ['G', 'PG', 'PG-13', 'R', 'NC-17'],
    required: [true, 'Age rating is required']
  },
  language: {
    type: String,
    required: [true, 'Language is required']
  },
  subtitles: [{
    type: String
  }],
  status: {
    type: String,
    enum: ['upcoming', 'now_showing', 'ended'],
    default: 'upcoming'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for better search performance
MovieSchema.index({ title: 'text', description: 'text', genre: 'text' });
MovieSchema.index({ status: 1, releaseDate: 1 });

export default mongoose.models.Movie || mongoose.model<IMovie>('Movie', MovieSchema);
