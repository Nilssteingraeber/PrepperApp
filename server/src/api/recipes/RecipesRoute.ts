import { Request, Response } from "express";
import ApiRoute, { RequestType } from "../ApiRoute";
import {
    listUsers,
} from "../../database/base/handlers/users/UsersHandler";
import { ListUsersParams } from "../../database/base/handlers/users/UsersRequestParameters";
import { Recipe } from "../../schemas/Recipe";
import { createRecipe, listItems } from "../../database/base/handlers/recipes/RecipesHandler";
import { CreateRecipesParams } from "../../database/base/handlers/recipes/RecipesCreateParameters";
import { ListRecipesParams } from "../../database/base/handlers/recipes/RecipesRequestParameters";
import mongoose from "mongoose";

const path = "/recipes";
const random = "/random"

class RecipesRoute {
    allRoutes = [new GetList(), new Create()];
}

class Create extends ApiRoute {
    async handleRoute(_request: Request, response: Response): Promise<Promise<any> | any> {
        
        const description = String(_request.get("description"))
        const ingredients = String(_request.get("ingredients")).split(", ").map(String)
        const amountPeople = Number(_request.get("amountPeople"))
        const prepDuration = String(_request.get("prepDuration"));

        const params = new CreateRecipesParams(description, undefined, amountPeople, prepDuration)
        
        if(params.validate()) {
            response.status(422).json({ "message": "Unprocessable Entity" })
            return
        }
        
        const createResult = await createRecipe(params)

        response.status(200).json({ "message": "OK" , "recipe": createResult})
    }
    constructor() {
        super(RequestType.POST, path);
    }
}

class GetList extends ApiRoute {
    handleRoute(_request: Request, response: Response): Promise<any> {


        const found_recipes = listItems(new ListRecipesParams(Number(_request.get("maxAmount"))));
        
        found_recipes.then((result: any) => {
            if(result["ok"]) {
                response.status(200).json(result.data);
            } else {
                response.status(422).json({"message": "Unprocessable Entity"})
            }
        });

        return found_recipes;
    }
    constructor() {
        super(RequestType.GET, path);
    }
}

export default RecipesRoute;
