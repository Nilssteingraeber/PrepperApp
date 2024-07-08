import "date-fns"
import { addDays, formatDate, getDay, interval, isWithinInterval, previousMonday, subDays } from "date-fns";

export enum CycleType {
    ONE_WEEK = 0,
    TWO_WEEKS = 1,
    THREE_WEEKS = 2,
    ONE_MONTH = 3,
    ONE_YEAR = 99,
}

export class Cycle {

    cycleType = CycleType.ONE_WEEK;
    startDate = new Date();
    endDate = new Date();
    timeStamp = new Date();

    selectedIndex = 0

    previousSelectedIndex = 0
    animationDirection = 0


    constructor(cycleType = CycleType.ONE_WEEK, startDate = new Date()) {

        this.cycleType = cycleType

        const currentlyMonday = getDay(startDate) == 1

        if(currentlyMonday) {
            this.startDate = new Date(startDate.setHours(0, 0, 0, 0))
        } else {
            this.startDate = new Date(previousMonday(startDate).setHours(0, 0, 0, 0))
        }

        this.endDate = new Date(addDays(this.startDate, 6).setHours(23, 59, 59, 999))
        const currentDay = getDay(new Date())
        this.selectedIndex = (currentDay + 6) % 7 // Dummer JS Modulo
    }

    getDaterangeTomorrowEnd = (): {"start": Date, "end": Date} => {

        const start = new Date(addDays(this.getSelectedDate(), 1).setHours(0, 0, 0, 0))

        if(!this.getIsDateInCycle(start)) {
            return {start: new Date(0), end: new Date(2)}
        }

        const end = this.endDate;

        return {start, end}
    }

    getDaterangeTodayEnd = (): {"start": Date, "end": Date} => {

        const start = new Date(this.getSelectedDate().setHours(0, 0, 0, 0))
        const end = this.endDate;

        return {start, end}
    }

    getDaterangeToday = (): {"start": Date, "end": Date} => {

        const start = new Date(this.getSelectedDate().setHours(0, 0, 0, 0))
        const end = new Date(this.getSelectedDate().setHours(23, 59, 59, 999))

        return {start, end}
    }

    getDaterangeFullCycle = (): {"start": Date, "end": Date} => {
        return {"start": this.startDate, "end": this.endDate}
    }

    getIsDateInCycle = (date: Date): boolean => {
        return isWithinInterval(date, { start: this.startDate, end: this.endDate})
    }

    getIsIndexInPast = (index: number): boolean => {

        if(index <= 0) {
            return true;
        }

        const currentDate = new Date()
        if (isWithinInterval(currentDate, { start: this.startDate, end: addDays(this.startDate, index + 1) })) {
            return false
        }

        return true
    }

    getCurrentDateInWeek = (): number => {

        const currentDate = new Date()

        if (isWithinInterval(currentDate, { start: this.startDate, end: this.endDate })) {
            return getDay(currentDate) - 1
        }

        return -1
    }

    setIndex = (index: number) => {
        this.previousSelectedIndex = this.selectedIndex
        this.selectedIndex = index;

        if (this.previousSelectedIndex > this.selectedIndex) {
            this.animationDirection = 1
        } else {
            this.animationDirection = 0
        }
    }

    getSelectedDate = () => {
        return this.getDayAtIndex(this.selectedIndex)
    }

    getSelectedDateStarting = () => {
        return this.getDayAtIndex(this.selectedIndex).setHours(0, 0, 0, 0)
    }

    getSelectedDateEnding = () => {
        return this.getDayAtIndex(this.selectedIndex).setHours(23, 59, 59, 999)
    }

    getDateStringAtIndex = (index: number) => {
        return formatDate(this.getDayAtIndex(index), "EEEEEE")
    }

    getDayAtIndex = (index: number) => {
        return addDays(this.startDate, index)
    }

    getCyclePretty = (left: boolean) => {


        const startDateString = formatDate(this.startDate ?? new Date(), "eeee, dd.LL")
        const endDateString = formatDate(this.endDate ?? new Date(), "eeee, dd.LL")

        if (left) {
            return startDateString
        } else {
            return endDateString
        }
        return startDateString + "  " + endDateString
    }

    nextCycle = () => {

        let newStart = new Date()
        let newEnd = new Date()

        switch (this.cycleType) {
            case CycleType.ONE_WEEK: {
                newStart = structuredClone(addDays(this.startDate, 7))
                newEnd = structuredClone(addDays(this.endDate, 7))
                break
            }
            case CycleType.TWO_WEEKS:
            case CycleType.THREE_WEEKS:
            case CycleType.ONE_MONTH:
            case CycleType.ONE_YEAR:
        }

        return new Cycle(this.cycleType, newStart);
    }

    previousCycle = () => {

        let newStart = new Date()
        let newEnd = new Date()

        switch (this.cycleType) {
            case CycleType.ONE_WEEK: {
                newStart = structuredClone(subDays(this.startDate, 7))
                newEnd = structuredClone(subDays(this.endDate, 7))
                break
            }
            case CycleType.TWO_WEEKS:
            case CycleType.THREE_WEEKS:
            case CycleType.ONE_MONTH:
            case CycleType.ONE_YEAR:
        }

        return new Cycle(this.cycleType, newStart);
    }
}