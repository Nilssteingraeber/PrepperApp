export default class EntryItem {
    itemId: string
    amountTypeNeeded: string
    amountValueNeeded: string
    status: string

    constructor(
        itemId: string,
        amountTypeNeeded: string,
        amountValueNeeded: string,
        status: string
    ) {
        this.itemId = itemId
        this.amountTypeNeeded = amountTypeNeeded
        this.amountValueNeeded = amountValueNeeded
        this.status = status
    }
}

