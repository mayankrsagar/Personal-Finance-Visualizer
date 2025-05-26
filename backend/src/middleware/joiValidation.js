import Joi from 'joi';

const amountRule = Joi.number()
  .min(0)
  .messages({
    'number.base': 'Amount should be a number',
    'number.min': 'Amount cannot be negative',
  });

const dateRule = Joi.date()
  .messages({
    'date.base': 'Date must be a valid date',
  });

const descriptionRule = Joi.string()
  .messages({
    'string.base': 'Description must be text',
  });


const CATEGORY_VALUES = [
  "Groceries","Rent","Utilities",
  "Dining","Shopping","Transport",
  "Entertainment","Health","Others"
];


const categoryRule = Joi.string()
  .valid(...CATEGORY_VALUES)
  .messages({
    'any.only': `Category must be one of: ${CATEGORY_VALUES.join(', ')}`,
    'string.base': 'Category must be text',
  });

export const createTransactionSchema = Joi.object({
  amount:      amountRule.required().messages({ 'any.required': 'Please input the amount' }),
  date:        dateRule.required().messages({ 'any.required': 'Date is required' }),
  description: descriptionRule.required().messages({ 'any.required': 'Write something in description' }),
  category:    categoryRule.required().messages({ 'any.required': 'Category is required' }),
});

export const updateTransactionSchema = Joi.object({
  amount:      amountRule,
  date:        dateRule,
  description: descriptionRule,
  category:    categoryRule,
})
  .min(1)  // require at least one field
  .messages({
    'object.min': 'At least one field (amount, date, description, or category) must be provided',
  });

export const createMonthlyBudgetSchema =Joi.object({
  amount:      amountRule.required().messages({ 'any.required': 'Please input the amount' }),
  month:        dateRule.required().messages({ 'any.required': 'Date is required' }),
  category:    categoryRule.required().messages({ 'any.required': 'Category is required' }),
})

export const updateMonthlyBudgetSchema = Joi.object({
  amount:      amountRule,
  month:        dateRule,
  category:    categoryRule,
})
  .min(1)  // require at least one field
  .messages({
    'object.min': 'At least one field (amount, date, or category) must be provided',
  });