import ListItemParams from "./ListItemParams"
import { Item, ItemModel } from "../../../../schemas/Item";
import { CreateRecipesParams } from "../recipes/RecipesCreateParameters";
import { Recipe, RecipeModel } from "../../../../schemas/Recipe";
import { ObjectId } from "mongoose";

export const findSingleItem = async(id: string) => {

    console.log(id)
    return await ItemModel.findOne({_id: id}).then((result) => {
        return { "status": 200, "ok": true, "data": result } 
    })
}

export const listItems = async (searchParams: ListItemParams) => {

    if (searchParams.validate() === false) {
        return { "status": 422, "ok": false }
    }

    return await ItemModel.aggregate([{ $sample: { size: searchParams.maxAmount } }]).then((result) => {
        return { "status": 200, "ok": true, "data": result }
    })

    // return await ItemModel.find().limit(searchParams.maxAmount).then((result) => {
    //     return { "status": 200, "ok": true, "data": result }
    // })
}



export const createRecipe = async (params: CreateRecipesParams) => {

    // const data = new Recipe(params.description, params.ingredients, params.amountPeople, params.prepDuration)
    // const recipe = new RecipeModel(data);
    // const savedUser = await recipe.save()
    // return savedUser
}