import { Request, Response } from "express";
import ApiRoute, { RequestType } from "../ApiRoute";
import {
    listUsers,
} from "../../database/base/handlers/users/UsersHandler";
import { ListUsersParams } from "../../database/base/handlers/users/UsersRequestParameters";
import { Recipe, RecipeModel } from "../../schemas/Recipe";
import { createRecipe, listItems } from "../../database/base/handlers/recipes/RecipesHandler";
import { CreateRecipesParams } from "../../database/base/handlers/recipes/RecipesCreateParameters";
import { ListRecipesParams } from "../../database/base/handlers/recipes/RecipesRequestParameters";
import mongoose from "mongoose";

const path = "/recipes";
const random = "/random"

class RecipesRoute {
    allRoutes = [new GetList(), new Create(), new Delete()];
}

class Create extends ApiRoute {
    async handleRoute(_request: Request, response: Response): Promise<Promise<any> | any> {


        const sentRecipe = _request.body as Recipe

        if (sentRecipe._id) {
            RecipeModel.findOne({ _id: sentRecipe._id }).then((result) => {
                if (result) {
                    // Update the existing recipe
                    RecipeModel.updateOne(
                        { _id: sentRecipe._id },
                        { $set: sentRecipe }
                    ).then((updateResult) => {
                        console.log('Recipe updated:', updateResult);
                    }).catch((err) => {
                        console.error('Error updating recipe:', err);
                    });
                } else {
                    // Handle the case where the recipe was not found
                    console.log('Recipe not found');
                }
            }).catch((err) => {
                console.error('Error finding recipe:', err);
            });

            response.status(200).json([])
            return;
        }

        const newRecipe = new Recipe(sentRecipe.ingredients, 
            sentRecipe.recipeTitle, sentRecipe.recipeAmountPeople, 
            sentRecipe.recipeSteps, {}, 
            sentRecipe.imageUrl)

        if (newRecipe.recipeTitle.length == 0 || newRecipe.recipeSteps.length == 0) {
            response.status(422).json()
            return;
        }

        const entry = new RecipeModel(newRecipe)
        const result = entry.save()
        result.then((r) => {
            response.status(200).json(r);
        })

    }
    constructor() {
        super(RequestType.POST, path);
    }
}

class Delete extends ApiRoute {
    async handleRoute(_request: Request, response: Response): Promise<Promise<any> | any> {

        const recipe_id = _request.get("recipe_id")?.toString()

        if (recipe_id) {
            RecipeModel.deleteOne({ _id: recipe_id }).then((result) => {
                console.log(result)
                response.status(result.acknowledged ? 200 : 500).json(result)
            })
        }
    }
    constructor() {
        super(RequestType.DELETE, path);
    }
}

class GetList extends ApiRoute {
    handleRoute(_request: Request, response: Response): Promise<any> | any {


        const recipe_id = _request.get("recipe_id")?.toString()

        if (recipe_id) {
            RecipeModel.findOne({ _id: recipe_id }).then((result) => {
                console.log(result)
                response.status(200).json(result)
            })
        } else {
            const listParams = new ListRecipesParams(Number(100));
            const a = RecipeModel.aggregate([{ $sample: { size: listParams.maxAmount } }]).then((result: any) => {

                if (result) {
                    response.status(200).json(result);
                } else {
                    response.status(422).json({ "message": "Unprocessable Entity" })
                }
            });
        }

        return undefined;
    }

    constructor() {
        super(RequestType.GET, path);
    }
}

export default RecipesRoute;
