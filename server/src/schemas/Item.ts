import mongoose, { Schema, Document, ObjectId } from "mongoose";

export enum ItemAmountType {
    WEIGHT_GRAMS = 0,
    VOLUME_LITRES = 1, 
    PIECES = 2,
    SINGLE = 3
}

export class Item {
    product_name: "";
    generic_name: "";
    images: [];
    ingredients_text_de: "";
    ingredients_hierarchy: string[];
    _keywords: string[];
    allergens_hierarchy: string[];
    nutrition_data_prepared_per: "";
    nutriments: {};

  constructor (name: string, pictureUrl: string, amountType: ItemAmountType, amount: string) {
    this.product_name = "";
    this.generic_name =  "";
    this.images =  [];
    this.ingredients_text_de =  "";
    this.ingredients_hierarchy =  [];
    this._keywords =  [];
    this.allergens_hierarchy =  [];
    this.nutrition_data_prepared_per =  "";
    this.nutriments =  {};
  }
}

const ItemSchema: Schema = new Schema({
  _id: {type: String, required: false},
  product_name: { type: String, required: true },
  generic_name: { type: String, required: true },
  images: { type: String, required: true },
  ingredients_text_de: { type: String, required: true },
  ingredients_hierarchy: { type: String, required: true },
  _keywords: { type: String, required: true },
  allergens_hierarchy: { type: String, required: true },
  nutrition_data_prepared_per: { type: String, required: true },
  nutriments: { type: {}, required: true},
});

export const ItemModel = mongoose.model<Item>('item', ItemSchema);
