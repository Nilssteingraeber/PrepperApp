import { Request, Response } from "express";
import ApiRoute, { RequestType } from "../ApiRoute";
import { Recipe, RecipeModel } from "../../schemas/Recipe";
import { ListRecipesParams } from "../../database/base/handlers/recipes/RecipesRequestParameters";

const path = "/recipes";
const random = "/random"

class RecipesRoute {
    allRoutes = [new GetList(), new Create(), new Delete()];
}

class Create extends ApiRoute {
    async handleRoute(_request: Request, response: Response): Promise<Promise<any> | any> {

        const sentRecipe = _request.body as Recipe

        if (sentRecipe && sentRecipe._id) {
            RecipeModel.findOne({ _id: sentRecipe._id }).then((result) => {
                if (result) {
                    RecipeModel.updateOne(
                        { _id: sentRecipe._id },
                        { $set: sentRecipe }
                    ).then((updateResult) => {
                        response.status(200).json({ errorMessage: "..." })
                    }).catch((err) => {
                        response.status(500).json({ errorMessage: "..." })
                    });

                } else {
                    response.status(500).json({ errorMessage: "..." })
                }
            }).catch((err) => {
                console.error('Error finding recipe: ', err);
                response.status(500).json({ errorMessage: "..." })
            });
        }

        const newRecipe = new Recipe(sentRecipe.ingredients,
            sentRecipe.recipeTitle, sentRecipe.recipeAmountPeople,
            sentRecipe.recipeSteps, {},
            sentRecipe.imageUrl)

        if (newRecipe.recipeTitle.length == 0 || newRecipe.recipeSteps.length == 0) {
            response.status(422).json({ errorMessage: "Required fields ('recipe-title or recipe-steps') missing!" })
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
            RecipeModel.aggregate([{ $sample: { size: listParams.maxAmount } }]).then((result: any) => {
                if (result) {
                    response.status(200).json(result);
                } else {
                    response.status(422).json({ "errorMessage": "..." })
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
