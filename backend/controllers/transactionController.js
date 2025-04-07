const Transaction = require('../Model/Transaction.js');

// @desc    Get all transactions
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ createdAt: -1 });
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// @desc    Add a transaction
exports.addTransaction = async (req, res) => {
  try {
    const { text, amount } = req.body;
    const transaction = await Transaction.create({ text, amount });
    res.status(201).json(transaction);
  } catch (err) {
    res.status(400).json({ error: 'Invalid data' });
  }
};


// Delete a transaction by ID
exports.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTransaction = await Transaction.findByIdAndDelete(id);

    if (!deletedTransaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    res.status(200).json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

  
