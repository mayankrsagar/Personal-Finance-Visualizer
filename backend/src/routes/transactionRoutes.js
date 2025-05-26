import express from 'express';

import {
  addTransaction,
  deleteTransaction,
  fetchAllTransaction,
  updateTransaction,
} from '../controllers/TransactionControllers.js';
import {
  createTransactionSchema,
  updateTransactionSchema,
} from '../middleware/joiValidation.js';
import { validateWithJoi } from '../middleware/validateWithJoi .js';

const router=express.Router();

router.get("/",validateWithJoi(createTransactionSchema) ,fetchAllTransaction);
router.post("/add",validateWithJoi(updateTransactionSchema),addTransaction);
router.patch("/update/:id",updateTransaction);
router.delete("/delete/:id",deleteTransaction);
export default router;