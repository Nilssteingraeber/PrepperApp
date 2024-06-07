import "date-fns"
import { addDays, formatDate, subDays } from "date-fns";

export enum CycleType {
    ONE_WEEK = 0,
    TWO_WEEKS = 1,
    THREE_WEEKS = 2,
    ONE_MONTH = 3,
    ONE_YEAR = 99,
}

export class Cycle {
    
    cycleType: CycleType;
    startDate!: Date;
    endDate!: Date;

    constructor(cycleType = CycleType.ONE_WEEK, startDate?: Date, endDate?: Date) {
        this.cycleType = cycleType

        if(!startDate) {
            this.startDate = new Date()
            this.endDate = addDays(this.startDate, 7)
        }
    }

    getCyclePretty = () => {
        const startDateString = formatDate(this.startDate, "eeee, dd.LL")
        const endDateString = formatDate(this.endDate, "eeee, dd.LL")

        return startDateString + " to " + endDateString 
    }

    goNextCycle = () => {
        switch(this.cycleType) {
            case CycleType.ONE_WEEK: {
                this.startDate = addDays(this.startDate, 7)
                this.endDate = addDays(this.endDate, 7)
            }
            case CycleType.TWO_WEEKS:
            case CycleType.THREE_WEEKS:
            case CycleType.ONE_MONTH:
            case CycleType.ONE_YEAR:
        }
    }

    goPreviousCycle = () => {

        console.log("Hi")
        switch(this.cycleType) {
            case CycleType.ONE_WEEK: {
                this.startDate = subDays(this.startDate, 7)
                this.endDate = subDays(this.endDate, 7)
            }
            case CycleType.TWO_WEEKS:
            case CycleType.THREE_WEEKS:
            case CycleType.ONE_MONTH:
            case CycleType.ONE_YEAR:
        }
    }
}