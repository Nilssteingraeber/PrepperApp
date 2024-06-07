import { Express } from "express";
import UsersRoute from "./users/UsersRoute";
import { RequestType } from "./ApiRoute";

class REST_Router {
    constructor(expressApp: Express) {
        const usersRoute = new UsersRoute();
        const allUpperRoutes = [usersRoute];

        this.init(allUpperRoutes, expressApp);
    }

    init = (upperRoutes: UsersRoute[], expressApp: Express) => {
        upperRoutes.forEach((upperRoute) => {
            upperRoute.allRoutes.forEach((subRoute) => {
                console.log(
                    "Connecting " +
                    "[" +
                    subRoute.type +
                    "] " +
                    "/api" +
                    subRoute.routePath
                );
                switch (subRoute.type) {
                    case RequestType.GET:
                        expressApp.get("/api" + subRoute.routePath, async (req, res) => {
                            await subRoute.handleRoute(req, res);
                        });
                        break;
                    case RequestType.POST:
                        expressApp.post("/api" + subRoute.routePath, async (req, res) => {
                            await subRoute.handleRoute(req, res);
                        });
                        break;
                    case RequestType.DELETE:
                        expressApp.delete("/api" + subRoute.routePath, async (req, res) => {
                            await subRoute.handleRoute(req, res);
                        });
                        break;
                    case RequestType.PUT:
                        expressApp.put("/api" + subRoute.routePath, async (req, res) => {
                            await subRoute.handleRoute(req, res);
                        });
                        break;
                }
            });
        });
    };
}

export default REST_Router;
