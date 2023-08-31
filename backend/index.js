import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import EmployeesShema from './model/Employees.js';
import router from './routes/index.js';

//mongodb+srv://content_record:<password>@cluster0.a5xxxyu.mongodb.net/
dotenv.config();

const PORT = process.env.PORT || 5000;
const URL = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.a5xxxyu.mongodb.net/system_records`;

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', router);

mongoose
  .connect(URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(`DB connection error: ${err}`));

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
