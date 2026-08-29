const expenses = require("../data/expense");

const getExpenses = (req, res) => {
    res.status(200).json(expenses);
};

const getExpenseById = (req, res) => {
    const id = Number(req.params.id);

    const expense = expenses.find(expense => expense.id === id);

    if (!expense) {
        return res.status(404).json({
            message: "Expense not found"
        });
    }

    res.status(200).json(expense);
};

const createExpense = (req, res) => {
    const { title, amount, category, date, description } = req.body;

    if (!title || amount === undefined || !category || !date) {
        return res.status(400).json({
            message: "Title, amount, category and date are required"
        });
    }

    const expense = {
        id: Date.now(),
        title,
        amount: Number(amount),
        category,
        date,
        description: description || ""
    };

    expenses.push(expense);

    res.status(201).json({
        message: "Expense created successfully",
        expense
    });
};

const updateExpense = (req, res) => {
    const id = Number(req.params.id);

    const expenseIndex = expenses.findIndex(expense => expense.id === id);

    if (expenseIndex === -1) {
        return res.status(404).json({
            message: "Expense not found"
        });
    }

    const { title, amount, category, date, description } = req.body;

    expenses[expenseIndex] = {
        ...expenses[expenseIndex],
        ...(title !== undefined && { title }),
        ...(amount !== undefined && { amount: Number(amount) }),
        ...(category !== undefined && { category }),
        ...(date !== undefined && { date }),
        ...(description !== undefined && { description })
    };

    res.status(200).json({
        message: "Expense updated successfully",
        expense: expenses[expenseIndex]
    });
};

const deleteExpense = (req, res) => {
    const id = Number(req.params.id);

    const expenseIndex = expenses.findIndex(expense => expense.id === id);

    if (expenseIndex === -1) {
        return res.status(404).json({
            message: "Expense not found"
        });
    }

    const deletedExpense = expenses.splice(expenseIndex, 1);

    res.status(200).json({
        message: "Expense deleted successfully",
        expense: deletedExpense[0]
    });
};

module.exports = {
    getExpenses,
    getExpenseById,
    createExpense,
    updateExpense,
    deleteExpense
};