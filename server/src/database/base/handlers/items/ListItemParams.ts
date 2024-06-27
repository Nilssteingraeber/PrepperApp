export default class ListItemsParams {

    maxAmount: number

    constructor(maxAmount: number) {
        this.maxAmount = maxAmount
        
        if(this.maxAmount < 0 || Number.isNaN(maxAmount) || this.maxAmount > 100) {
            this.maxAmount = 15
        }
    }

    validate = (): boolean => {
        return this.maxAmount !== undefined && this.maxAmount > 0
    }
}