import mongoose, { Schema } from 'mongoose';

// Raw document interface. Contains the data type as it will be stored
// in MongoDB. So you can ObjectId, Buffer, and other custom primitive data types.
// But no Mongoose document arrays or subdocuments.
export interface User {
  name: string;
  email: string;
  avatar?: string;
}

// Schema
var UserSchema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: String
});

export const UserModel = mongoose.model("Users", UserSchema)
