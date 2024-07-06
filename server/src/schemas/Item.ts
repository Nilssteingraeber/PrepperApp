import mongoose, { Schema, Document, ObjectId } from "mongoose";

export enum ItemAmountType {
    WEIGHT_GRAMS = 0,
    VOLUME_LITRES = 1, 
    PIECES = 2,
    SINGLE = 3
}

export class Item {

    product_name: string;
    generic_name: string;
    images: string;
    ingredients_text_de: string;
    ingredients_hierarchy: string[];
    _keywords: string[];
    allergens_hierarchy: string[];
    nutrition_data_prepared_per: string;
    nutriments: {};
    producer: string;
    category: string[];
    quantity_value: string;
    quantity_type: string;
    item_code: string;
    preffered_image: string;

  constructor (product_name: string, generic_name: string, images: {}[], ingredients_text_de: string, ingredients_hierarchy: string[],_keywords:string[], 
    allergens_hierarchy: string[], nutrition_data_prepared_per: string, nutriments: string[], producer: string, category: string[], quantity_value: string,
    quantity_type: string, item_code: string, preffered_image: string
  ) {
    this.product_name = product_name;
    this.generic_name = generic_name;
    this.images = "";
    this.ingredients_text_de =  ingredients_text_de;
    this.ingredients_hierarchy = ingredients_hierarchy;
    this._keywords = _keywords;
    this.allergens_hierarchy = allergens_hierarchy;
    this.nutrition_data_prepared_per =  nutrition_data_prepared_per;
    this.nutriments =  nutriments;
    this.producer = producer;
    this.category = category;
    this.quantity_value = quantity_value;
    this.quantity_type = quantity_type;
    this.item_code = item_code;
    this.preffered_image = preffered_image;
  }
}

const ItemSchema: Schema = new Schema({
  _id: {type: String, required: false},
  product_name: { type: String, required: true },
  generic_name: { type: String, required: true },
  images: { type: String, required: true },
  ingredients_text_de: { type: String, required: false },
  ingredients_hierarchy: { type: [String], required: true },
  _keywords: { type: [String], required: true },
  allergens_hierarchy: { type: [String], required: true },
  nutrition_data_prepared_per: { type: String, required: true },
  nutriments: { type: {}, required: true},
  producer: {type: String, required: false },
  category: {type: [String], required: false},
  quantity_value: {type: String, required: false},
  quantity_type: {type: String, required: false},
  preffered_image: {type: String}
});

// db.items.dropIndex("TextIndexWithWeights")
// db.items.dropIndex("_keywords_text_category_text_generic_name_text_product_name_text__id_1") /siehe error code

mongoose.connection
  .collection("items")
  .createIndex(
    { _keywords: "text", category: "text", generic_name: "text", product_name: "text" },
    { weights: { product_name: 8, generic_name: 4, _keywords: 2, category: 1 }, name: "TextIndexWithWeights" }
  )

export const ItemModel = mongoose.model<Item>('item', ItemSchema);
