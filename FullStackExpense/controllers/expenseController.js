const Expense = require('../models/expense');

exports.getAllExpenses = async (req, res) => {
    try {
        const expenses = await Expense.findAll();
        res.json(expenses);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch expenses' });
    }
};

exports.createExpense = async (req, res) => {
    try {
        const { title, amount, category } = req.body;
        const newExpense = await Expense.create({ title, amount, category });
        res.status(201).json(newExpense);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create expense' });
    }
};

exports.deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Expense.destroy({ where: { id } });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Expense not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete expense' });
    }
};

exports.updateExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, amount, category } = req.body;
        const [updated] = await Expense.update({ title, amount, category }, {
            where: { id },
        });
        if (updated) {
            const updatedExpense = await Expense.findByPk(id);
            res.json(updatedExpense);
        } else {
            res.status(404).json({ error: 'Expense not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Failed to update expense' });
    }
};
