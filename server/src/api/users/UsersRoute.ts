import { Request, Response } from "express";
import ApiRoute, { RequestType } from "../ApiRoute";
import {
  listUsers,
  registerUser,
} from "../../database/base/handlers/users/UsersHandler";
import { User } from "../../schemas/User";
import mongoose, { Schema } from "mongoose";
import { ListUsersParams } from "../../database/base/handlers/users/UsersRequestParameters";


const path = "/users";

const register = "/create";
const list = "/list";
const delete_ = "/delete";

class UsersRoute {
  allRoutes = [new GetList(), new Create(), new Delete()];
}

class GetList extends ApiRoute {
  handleRoute(_request: Request, response: Response): Promise<any> {
    const found_users = listUsers({ username: "nils" } as ListUsersParams);

    found_users.then((result) => {
      response.json(result).status(200);
    });

    return found_users;
  }
  constructor() {
    super(RequestType.GET, path);
  }
}

class Create extends ApiRoute {
  async handleRoute(_request: Request, response: Response): Promise<any> {
    const p_name = String(_request.get("name"))
    const p_surname = String(_request.get("surname"))
    const p_email = String(_request.get("email"))
    const p_password = String(_request.get("password"));
    const join_date = new Date();

    const newUserResult = await registerUser(
      new User(p_name, p_surname, p_email, p_password, join_date, [], null)
    );

    if (newUserResult.ok === false) {
        response.status(newUserResult["status"]).json({"message": "Unprocessable Entity", "field_email_error": "This Email is already taken."})
    } else {
        response.status(newUserResult["status"]).json({"message": "User was created successfully!"})
    }
    
  }
  constructor() {
    super(RequestType.POST, path);
  }
}

class Delete extends ApiRoute {
  handleRoute(_request: Request, response: Response): Promise<any> {
    throw new Error("Method not implemented.");
  }

  constructor() {
    super(RequestType.POST, path + delete_);
  }
}

export default UsersRoute;
