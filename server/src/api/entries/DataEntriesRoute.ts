import { listEntries } from "../../database/base/handlers/entries/EntriesHandler";
import ListEntriesParams from "../../database/base/handlers/entries/ListEntriesParams";
import { listItems } from "../../database/base/handlers/items/ItemsHandler";
import ListItemsParams from "../../database/base/handlers/items/ListItemParams";
import { EntryModel } from "../../schemas/Entry";
import { Item, ItemAmountType, ItemModel } from "../../schemas/Item";
import { DataEntry, DataEntryModel } from "../../schemas/data_entries/DataEntry";
import { DataSupplier } from "../../schemas/data_entries/DataSupplier";
import ApiRoute, { RequestType } from "../ApiRoute";
import { Request, Response } from "express";
import mongoose from "mongoose";

const path = "/entries";
const random = "/random"
const stat = "/static"

class DataEntriesRoute {
    allRoutes = [new Get(), new CreateNew()];
}

class CreateNew extends ApiRoute {
    handleRoute(_request: Request, response: Response): Promise<any> | any{

        const itemId = _request.body.item
        const dates = _request.body.dates 
        
        const newDataEntry = new DataEntry([itemId], dates, new DataSupplier(undefined, undefined))
        const entry = new DataEntryModel(newDataEntry)
        const result = entry.save()

        result.then((r) => console.log(r))
        
        return result;
    }
    constructor() {
        super(RequestType.POST, path);
    }
}

class Get extends ApiRoute {
    handleRoute(_request: Request, response: Response): Promise<any> | any{

        const maxAmount = Number(_request.get("maxAmount"))
        const dates = _request.get("validDates")

        const datesData = new Array<Date>

        if (dates) {

            let dataJson = undefined
            try {
                dataJson = JSON.parse(dates ?? "")
            } catch(e) {
                response.status(422).json({"message": "Unprocessable Entity"})
                return;
            }

            if (!dataJson) {
                response.status(422).json({"message": "Unprocessable Entity"})
                return;
            }

            dataJson.forEach((element: string) => {

                const parsedDate = Date.parse(element)
                if (Number.isNaN(parsedDate))
                    return

                datesData.push(new Date(Date.parse(element)))
            });
        }

        const param = new ListEntriesParams(maxAmount, datesData)

        const found_items = listEntries(param);
        
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

export default DataEntriesRoute;
