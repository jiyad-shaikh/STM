
import { useState } from "react";

import ExpenseForm from "../components/ExpenseForm";
import ExpenseItem from "../components/ExpenseItem";
import Navbar from "../components/Navbar";

import "../styles/Expenses.css";

function Expenses({
    expenses,
    onAddExpense,
    onUpdateExpense,
    onDeleteExpense
}) {
    const [showForm, setShowForm] = useState(false);

    const [search, setSearch] = useState("");

    const [category, setCategory] =
        useState("All Categories");

    const [editingExpense, setEditingExpense] =
        useState(null);

    const totalExpenses = expenses.reduce(
        (total, expense) => total + expense.amount,
        0
    );

    const handleSubmitExpense = async (expense) => {

        if (editingExpense) {

            await onUpdateExpense(
                editingExpense.id,
                expense
            );

        } else {

            await onAddExpense(expense);

        }

        setEditingExpense(null);
        setShowForm(false);
    };

    const handleDeleteExpense = async (id) => {
        await onDeleteExpense(id);
    };

    const handleEditExpense = (expense) => {
        setEditingExpense(expense);
        setShowForm(true);
    };

    const filteredExpenses = expenses.filter((expense) => {

        const matchesSearch =
            expense.title
                .toLowerCase()
                .includes(search.toLowerCase());

        const matchesCategory =
            category === "All Categories" ||
            expense.category === category;

        return matchesSearch && matchesCategory;
    });

    return (
        <div className="expenses-page">

            <Navbar />

            <div className="expenses-header">

                <div>
                    <h1>Expenses</h1>

                    <p>
                        Manage and track all your expenses.
                    </p>
                </div>

                <button
                    className="add-expense-btn"
                    onClick={() => {
                        setEditingExpense(null);
                        setShowForm(true);
                    }}
                >
                    + Add Expense
                </button>

            </div>

            <div className="expense-summary">

                <span>Total Expenses</span>

                <h2>
                    ₹{totalExpenses}
                </h2>

            </div>

            <div className="expense-controls">

                <input
                    type="text"
                    placeholder="Search expenses..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />

                <select
                    value={category}
                    onChange={(e) =>
                        setCategory(e.target.value)
                    }
                >
                    <option>All Categories</option>
                    <option>Food</option>
                    <option>Transport</option>
                    <option>Shopping</option>
                    <option>Bills</option>
                    <option>Entertainment</option>
                    <option>Health</option>
                    <option>Education</option>
                    <option>Other</option>
                </select>

            </div>

            <div className="expenses-container">

                {filteredExpenses.length === 0 ? (

                    <div className="empty-expenses">

                        <h2>No expenses found</h2>

                        <p>
                            {expenses.length === 0
                                ? "Add your first expense to start tracking."
                                : "Try changing your search or category filter."
                            }
                        </p>

                    </div>

                ) : (

                    filteredExpenses.map((expense) => (

                        <ExpenseItem
                            key={expense.id}
                            expense={expense}
                            onDelete={handleDeleteExpense}
                            onEdit={handleEditExpense}
                        />

                    ))

                )}

            </div>

            {showForm && (

                <ExpenseForm
                    onAddExpense={handleSubmitExpense}
                    onClose={() => {
                        setShowForm(false);
                        setEditingExpense(null);
                    }}
                    editingExpense={editingExpense}
                />

            )}

        </div>
    );
}

export default Expenses;
