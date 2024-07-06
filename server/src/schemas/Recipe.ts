import mongoose, { Schema, Document, ObjectId } from "mongoose";
import { Item } from "./Item";


export class Step {
  name: string
  text: string
  index: number

  constructor(name: string, text: string, index: number) {
      this.name = name;
      this.text = text;
      this.index = index;
  }
}

class Ingredient {
    
  item: Item
  amountItem: number
  amountValue: string
  amountType: string

  constructor(item: Item, amountItem: number, amountValue: string, amountType: string) {
      this.amountItem = amountItem;
      this.item = item;
      this.amountValue = amountValue;
      this.amountType = amountType;
  }
}

export class Recipe {
    
  ingredients: Ingredient[]
  recipeTitle: string
  recipeAmountPeople: number
  recipeSteps: Step[]

  recipeCreateData: {}

  constructor(ingredients: Ingredient[], title: string, amountPeople: number, steps: Step[], data: {}) {
      this.ingredients = ingredients
      this.recipeTitle = title
      this.recipeAmountPeople = amountPeople
      this.recipeSteps = steps
      this.recipeCreateData = data
  }
}

const RecipeSchema: Schema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  ingredients: { type: {...Ingredient}, required: true },
  recipeTitle: { type: String, required: true},
  recipeAmountPeople: { type: Number, required: true },
  recipeSteps: { type: {...Step}, required: true },
});

export const RecipeModel = mongoose.model<Recipe>('recipe', RecipeSchema);
