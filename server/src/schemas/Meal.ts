import mongoose, { Schema, Document } from "mongoose";

export interface Meal extends Document {
  name: string;
  recipes: mongoose.Types.ObjectId[];
}

const MealSchema: Schema = new Schema({
  name: { type: String, required: true },
  recipes: [{ type: Schema.Types.ObjectId, ref: 'Recipe' }]
});

export const MealModel = mongoose.model<Meal>('Meal', MealSchema);
