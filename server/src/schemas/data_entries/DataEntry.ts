import mongoose, { Schema, Document, ObjectId, Types, SchemaTypes } from "mongoose";
import { DataSupplier } from "./DataSupplier";
import DateRange from "./DateRange";


export class EntryItem {
    itemId: String
    amountTypeNeeded: String
    amountValueNeeded: String
    status: String
    private _id: any;

    constructor(
        itemId: String,
        amountTypeNeeded: String,
        amountValueNeeded: String,
        status: String
    ) {
        this.itemId = itemId
        this.amountTypeNeeded = amountTypeNeeded
        this.amountValueNeeded = amountValueNeeded
        this.status = status
    }
}

export class DataEntry {

    entryItems: EntryItem[]
    validDates: DateRange[]
    dataSupplier: DataSupplier

    constructor(
        entryItems: EntryItem[], validDates: DateRange[], dataSupplier: DataSupplier,
    ) {
        this.entryItems = entryItems;
        this.validDates = validDates;
        this.dataSupplier = dataSupplier;
    }
}

const DataEntrySchema: Schema = new Schema({
    entryItems: { type: [{ ...EntryItem }], required: true },
    validDates: { type: [{ ...DateRange }], required: true },
    dataSupplier: { type: { ...DataSupplier }, required: true },
});

export const DataEntryModel = mongoose.model<DataEntry>("dataEntry", DataEntrySchema);
