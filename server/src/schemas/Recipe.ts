import mongoose, { Schema, Document, ObjectId } from "mongoose";
export class Recipe {
  description: string | undefined
  ingredients: Array<ObjectId> | undefined;
  amountPeople: number | undefined;
  prepDuration: string | undefined;

  constructor (description: string, ingredients: Array<ObjectId> | undefined, amountPeople: number, prepDuration: string) {
    this.description = description
    this.ingredients = ingredients
    this.amountPeople = amountPeople
    this.prepDuration = prepDuration
  }
}

const RecipeSchema: Schema = new Schema({
  description: { type: String, required: true },
  ingredients: { type: Array<ObjectId>, required: true},
  amountPeople: { type: Number, required: true },
  prepDuration: { type: String, required: true },
});

export const RecipeModel = mongoose.model<Recipe>('recipe', RecipeSchema);
