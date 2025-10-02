import mongoose, { Document, Schema } from 'mongoose';

export interface IPromotion extends Document {
  code: string;
  name: string;
  description: string;
  type: 'percentage' | 'fixed' | 'buy_one_get_one';
  value: number; // percentage or fixed amount
  minOrderAmount?: number;
  maxDiscountAmount?: number;
  usageLimit?: number;
  usedCount: number;
  startDate: Date;
  endDate: Date;
  applicableMovies?: mongoose.Types.ObjectId[];
  applicableTheaters?: mongoose.Types.ObjectId[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PromotionSchema = new Schema<IPromotion>({
  code: {
    type: String,
    required: [true, 'Promotion code is required'],
    unique: true,
    uppercase: true,
    trim: true,
    match: [/^[A-Z0-9]+$/, 'Promotion code can only contain letters and numbers']
  },
  name: {
    type: String,
    required: [true, 'Promotion name is required'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Promotion description is required'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  type: {
    type: String,
    enum: ['percentage', 'fixed', 'buy_one_get_one'],
    required: [true, 'Promotion type is required']
  },
  value: {
    type: Number,
    required: [true, 'Promotion value is required'],
    min: [0, 'Value cannot be negative']
  },
  minOrderAmount: {
    type: Number,
    min: [0, 'Minimum order amount cannot be negative']
  },
  maxDiscountAmount: {
    type: Number,
    min: [0, 'Maximum discount amount cannot be negative']
  },
  usageLimit: {
    type: Number,
    min: [1, 'Usage limit must be at least 1']
  },
  usedCount: {
    type: Number,
    default: 0,
    min: [0, 'Used count cannot be negative']
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required']
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required']
  },
  applicableMovies: [{
    type: Schema.Types.ObjectId,
    ref: 'Movie'
  }],
  applicableTheaters: [{
    type: Schema.Types.ObjectId,
    ref: 'Theater'
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for better query performance
PromotionSchema.index({ code: 1, isActive: 1 });
PromotionSchema.index({ startDate: 1, endDate: 1 });

export default mongoose.models.Promotion || mongoose.model<IPromotion>('Promotion', PromotionSchema);
