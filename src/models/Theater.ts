import mongoose, { Document, Schema } from 'mongoose';

export interface ITheater extends Document {
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
  createdAt: Date;
  updatedAt: Date;
}

const TheaterSchema = new Schema<ITheater>({
  name: {
    type: String,
    required: [true, 'Theater name is required'],
    trim: true,
    maxlength: [100, 'Theater name cannot be more than 100 characters']
  },
  location: {
    address: {
      type: String,
      required: [true, 'Address is required']
    },
    city: {
      type: String,
      required: [true, 'City is required']
    },
    state: {
      type: String,
      required: [true, 'State is required']
    },
    zipCode: {
      type: String,
      required: [true, 'Zip code is required']
    },
    coordinates: {
      lat: {
        type: Number,
        required: [true, 'Latitude is required']
      },
      lng: {
        type: Number,
        required: [true, 'Longitude is required']
      }
    }
  },
  contact: {
    phone: {
      type: String,
      required: [true, 'Phone number is required']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    }
  },
  facilities: [{
    type: String
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default mongoose.models.Theater || mongoose.model<ITheater>('Theater', TheaterSchema);
