import mongoose, { Document, Schema } from 'mongoose';

export interface IFoodItem extends Document {
  name: string;
  description: string;
  category: 'popcorn' | 'drinks' | 'snacks' | 'combo';
  price: number;
  image: string;
  isAvailable: boolean;
  stock: number;
  allergens?: string[];
  nutritionInfo?: {
    calories: number;
    fat: number;
    protein: number;
    carbs: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const FoodItemSchema = new Schema<IFoodItem>({
  name: {
    type: String,
    required: [true, 'Food item name is required'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  category: {
    type: String,
    enum: ['popcorn', 'drinks', 'snacks', 'combo'],
    required: [true, 'Category is required']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  image: {
    type: String,
    required: [true, 'Image is required']
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  stock: {
    type: Number,
    default: 0,
    min: [0, 'Stock cannot be negative']
  },
  allergens: [{
    type: String
  }],
  nutritionInfo: {
    calories: {
      type: Number,
      min: [0, 'Calories cannot be negative']
    },
    fat: {
      type: Number,
      min: [0, 'Fat cannot be negative']
    },
    protein: {
      type: Number,
      min: [0, 'Protein cannot be negative']
    },
    carbs: {
      type: Number,
      min: [0, 'Carbs cannot be negative']
    }
  }
}, {
  timestamps: true
});

// Index for better search performance
FoodItemSchema.index({ category: 1, isAvailable: 1 });
FoodItemSchema.index({ name: 'text', description: 'text' });

export default mongoose.models.FoodItem || mongoose.model<IFoodItem>('FoodItem', FoodItemSchema);
