import mongoose, { Schema, Document } from "mongoose";

interface Ingredient {
  name: string;
  amount: number;
  price: number;
  calories: number;
  nutrients: number[];
}

export interface Recipe extends Document {
  description: string;
  ingredients: Ingredient[];
  amountPeople: number;
  prepDuration: string;
}

const RecipeSchema: Schema = new Schema({
  description: { type: String, required: true },
  ingredients: [{
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    price: { type: Number, required: true },
    calories: { type: Number, required: true },
    nutrients: { type: [Number], required: true }
  }],
  amountPeople: { type: Number, required: true },
  prepDuration: { type: String, required: true }
});

export const RecipeModel = mongoose.model<Recipe>('Recipe', RecipeSchema);
