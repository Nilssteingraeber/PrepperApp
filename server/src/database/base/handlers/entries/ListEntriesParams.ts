import DateRange from "../../../../schemas/data_entries/DateRange";
import { addSeconds, parseISO } from 'date-fns';
export default class ListEntriesParams {

    maxAmount: number
    dateRange: DateRange

    constructor(maxAmount: number = 5, dateRange: DateRange) {

        // Max Amount
        this.maxAmount = maxAmount
        if(this.maxAmount < 0 || Number.isNaN(maxAmount) || this.maxAmount > 500) {
            this.maxAmount = 50
        }

        const a = new Date()
        const b = new Date();
        
        // Dates
        this.dateRange = dateRange;
        if(!this.dateRange) {
            this.dateRange = new DateRange(a, b)
        }
    }

    validate = (): boolean => {
        return this.maxAmount !== undefined && this.maxAmount > 0 && this.dateRange.endDate !== undefined && this.dateRange.startDate !== undefined
    }
}