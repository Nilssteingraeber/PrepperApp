import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
  username: string;
  password: string;
  friends: string[];
  planners: mongoose.Types.ObjectId[];
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  friends: { type: [String], default: [] },
  planners: [{ type: Schema.Types.ObjectId, ref: 'Planner' }]
});

export const UserModel = mongoose.model<User>('User', UserSchema);
