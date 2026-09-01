const express = require("express");
const cors = require("cors");

const expenseRoute = require("./routes/expense.route");
const incomeRoute = require("./routes/income.route");

const app = express();

app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Expense Tracker API is running"
    });
});

app.use("/api/expenses", expenseRoute);
app.use("/api/incomes", incomeRoute);

module.exports = app;