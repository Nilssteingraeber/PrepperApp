import "dotenv/config";
import express from "express";
import cors from "cors";
import UsersRoute from "./api/users/UsersRoute";
import ApiRoute from "./api/ApiRoute";
import REST_Router from "./api/REST_Router";
import { DatabaseConnection } from "./database/base/DatabaseConnection";
import path, { dirname } from "path";
import mongoose, { Mongoose } from "mongoose";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3001;

const restRouter = new REST_Router(app);

DatabaseConnection();

console.log(path.resolve(__dirname + "/../src/public"));

//http://localhost:3001/static/image.png
app.use(
  "/api/static",
  express.static(path.resolve(__dirname + "/../src/public"))
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//console.log(app._router.stack)
