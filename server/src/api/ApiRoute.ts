import express, { Request, Response } from 'express';



export enum RequestType {
    GET = "GET",
    POST = "POST",
    DELETE = "DELETE",
    PUT = "PUT"
}

abstract class ApiRoute {

    routePath: string;
    type: RequestType
    

    constructor(request_type: RequestType, route_path: string) {
        this.routePath = route_path
        this.type = request_type
    }

    abstract handleRoute(_request: Request, response: Response): Promise<any>;
}

export default ApiRoute