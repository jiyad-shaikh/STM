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

function App() {

    const [expenses, setExpenses] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadExpenses = async () => {

            try {
                const response = await getExpenses();

                setExpenses(response.data);

            } catch (error) {
                console.error(
                    "Failed to fetch expenses:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        loadExpenses();

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
                    element={<Income />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;
