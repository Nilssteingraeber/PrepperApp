import { User, UserModel } from "../../../../schemas/User";
import { Recipe, RecipeModel } from "../../../../schemas/Recipe";
import {ListRecipesParams} from "./RecipesRequestParameters"
import {CreateRecipesParams} from "./RecipesCreateParameters"

export const listItems = async (searchParams: ListRecipesParams) => {

  if(searchParams.validate() === false) {
    return {"status": 422, "ok": false}
  }

  return await RecipeModel.find().limit(searchParams.maxAmount).then((result) => {
    
    return {"status": 200, "ok": true, "data": result}
  })
}

export const createRecipe = async (params: CreateRecipesParams) => {

    // const data = new Recipe(params.description, params.ingredients, params.amountPeople, params.prepDuration)
    // const recipe = new RecipeModel(data);
    // const savedUser = await recipe.save()
    return []
  }