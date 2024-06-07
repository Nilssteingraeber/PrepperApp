export class ListUsersParams {

    username: string | undefined
    creation_date: {"after": Date, "before": Date} | undefined

    constructor(username: string | undefined, creation_date: {"after": Date, "before": Date} | undefined) {
        this.username = username ?? undefined
        this.creation_date = creation_date ?? undefined
    }
}