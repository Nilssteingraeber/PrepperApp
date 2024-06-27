export default class ListEntriesParams {

    maxAmount: number
    validDates: Date[]

    constructor(maxAmount: number = 5, dates: Date[] = [new Date()]) {

        // Max Amount
        this.maxAmount = maxAmount
        if(this.maxAmount < 0 || Number.isNaN(maxAmount) || this.maxAmount > 500) {
            this.maxAmount = 500
        }

        // Dates
        this.validDates = dates;
        if(!this.validDates || this.validDates.length < 1 || this.validDates.length > 500) {
            this.validDates = [new Date()]
        }
    }

    validate = (): boolean => {
        return this.maxAmount !== undefined && this.maxAmount > 0 && this.validDates && this.validDates.length > 0
    }
}