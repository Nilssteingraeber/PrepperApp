import { User, UserModel } from "../../../../schemas/User";
import { ListUsersParams } from "./UsersRequestParameters";

export const registerUser = async (data: User): Promise<any> => {
  

  const usernameExist = await UserModel.findOne({"email": data.email})

  if (usernameExist !== null) {
    return {"status": 422, "ok": false}
  }

  const user = new UserModel(data);
  const savedUser = await user.save()

  return {"status": 200, "ok": true}
}

export const listUsers = async (searchParams: ListUsersParams) => {

  const filterObject = {
    "username": searchParams.username,
    ...{"join_date": {
      $lt: searchParams.creation_date?.before,
      $gt: searchParams.creation_date?.after
    }} && searchParams.creation_date?.before && searchParams.creation_date?.after
  }

  return await UserModel.find(filterObject).then((result) => {
    return result
  })
}