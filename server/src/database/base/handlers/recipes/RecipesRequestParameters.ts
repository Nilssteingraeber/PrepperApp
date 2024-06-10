export class ListRecipesParams {

    maxAmount: number

    constructor(maxAmount: number) {
        this.maxAmount = maxAmount
    }

    validate = (): boolean => {
        return this.maxAmount !== undefined && this.maxAmount > 0
    }
}