import type { DataSupplier } from "./DataSupplier";
import type DateRange from "./DateRange";
import type EntryItem from "./EntryItem";

export class DataEntry {

    entryItems: [EntryItem]
    validDates: [DateRange]
    dataSupplier: DataSupplier

    constructor(
        entryItems: [EntryItem], validDates: [DateRange], dataSupplier: DataSupplier
    ) {
        this.entryItems = entryItems;
        this.validDates = validDates;
        this.dataSupplier = dataSupplier;
    }
}