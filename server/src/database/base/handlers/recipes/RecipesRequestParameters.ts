export class ListRecipesParams {

    maxAmount: number

    constructor(maxAmount = 100) {
        this.maxAmount = maxAmount
    }

    validate = (): boolean => {
        return this.maxAmount !== undefined && this.maxAmount > 0
    }
}