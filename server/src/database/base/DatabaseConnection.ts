import mongoose from "mongoose";

let currentDatabaseConnection: mongoose.Connection | null = null

export const DatabaseConnection = async () => {


    console.log("Connecting to Database at " + process.env.MONGO_DB_URL + " ..");
  
    await mongoose.connect(process.env.MONGO_DB_URL as string);
    
    console.log(mongoose.connection.readyState)
    console.log("Connected to Database.");

}
