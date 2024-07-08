import mongoose from "mongoose";
import { listEntries } from "../../database/base/handlers/entries/EntriesHandler";
import ListEntriesParams from "../../database/base/handlers/entries/ListEntriesParams";
import { DataEntry, DataEntryModel } from "../../schemas/data_entries/DataEntry";
import { DataSupplier } from "../../schemas/data_entries/DataSupplier";
import DateRange from "../../schemas/data_entries/DateRange";
import ApiRoute, { RequestType } from "../ApiRoute";
import { Request, Response } from "express";
import { json } from "stream/consumers";

const path = "/entries";
const random = "/random"
const stat = "/static"

const actions = "/actions"

const tickAll = "tickall"
const crossTicked = "crossticked"
const deleteTicked = "deleteticked"

class DataEntriesRoute {
    allRoutes = [new Get(), new CreateNew(), new Update(), new Delete(), new Actions()];
}

class CreateNew extends ApiRoute {
    handleRoute(_request: Request, response: Response): Promise<any> | any {

        const entryItems = _request.body.entryItems
        const dates = _request.body.dates

        console.log("bodyCreate", _request.body)

        const supplierRecipe = _request.body.recipe_id

        const newDataEntry = new DataEntry(entryItems, dates, new DataSupplier(supplierRecipe, undefined))
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

class Actions extends ApiRoute {
    async handleRoute(_request: Request, response: Response): Promise<Promise<any> | any> {

        const actionDone = _request.body.action;
        const entryIds = _request.body.ids as [];

        console.log('Received request with action:', actionDone);
        console.log('Entry IDs:', entryIds);

        const objectIdsArray = entryIds.map((id: number) => new mongoose.Types.ObjectId(id));

        if (actionDone === 'tickAll') {
            const promises = objectIdsArray.map(async (id) => {
                const files = await DataEntryModel.find({ _id: id });

                const updatePromises = files.map(async (entry) => {
                    const newDataEntry = new DataEntry(entry.entryItems, entry.validDates, entry.dataSupplier);

                    newDataEntry.entryItems.forEach((entryItem) => {
                        entryItem.status = "1";
                    });

                    await DataEntryModel.updateOne({ _id: id }, { ...newDataEntry });
                });

                await Promise.all(updatePromises);
            });

            await Promise.all(promises);
        }

        if (actionDone === 'crossSelected') {
            const promises = objectIdsArray.map(async (id) => {
                const files = await DataEntryModel.find({ _id: id });

                const updatePromises = files.map(async (entry) => {
                    const newDataEntry = new DataEntry(entry.entryItems, entry.validDates, entry.dataSupplier);

                    newDataEntry.entryItems.forEach((entryItem) => {
                        if (entryItem.status == "1")
                            entryItem.status = "2";
                    });

                    await DataEntryModel.updateOne({ _id: id }, { ...newDataEntry });
                });

                await Promise.all(updatePromises);
            });

            await Promise.all(promises);
        }

        if (actionDone === 'deleteCrossed') {
            let promises = objectIdsArray.map(async (id) => {
                const files = await DataEntryModel.find({ _id: id });
                const updatePromises = files.map(async (entry) => {
                    const newDataEntry = new DataEntry(entry.entryItems, entry.validDates, entry.dataSupplier);

                    newDataEntry.entryItems = newDataEntry.entryItems.filter((entryItem) => {
                        return entryItem.status !== "2"
                    })


                    await DataEntryModel.updateOne({ _id: id }, { ...newDataEntry });
                });

                await Promise.all(updatePromises);
            });

            await Promise.all(promises);



            promises.length = 0;
            promises = objectIdsArray.map(async (id) => {
                const files = await DataEntryModel.find({ _id: id });

                console.log(files)

                const updatePromises = files.map(async (entry) => {
                    const newDataEntry = new DataEntry(entry.entryItems, entry.validDates, entry.dataSupplier);

                    console.log("Items", newDataEntry.entryItems)
                    console.log("Length", newDataEntry.entryItems.length)
                    if(newDataEntry.entryItems.length <= 0) {
                        await DataEntryModel.deleteOne({ _id: id }).then((result) => {
                            console.log("ActionDeleteResult: ", result)
                        });
                    }
                });

                await Promise.all(updatePromises);
            });
            await Promise.all(promises);
        }

        // if (actionDone === 'deleteCrossed') {
        //     const promises = objectIdsArray.map(async (id) => {
        //         const files = await DataEntryModel.find({ _id: id });

        //         const updatePromises = files.map(async (entry) => {
        //             // Create a new DataEntry instance with filtered entryItems
        //             const newDataEntry = new DataEntry(
        //                 entry.entryItems.filter(entryItem => entryItem.status !== "2"),
        //                 entry.validDates,
        //                 entry.dataSupplier
        //             );

        //             await DataEntryModel.updateOne({ _id: id }, { ...newDataEntry });
        //         });

        //         await Promise.all(updatePromises);
        //     });

        //     await Promise.all(promises);
        // }




        response.status(200).json({})
    }



    constructor() {
        super(RequestType.POST, path + actions);
    }
}

class Update extends ApiRoute {
    handleRoute(_request: Request, response: Response): Promise<any> | any {

        const entry = _request.body.entry;

        if (!entry) {
            response.status(422).json({})
            return;
        }

        let id = entry._id
        if (!id) {
            response.status(422).json({})
            return;
        }

        console.log("Updating File..")
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
