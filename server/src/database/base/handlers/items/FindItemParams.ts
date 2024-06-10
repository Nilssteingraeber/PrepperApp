export default class FindItemParams {

    name: string | undefined

    constructor(name: string) {
        this.name = name
    }

    validate = (): boolean => {
        return this.name !== undefined && this.name !== ""
    }
}