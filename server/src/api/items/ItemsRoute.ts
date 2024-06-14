import { listItems } from "../../database/base/handlers/items/ItemsHandler";
import ListItemsParams from "../../database/base/handlers/items/ListItemParams";
import { Item, ItemAmountType, ItemModel } from "../../schemas/Item";
import ApiRoute, { RequestType } from "../ApiRoute";
import { Request, Response } from "express";
import mongoose from "mongoose";

const path = "/items";
const random = "/random"
const stat = "/static"

class ItemsRoute {
    allRoutes = [new GetList(), new CreateRandom(), new CreateStaticItems()];
}

class CreateStaticItems extends ApiRoute {
    async handleRoute(_request: Request, response: Response): Promise<any> {

        let randomImageUrl = "/static/items/PotatoesRaw.jpg"
        let newItem = new Item("Potatoes", randomImageUrl, ItemAmountType.WEIGHT_GRAMS, "1000")
        let savedItem = await (new ItemModel(newItem)).save();

        randomImageUrl = "/static/items/Milk.jpg"
        newItem = new Item("Milk", randomImageUrl, ItemAmountType.VOLUME_LITRES, "1")
        savedItem = await (new ItemModel(newItem)).save();

        randomImageUrl = "/static/items/HotDogs.jpg"
        newItem = new Item("HotDogs", randomImageUrl, ItemAmountType.WEIGHT_GRAMS, "500")
        savedItem = await (new ItemModel(newItem)).save();

        response.status(200).json({"msg": "Ok"})
        return savedItem;
    }
    constructor() {
        super(RequestType.POST, path + stat);
    }
}

class CreateRandom extends ApiRoute {
    async handleRoute(_request: Request, response: Response): Promise<any> {

        const randomImageUrl = "/static/items/PotatoesRaw.jpg"

        const newItem = new Item("Potatoes", randomImageUrl, ItemAmountType.WEIGHT_GRAMS, "1000")
        
        const savedItem = await (new ItemModel(newItem)).save();

        response.status(200).json(savedItem)
        return savedItem;
    }
    constructor() {
        super(RequestType.POST, path + random);
    }
}

class GetList extends ApiRoute {
    handleRoute(_request: Request, response: Response): Promise<any> {

        const maxAmount = Number(_request.get("maxAmount"))
        const param = new ListItemsParams(maxAmount)
        const found_items = listItems(param);
        
        found_items.then((result: any) => {
            if(result["ok"]) {
                response.status(200).json(result.data);
            } else {
                response.status(422).json({"message": "Unprocessable Entity"})
            }
        });

        return found_items;
    }
    constructor() {
        super(RequestType.GET, path);
    }
}

export default ItemsRoute;
