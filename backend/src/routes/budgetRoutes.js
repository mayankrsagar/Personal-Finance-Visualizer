import express from 'express';

import {
  addBudget,
  deleteBudget,
  getAllBudgets,
  updateBudget,
} from '../controllers/MonthlyBudgetController.js';
import {
  createMonthlyBudgetSchema,
  updateMonthlyBudgetSchema,
} from '../middleware/joiValidation.js';
import { validateWithJoi } from '../middleware/validateWithJoi .js';

const router=express.Router();

router.get("/budgets",getAllBudgets);
router.post("/add/budget",validateWithJoi(createMonthlyBudgetSchema),addBudget);
router.patch("/update/budget/:id",validateWithJoi(updateMonthlyBudgetSchema),updateBudget);
router.delete("/delete/budget/:id",deleteBudget);

export default router;

