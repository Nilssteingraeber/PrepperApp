
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { databaseHandler } from './database/databaseHandler';
import { UserModel } from './schemas/users/User';

require("dotenv").config(); 

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3001;

databaseHandler()

app.get('/api/users', (_req, res) => {
    UserModel.find({}).exec().then((result) => {
        res.status(200).json(result);
        console.log(result)
    })
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});