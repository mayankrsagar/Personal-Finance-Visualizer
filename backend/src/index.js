import cors from 'cors';
import { config } from 'dotenv';
import express from 'express';

import { connectDB } from './config/db.js';
import budgetRouter from './routes/budgetRoutes.js';
import transactionRouter from './routes/transactionRoutes.js';

config();
const app=express();
connectDB();

//middleware
app.use(cors());
app.use(express.json());


app.use("/api/transactions",transactionRouter);
app.use("/api/transactions",budgetRouter);
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error' });
});
const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server is listening on ${PORT}`)
})