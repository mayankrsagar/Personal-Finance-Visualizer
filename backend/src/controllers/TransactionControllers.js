import {
  create,
  deleteTransactionService,
  find,
  findAlone,
  update,
} from '../services/TransactionServices.js';

export const addTransaction = async (req, res) => {
  try {
    const createdTransaction = await create(req.body);
    return res.status(201).json({
      message: 'Transaction added successfully',
      data: createdTransaction,
    });
  } catch (error) {
    console.error('Error adding transaction:', error);
    return res.status(500).json({ error: error.message });
  }
};

export const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'Please provide Transaction Id' });
    }

    const existing = await findAlone(id);
    if (!existing) {
      return res.status(404).json({ error: 'Invalid Transaction ID' });
    }

    const updated = await update(id, req.body);
    return res.status(200).json({
      message: 'Transaction updated successfully',
      data: updated,
    });
  } catch (error) {
    console.error('Error updating transaction:', error);
    return res.status(500).json({ error: error.message });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'Please provide Transaction Id' });
    }

    const existing = await findAlone(id);
    if (!existing) {
      return res
        .status(404)
        .json({ error: "Transaction with that ID doesn't exist" });
    }

    const deletedData = await deleteTransactionService(id);
    if (!deletedData) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    return res.status(200).json({
      message: 'Transaction deleted successfully',
      data: deletedData,
    });
  } catch (error) {
    console.error('Error deleting transaction:', error);
    return res.status(500).json({ error: error.message });
  }
};

export const fetchAllTransaction = async (req, res) => {
  try {
    const all = await find();
    if (all.length === 0) {
      return res.status(200).json({
        message: 'No transactions found',
        data: [],
      });
    }
    return res.status(200).json({
      message: 'Fetched transactions successfully',
      data: all,
    });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return res.status(500).json({ error: error.message });
  }
};
