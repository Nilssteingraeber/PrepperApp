import mongoose, { Schema, Document, ObjectId } from "mongoose";

export enum ItemAmountType {
    WEIGHT_GRAMS = 0,
    VOLUME_LITRES = 1, 
    PIECES = 2,
    SINGLE = 3
}

export class Item {
    name: string;
    pictureUrl: string;
    amountType: ItemAmountType;
    amount: string;

  constructor (name: string, pictureUrl: string, amountType: ItemAmountType, amount: string) {
    this.name = name
    this.pictureUrl = pictureUrl
    this.amountType = amountType
    this.amount = amount
  }
}

const ItemSchema: Schema = new Schema({
  name: { type: String, required: true },
  pictureUrl: { type: String, required: true },
  amountType: { type: Number, required: true },
  amount: { type: String, required: true },
});

export const ItemModel = mongoose.model<Item>('item', ItemSchema);
