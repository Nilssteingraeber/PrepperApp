import mongoose, { Schema, Document } from "mongoose";

interface Ingredient {
  name: string;
  amount: number;
  price: number;
  calories: number;
  nutrients: number[];
}

export interface Entry extends Document {
  name: string;
  timeframe: [Date, Date];
  meals: mongoose.Types.ObjectId[];
  additionalIngredients: Ingredient[];
}

const EntrySchema: Schema = new Schema({
  name: { type: String, required: true },
  timeframe: { type: [Date], required: true },
  meals: [{ type: Schema.Types.ObjectId, ref: 'Meal' }],
  additionalIngredients: [{
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    price: { type: Number, required: true },
    calories: { type: Number, required: true },
    nutrients: { type: [Number], required: true }
  }]
});

export const EntryModel = mongoose.model<Entry>('Entry', EntrySchema);
