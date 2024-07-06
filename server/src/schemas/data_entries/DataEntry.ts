import mongoose, { Schema, Document, ObjectId, Types, SchemaTypes } from "mongoose";
import { DataSupplier } from "./DataSupplier";
import DateRange from "./DateRange";

export class DataEntry {
    itemIds: [mongoose.Types.ObjectId | String]
    validDates: [DateRange]
    dataSupplier: DataSupplier
    status: [string]

    constructor(
        itemIds: [mongoose.Types.ObjectId | String], validDates: [DateRange], dataSupplier: DataSupplier, status: [string],
    ) {
        this.itemIds = itemIds;
        this.validDates = validDates;
        this.dataSupplier = dataSupplier;
        this.status = status;
    }
}

const DataEntrySchema: Schema = new Schema({
    itemIds: { type: [SchemaTypes.String], required: true },
    validDates: { type: [{...DateRange}], required: true },
    dataSupplier: { type: {...DataSupplier}, required: true },
    status: {type: [SchemaTypes.String], required: true}
});

export const DataEntryModel = mongoose.model<DataEntry>("dataEntry", DataEntrySchema);
