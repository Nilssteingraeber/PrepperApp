import mongoose from "mongoose";

import "../models/users/user";
import {UserModel, User} from "../schemas/users/User";

// ### Database ###
// #

export const databaseHandler = async () => {
  console.log("Connecting to Database at " + process.env.MONGO_DB_URL + "..");

  await mongoose.connect('mongodb://127.0.0.1:27017/test');
  console.log("Connected to Database.");

  const newUserData: User = {
    name: "HI",
    email: "n-",
  };

  const newUser = new UserModel({ ...newUserData });
  newUser.save().then(
    () => console.log("Added"),
    (err) => {
      console.log("Couldn't save user");
      console.error(err)
    }
  );
};

export default databaseHandler;
