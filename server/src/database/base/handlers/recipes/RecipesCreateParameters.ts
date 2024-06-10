import { ObjectId } from "mongoose";

export class CreateRecipesParams {
  description: string;
  ingredients: ObjectId[] | undefined;
  amountPeople: number;
  prepDuration: string;

  constructor(
    description: string,
    ingredients: ObjectId[] | undefined,
    amountPeople: number,
    prepDuration: string,
  ) {
    this.description = description;
    this.ingredients = ingredients;
    this.amountPeople = amountPeople;
    this.prepDuration = prepDuration;
  }

  validate = (): boolean => {
    
    return (this.description === undefined || this.description === "") && 
    (this.amountPeople === undefined) &&
    (this.prepDuration === undefined || this.prepDuration === "")
  }
}
