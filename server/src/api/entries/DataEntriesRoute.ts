import mongoose from "mongoose";
import { listEntries } from "../../database/base/handlers/entries/EntriesHandler";
import ListEntriesParams from "../../database/base/handlers/entries/ListEntriesParams";
import { DataEntry, DataEntryModel } from "../../schemas/data_entries/DataEntry";
import { DataSupplier } from "../../schemas/data_entries/DataSupplier";
import DateRange from "../../schemas/data_entries/DateRange";
import ApiRoute, { RequestType } from "../ApiRoute";
import { Request, Response } from "express";

const path = "/entries";
const random = "/random"
const stat = "/static"

class DataEntriesRoute {
    allRoutes = [new Get(), new CreateNew(), new Update(), new Delete()];
}

class CreateNew extends ApiRoute {
    handleRoute(_request: Request, response: Response): Promise<any> | any {

        const itemIds = _request.body.item
        const dates = _request.body.dates

        console.log("bodyCreate",_request.body)

        const status = _request.body.status

        const supplierRecipe = _request.body.recipe_id

        const newDataEntry = new DataEntry(itemIds, dates, new DataSupplier(supplierRecipe, undefined), status ?? ["0"])
        const entry = new DataEntryModel(newDataEntry)

        const result = entry.save()
        result.then((r) => {
            response.status(200).json(r);
        })

        return result;
    }
    constructor() {
        super(RequestType.POST, path);
    }
}

class Update extends ApiRoute {
    handleRoute(_request: Request, response: Response): Promise<any> | any {

        const entry = _request.body.entry;

        console.log("bodyUpdate",_request.body)

        if (!entry) {
            response.status(422).json({})
            return;
        }

        let id = entry._id
        if (!id) {
            response.status(422).json({})
            return;
        }

        const update = DataEntryModel.updateOne({ _id: id }, { ...entry }).then((result: { acknowledged: any; }) => {

            if (result.acknowledged) {
                response.status(200).json(result);
            } else {
                response.status(500).json({});
            }
        })

        return update;
    }
    constructor() {
        super(RequestType.PUT, path);
    }
}

class Delete extends ApiRoute {
    async handleRoute(_request: Request, response: Response): Promise<Promise<any> | any> {

        const idsToDelete = _request.body.ids

        const objectIdsToDelete = idsToDelete.map((id: string) => new mongoose.Types.ObjectId(id));

        // Delete documents with IDs in the array
        await DataEntryModel.deleteMany({ _id: { $in: objectIdsToDelete } })
            .then(result => {
                console.log(`Deleted ${result.deletedCount} documents`);
                response.status(200).json({ "msg": "Deleted " + result.deletedCount + " items!" })
            })
            .catch(error => {
                console.error('Error deleting documents:', error);
                response.status(500).json({ "msg": "Error. " })
            })

    }
    constructor() {
        super(RequestType.DELETE, path);
    }
}

class Get extends ApiRoute {
    handleRoute(_request: Request, response: Response): Promise<any> | any {

        const maxAmount = Number(_request.get("maxAmount"))

        const startDateString = _request.get("startDate") ?? "1";
        const endDateString = _request.get("endDate") ?? "1";

        const startDateTimestamp = parseInt(startDateString);
        const endDateTimestamp = parseInt(endDateString);

        const startDate = new Date(startDateTimestamp);
        const endDate = new Date(endDateTimestamp);

        const param = new ListEntriesParams(maxAmount, new DateRange(startDate, endDate))

        const found_items = listEntries(param);

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

export default DataEntriesRoute;
