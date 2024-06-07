import mongoose, { Schema, Document } from "mongoose";


export class User {
  username: string | undefined;
  password: string | undefined;
  join_date: Date | undefined;
  friends: string[] | undefined;
  planners: mongoose.Types.ObjectId[] | undefined;
  
  /**
   * 
   * @param username 
   * @param password 
   * @param join_date 
   * @param friends 
   * @param planners 
   */
  constructor (username: string, password: string, join_date: Date, friends: string[], planners: any) {
    this.username = username
    this.password = password
    this.join_date = join_date
    this.friends = friends
    this.planners = planners
  }
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique:true},
  password: { type: String, required: true },
  join_date: {type: Schema.Types.Date, required: true},
  friends: { type: [String], default: [] },
  planners: [{ type: Schema.Types.ObjectId, ref: 'Planner' }]
});

mongoose.connection.collection("users").createIndex({"username": 1}, {unique: true});

export const UserModel = mongoose.model<User>('user', UserSchema);
