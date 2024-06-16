import mongoose, { Schema, Document } from "mongoose";

export class User {
  name: string | undefined;
  surname: string | undefined;
  email: string | undefined;
  password: string | undefined;

  join_date: Date | undefined;
  friends: string[] | undefined;
  planners: mongoose.Types.ObjectId[] | undefined;

  /**
   *
   * @param name
   * @param surname
   * @param email
   * @param password
   * @param join_date
   * @param friends
   * @param planners
   */
  constructor(
    name: string,
    surname: string,
    email: string,
    password: string,
    join_date: Date,
    friends: string[],
    planners: any
  ) {
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.password = password;

    this.join_date = join_date;
    this.friends = friends;
    this.planners = planners;
  }
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true, unique: true },

  join_date: { type: Schema.Types.Date, required: true },
  friends: { type: [String], default: [] },
  planners: [{ type: Schema.Types.ObjectId, ref: "Planner" }],
});

mongoose.connection
  .collection("users")
  .createIndex({ email: 1 }, { unique: true });

export const UserModel = mongoose.model<User>("user", UserSchema);
