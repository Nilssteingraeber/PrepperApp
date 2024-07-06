import type { Item } from "../item/Item";

export default class Ingredient {
    
    itemCode: string
    amountItem: number
    amountValue: string
    amountType: string

    constructor(itemCode: string, amountItem: number, amountValue: string, amountType: string) {
        this.amountItem = amountItem;
        this.itemCode = itemCode;
        this.amountValue = amountValue;
        this.amountType = amountType;
    }
}