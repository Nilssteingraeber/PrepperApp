import type { Item } from "../item/Item";
import Ingredient from "../ingredient/Ingredient"

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

export default class Recipe {
    
    ingredients: Ingredient[]
    recipeTitle: string
    recipeAmountPeople: number
    recipeSteps: Step[]
    _id: string | undefined

    recipeCreateData: {}

    constructor(ingredients: [], title: string, amountPeople: number, steps: [], data: {}, _id: string) {
        this.ingredients = ingredients
        this.recipeTitle = title
        this.recipeAmountPeople = amountPeople
        this.recipeSteps = steps
        this.recipeCreateData = data
        this._id = _id;
    }
}
