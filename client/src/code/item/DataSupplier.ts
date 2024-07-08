import mongoose, { Schema } from "mongoose";

export enum DataSupplierType {
    RECIPE = 0,
    USER_ADDED = 1
}

export class DataSupplier {
    recipeId: mongoose.Types.ObjectId | undefined;
    userId: mongoose.Types.ObjectId | undefined;

    constructor(
        recipeId: mongoose.Types.ObjectId | undefined, userId: mongoose.Types.ObjectId | undefined
    ) {
        this.recipeId = recipeId;
        this.userId = userId;
    }
}

const DataSupplierSchema: Schema = new Schema({
    recipeId: { type: mongoose.Types.ObjectId, required: false },
    userId: { type: mongoose.Types.ObjectId, required: false },
});

export const DataSupplierModel = mongoose.model<DataSupplier>("dataSupplier", DataSupplierSchema);
