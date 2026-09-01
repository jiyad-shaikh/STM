const incomes = require("../data/incomes");

const getIncomes = (req, res) => {
    res.status(200).json(incomes);
};

const getIncomeById = (req, res) => {
    const id = Number(req.params.id);

    const income = incomes.find(
        (income) => income.id === id
    );

    if (!income) {
        return res.status(404).json({
            message: "Income not found"
        });
    }

    res.status(200).json(income);
};

const createIncome = (req, res) => {
    const {
        source,
        amount,
        date,
        description
    } = req.body;

    if (!source || amount === undefined || !date) {
        return res.status(400).json({
            message: "Source, amount and date are required"
        });
    }

    const income = {
        id: Date.now(),
        source,
        amount: Number(amount),
        date,
        description: description || ""
    };

    incomes.push(income);

    res.status(201).json({
        message: "Income created successfully",
        income
    });
};

const updateIncome = (req, res) => {
    const id = Number(req.params.id);

    const incomeIndex = incomes.findIndex(
        (income) => income.id === id
    );

    if (incomeIndex === -1) {
        return res.status(404).json({
            message: "Income not found"
        });
    }

    const {
        source,
        amount,
        date,
        description
    } = req.body;

    incomes[incomeIndex] = {
        ...incomes[incomeIndex],
        ...(source !== undefined && { source }),
        ...(amount !== undefined && {
            amount: Number(amount)
        }),
        ...(date !== undefined && { date }),
        ...(description !== undefined && { description })
    };

    res.status(200).json({
        message: "Income updated successfully",
        income: incomes[incomeIndex]
    });
};

const deleteIncome = (req, res) => {
    const id = Number(req.params.id);

    const incomeIndex = incomes.findIndex(
        (income) => income.id === id
    );

    if (incomeIndex === -1) {
        return res.status(404).json({
            message: "Income not found"
        });
    }

    const deletedIncome = incomes.splice(
        incomeIndex,
        1
    );

    res.status(200).json({
        message: "Income deleted successfully",
        income: deletedIncome[0]
    });
};

module.exports = {
    getIncomes,
    getIncomeById,
    createIncome,
    updateIncome,
    deleteIncome
};