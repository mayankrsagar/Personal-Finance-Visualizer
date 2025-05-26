import { Transaction } from '../models/transaction.js';

export const find = async () => {
  return await Transaction.find().sort({ date: -1 }).lean();
};

export const findAlone = async (id) => {
  return await Transaction.findById(id).lean();
};

export const create = async (data) => {
  const { amount, date, description, category } = data;
  const transactionData = new Transaction({
    amount,
    date,
    description,
    category,           
  });
  return await transactionData.save();
};

export const update = async (id, data) => {
  const { amount, date, description, category } = data;
  const updateField = {};

  if (amount !== undefined)      updateField.amount      = amount;
  if (date   !== undefined)      updateField.date        = date;
  if (description !== undefined) updateField.description = description;
  if (category !== undefined)    updateField.category    = category;

  return await Transaction.findByIdAndUpdate(
    id,
    { $set: updateField },
    { new: true, runValidators: true }
  ).lean();
};

export const deleteTransactionService = async (id) => {
  return await Transaction.findByIdAndDelete(id).lean();
};
