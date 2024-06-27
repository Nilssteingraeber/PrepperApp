import { Express } from "express";
import UsersRoute from "./users/UsersRoute";
import { RequestType } from "./ApiRoute";
import RecipesRoute from "./recipes/RecipesRoute";
import ItemsRoute from "./items/ItemsRoute";
import DataEntriesRoute from "./entries/DataEntriesRoute";

class REST_Router {
    constructor(expressApp: Express) {
        const usersRoute = new UsersRoute();
        const recipesRoutes = new RecipesRoute();
        const itemsRoutes = new ItemsRoute();
        const entriesRoutes = new DataEntriesRoute();

        const allUpperRoutes = [usersRoute, recipesRoutes, itemsRoutes, entriesRoutes];

        this.init(allUpperRoutes, expressApp);
    }

    init = (upperRoutes: UsersRoute[], expressApp: Express) => {
        console.log("*** Routes ***")
        upperRoutes.forEach((upperRoute) => {
            upperRoute.allRoutes.forEach((subRoute) => {
                console.log(
                    "Connecting " +
                    "[" +
                    subRoute.type +
                    "]\t" +
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
            console.log("--------------------------------------")
        });
    };
}

export default REST_Router;
