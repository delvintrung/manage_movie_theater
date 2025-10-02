import mongoose, { Document, Schema } from 'mongoose';

export interface ISeat {
  row: string;
  number: number;
  type: 'regular' | 'premium' | 'vip' | 'wheelchair';
  price: number;
}

export interface IScreen extends Document {
  name: string;
  theater: mongoose.Types.ObjectId;
  capacity: number;
  screenType: '2D' | '3D' | 'IMAX' | '4DX';
  seats: ISeat[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SeatSchema = new Schema<ISeat>({
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
    default: 'regular'
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price cannot be negative']
  }
});

const ScreenSchema = new Schema<IScreen>({
  name: {
    type: String,
    required: [true, 'Screen name is required'],
    trim: true
  },
  theater: {
    type: Schema.Types.ObjectId,
    ref: 'Theater',
    required: [true, 'Theater reference is required']
  },
  capacity: {
    type: Number,
    required: [true, 'Screen capacity is required'],
    min: [1, 'Capacity must be at least 1']
  },
  screenType: {
    type: String,
    enum: ['2D', '3D', 'IMAX', '4DX'],
    required: [true, 'Screen type is required']
  },
  seats: [SeatSchema],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default mongoose.models.Screen || mongoose.model<IScreen>('Screen', ScreenSchema);
