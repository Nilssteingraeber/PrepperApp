import mongoose, { Schema } from "mongoose";

let currentDatabaseConnection: mongoose.Connection | null = null;

export const DatabaseConnection = async () => {
  console.log("Connecting to Database at " + process.env.MONGO_DB_URL + " ..");
  console.log(mongoose.connection.readyState);
  await mongoose.connect(process.env.MONGO_DB_URL as string, { family: 4 });

  console.log(mongoose.connection.readyState);
  console.log("Connected to Database.");
};
