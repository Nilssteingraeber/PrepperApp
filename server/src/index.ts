import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import UsersRoute from './api/users/UsersRoute';
import ApiRoute from './api/ApiRoute';
import REST_Router from './api/REST_Router';
import { DatabaseConnection } from './database/base/DatabaseConnection';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3001;

const restRouter = new REST_Router(app)

app.get("/hallo", (request, response) => {
  response.json({"type": "get"}).status(200)
})

app.post("/hallo", (request, response) => {
  response.json({"type": "post"}).status(200)
})

DatabaseConnection()

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});