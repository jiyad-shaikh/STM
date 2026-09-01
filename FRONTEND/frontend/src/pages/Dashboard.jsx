import { useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import SummaryCards from "../components/SummaryCards";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";

import "../styles/Dashboard.css";

function Dashboard({
    expenses = [],
    incomes = [],
    onAddExpense,
    onUpdateExpense,
    onDeleteExpense
}) {

    const [showForm, setShowForm] = useState(false);

    const [editingExpense, setEditingExpense] =
        useState(null);


    // =========================
    // CALCULATIONS
    // =========================

    const totalIncome = incomes.reduce(
        (total, income) =>
            total + Number(income.amount),
        0
    );

    const totalExpenses = expenses.reduce(
        (total, expense) =>
            total + Number(expense.amount),
        0
    );

    const totalBalance =
        totalIncome - totalExpenses;


    // =========================
    // ADD EXPENSE
    // =========================

    const handleAddExpense = async (expense) => {

        await onAddExpense(expense);

        setShowForm(false);
    };


    // =========================
    // EDIT EXPENSE
    // =========================

    const handleEditExpense = (expense) => {

        setEditingExpense(expense);

        setShowForm(true);
    };


    // =========================
    // CLOSE FORM
    // =========================

    const handleCloseForm = () => {

        setShowForm(false);

        setEditingExpense(null);
    };


    // =========================
    // SUBMIT FORM
    // =========================

    const handleSubmitExpense = async (expense) => {

        if (editingExpense) {

            await onUpdateExpense(
                editingExpense.id,
                expense
            );

        } else {

            await onAddExpense(expense);

        }

        setShowForm(false);

        setEditingExpense(null);
    };


    return (
        <div className="dashboard">

            <Navbar />

            <main className="dashboard-content">

                <header className="dashboard-header">

                    <div>

                        <h1>Dashboard</h1>

                        <p>
                            Track and manage your finances.
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

                </header>


                {/* SUMMARY */}

                <SummaryCards
                    totalBalance={totalBalance}
                    totalIncome={totalIncome}
                    totalExpenses={totalExpenses}
                />


                {/* RECENT EXPENSES */}

                <section className="content-section">

                    <div className="section-header">

                        <h2>
                            Recent Expenses
                        </h2>

                        <Link to="/expenses">
                            View All
                        </Link>

                    </div>


                    <ExpenseList

                        expenses={
                            expenses
                                .slice(-5)
                                .reverse()
                        }

                        category="All Categories"

                        onDelete={onDeleteExpense}

                        onEdit={handleEditExpense}

                    />

                </section>

            </main>


            {/* EXPENSE FORM */}

            {showForm && (

                <ExpenseForm

                    onAddExpense={
                        handleSubmitExpense
                    }

                    onClose={
                        handleCloseForm
                    }

                    editingExpense={
                        editingExpense
                    }

                />

            )}

        </div>
    );
}

export default Dashboard;

