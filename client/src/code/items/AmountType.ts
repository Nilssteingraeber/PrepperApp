export default class ItemAmountType {
    static WEIGHT_GRAMS = 0;
    static VOLUME_LITRES = 1; 
    static PIECES = 2;
    static SINGLE = 3;
}

export const getStringItemType = (type: ItemAmountType, amount: number) => {
    
    let result = ""

    let isSingular = false
    
    switch(type) {
        case ItemAmountType.WEIGHT_GRAMS: isSingular = (amount <= 1)
        case ItemAmountType.VOLUME_LITRES: isSingular = (amount <= 1)
        case ItemAmountType.PIECES: isSingular = (amount <= 1)
        case ItemAmountType.SINGLE: isSingular = (amount <= 1)
    }

    switch(type) {
        case (ItemAmountType.WEIGHT_GRAMS): result = isSingular ? "Gram" : "Gramms"; break;
        case ItemAmountType.VOLUME_LITRES: result = isSingular ? "Litre" : "Litres"; break;
        case ItemAmountType.PIECES: result = isSingular ? "Piece" : "Pieces"; break;
        case ItemAmountType.SINGLE: result = isSingular ? "" : ""; break;
    }
    

    return result
}
