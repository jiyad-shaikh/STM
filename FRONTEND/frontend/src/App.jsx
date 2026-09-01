import { useEffect, useState } from "react";

import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import Income from "./pages/Income";

import {
    getExpenses,
    createExpense,
    updateExpense,
    deleteExpense
} from "./api/expense.api";

import {
    getIncomes,
    createIncome,
    updateIncome,
    deleteIncome
} from "./api/income.api";

function App() {

    const [expenses, setExpenses] = useState([]);

    const [incomes, setIncomes] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

    const loadData = async () => {

        try {

            const [expenseResponse, incomeResponse] =
                await Promise.all([
                    getExpenses(),
                    getIncomes()
                ]);

            setExpenses(expenseResponse.data);
            setIncomes(incomeResponse.data);

        } catch (error) {

            console.error(
                "Failed to fetch data:",
                error
            );

        } finally {

            setLoading(false);

        }
    };

    loadData();

}, []);

    const handleAddExpense = async (expense) => {

        try {

            const response = await createExpense(expense);

            setExpenses((previousExpenses) => [
                ...previousExpenses,
                response.data.expense
            ]);

        } catch (error) {

            console.error(
                "Failed to create expense:",
                error
            );

        }
    };

    const handleUpdateExpense = async (id, expense) => {

        try {

            const response = await updateExpense(
                id,
                expense
            );

            setExpenses((previousExpenses) =>
                previousExpenses.map((item) =>
                    item.id === id
                        ? response.data.expense
                        : item
                )
            );

        } catch (error) {

            console.error(
                "Failed to update expense:",
                error
            );

        }
    };

    const handleDeleteExpense = async (id) => {

        try {

            await deleteExpense(id);

            setExpenses((previousExpenses) =>
                previousExpenses.filter(
                    (expense) => expense.id !== id
                )
            );

        } catch (error) {

            console.error(
                "Failed to delete expense:",
                error
            );

        }
    };

    const handleAddIncome = async (income) => {

    try {

        const response = await createIncome(income);

        setIncomes((previousIncomes) => [
            ...previousIncomes,
            response.data.income
        ]);

    } catch (error) {

        console.error(
            "Failed to create income:",
            error
        );

    }
    };

    const handleUpdateIncome = async (id, income) => {

    try {

        const response = await updateIncome(
            id,
            income
        );

        setIncomes((previousIncomes) =>
            previousIncomes.map((item) =>
                item.id === id
                    ? response.data.income
                    : item
            )
        );

    } catch (error) {

        console.error(
            "Failed to update income:",
            error
        );

    }
    };

    const handleDeleteIncome = async (id) => {

    try {

        await deleteIncome(id);

        setIncomes((previousIncomes) =>
            previousIncomes.filter(
                (income) => income.id !== id
            )
        );

    } catch (error) {

        console.error(
            "Failed to delete income:",
            error
        );

    }
    };

    if (loading) {
        return <h2>Loading expenses...</h2>;
    }

    return (
        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={
                        <Dashboard
                            expenses={expenses}
                            incomes={incomes}
                            onAddExpense={handleAddExpense}
                            onUpdateExpense={handleUpdateExpense}
                            onDeleteExpense={handleDeleteExpense}
                        />
                    }
                />

                <Route
                    path="/expenses"
                    element={
                        <Expenses
                            expenses={expenses}
                            onAddExpense={handleAddExpense}
                            onUpdateExpense={handleUpdateExpense}
                            onDeleteExpense={handleDeleteExpense}
                        />
                    }
                />

                <Route
                    path="/income"
                    element={
                        <Income
                            incomes={incomes}
                            onAddIncome={handleAddIncome}
                            onUpdateIncome={handleUpdateIncome}
                            onDeleteIncome={handleDeleteIncome}
                        />
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;
