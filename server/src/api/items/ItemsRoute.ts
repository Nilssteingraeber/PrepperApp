import { error } from "console";
import { findSingleItem, listItems } from "../../database/base/handlers/items/ItemsHandler";
import ListItemsParams from "../../database/base/handlers/items/ListItemParams";
import { Item, ItemAmountType, ItemModel } from "../../schemas/Item";
import ApiRoute, { RequestType } from "../ApiRoute";
import { Request, Response } from "express";
import mongoose from "mongoose";

const path = "/items";
const review = "/review"
const random = "/random"
const stat = "/static"
const search = "/search"

class ItemsRoute {
    allRoutes = [new Get(), new GetItemOrdered(), new CreateOrUpdateItem(), new GetRandomItem(), new SearchItem()];
}

class CreateOrUpdateItem extends ApiRoute {
    handleRoute(_request: Request, response: Response): Promise<any> | any {


        const item = JSON.parse(JSON.stringify(_request.body) ?? "")


        if (!item) {
            response.status(422).json([""]);
            return;
        }

        const item_code = item.code;
        const product_name = item.product_name;
        const generic_name = item.genericName;
        const images = [{}];
        const ingredients_text_de = "";
        const ingredients_hierarchy = [""];
        const _keywords = item.keywords;
        const allergens_hierarchy = [""];
        const nutrition_data_prepared_per = item.nutriments_per;
        const nutriments = item.nutriments;
        const producer = item.producer;
        const category = item.category;
        const quantity_value = item.quantity_value;
        const quantity_type = item.quantity_type;
        const preffered_image = item.preffered_image;

        const newItem = new Item(product_name, generic_name, images,
            ingredients_text_de, ingredients_hierarchy, _keywords, allergens_hierarchy,
            nutrition_data_prepared_per, nutriments, producer, category, quantity_value,
            quantity_type, item_code, preffered_image)

        ItemModel.updateOne({ _id: newItem.item_code }, { ...newItem }).then((result) => {
            if (result.acknowledged) {
                response.status(200).json(newItem);
            } else {
                response.status(500).json({ errorMessage: "..." });
            }
        })

        return []
    }
    constructor() {
        super(RequestType.PUT, path);
    }
}

class GetRandomItem extends ApiRoute {
    handleRoute(_request: Request, response: Response): Promise<any> {

        const randomItem = ItemModel.aggregate([{ $sample: { size: 1 } }]);

        randomItem.then((result: any) => {
            if (result) {
                response.status(200).json(result);
            } else {
                response.status(422).json({ "message": "Unprocessable Entity" })
            }
        });

        return randomItem
    }
    constructor() {
        super(RequestType.GET, path + random);
    }
}

class SearchItem extends ApiRoute {
    handleRoute(_request: Request, response: Response): Promise<any> | any {

        // Search for an item
        const amountSearched = parseInt(_request.get("amount") ?? "1") ?? 1
        const searchText = _request.get("searchText") ?? "Kekse"

        if (searchText?.length < 3 || searchText?.length > 50) {
            response.status(422).json({ "message": "Unprocessable Entity" })
            return;
        }

        const foundItems = ItemModel.find({ $text: { $search: searchText } }, {
            score: { $meta: "textScore" }
        }).sort({ score: { $meta: "textScore" } }).limit(amountSearched).then((result: any) => {
            if (result) {
                response.status(200).json(result);
            } else {
                response.status(422).json({ "message": "Unprocessable Entity" })
            }
        });

        return foundItems
    }
    constructor() {
        super(RequestType.GET, path + search);
    }
}

class GetItemOrdered extends ApiRoute {
    handleRoute(_request: Request, response: Response): Promise<any> {

        const number = parseInt(_request.get("number") ?? "0")

        const item = ItemModel.findOne().skip(number).exec()

        item.then((result: any) => {
            console.log(result)
            if (result) {
                response.status(200).json(result);
            } else {
                response.status(422).json({ "message": "Unprocessable Entity" })
            }
        });

        return item ?? [];
    }
    constructor() {
        super(RequestType.GET, path + review);
    }
}

// class GetSingleItem extends ApiRoute {
//     handleRoute(_request: Request, response: Response): Promise<any> {

//         const id = response.get("id")?.toString() ?? "-1"
//         const found_item = findSingleItem(id)
//         found_item.then((result: any) => {
//             if (result["ok"]) {
//                 response.status(200).json(result.data);
//             } else {
//                 response.status(422).json({ "message": "Unprocessable Entity" })
//             }
//         });

//         return found_item ?? [];
//     }
//     constructor() {
//         super(RequestType.GET, path);
//     }
// }

class Get extends ApiRoute {
    handleRoute(_request: Request, response: Response): Promise<any> {

        const id = _request.get("itemId")?.toString()


        if (id) {
            const found_item = findSingleItem(id)

            found_item.then((result: any) => {
                if (result["ok"]) {
                    response.status(200).json(result.data);
                } else {
                    response.status(422).json({ "message": "Unprocessable Entity" })
                }
            });

            return found_item ?? [];
        }

        const maxAmount = Number(_request.get("maxAmount"))
        const param = new ListItemsParams(maxAmount)
        const found_items = listItems(param);

        found_items.then((result: any) => {
            if (result["ok"]) {
                response.status(200).json(result.data);
            } else {
                response.status(422).json({ "message": "Unprocessable Entity" })
            }
        });

        return found_items;
    }
    constructor() {
        super(RequestType.GET, path);
    }
}

export default ItemsRoute;
