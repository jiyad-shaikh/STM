
import { useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import SummaryCards from "../components/SummaryCards";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";

import "../styles/Dashboard.css";

function Dashboard({
    expenses,
    onAddExpense,
    onUpdateExpense,
    onDeleteExpense
}) {
    const [showForm, setShowForm] = useState(false);

    const totalExpenses = expenses.reduce(
        (total, expense) => total + Number(expense.amount),
        0
    );

    const totalIncome = 0;

    return (
        <div className="dashboard">

            <Navbar />

            <main className="dashboard-content">

                <header className="dashboard-header">

                    <div>
                        <h1>Dashboard</h1>

                        <p>
                            Track and manage your expenses.
                        </p>
                    </div>

                    <button
                        className="add-expense-btn"
                        onClick={() => setShowForm(true)}
                    >
                        + Add Expense
                    </button>

                </header>

                <SummaryCards
                    totalIncome={totalIncome}
                    totalExpenses={totalExpenses}
                />

                <section className="content-section">

                    <div className="section-header">

                        <h2>Recent Expenses</h2>

                        <Link to="/expenses">
                            View All
                        </Link>

                    </div>

                    <ExpenseList
                        expenses={expenses.slice(-5).reverse()}
                        category="All Categories"
                        onDelete={onDeleteExpense}
                        onEdit={(expense) => {
                            console.log(
                                "Edit from dashboard:",
                                expense
                            );
                        }}
                    />

                </section>

            </main>

            {showForm && (
                <ExpenseForm
                    onAddExpense={async (expense) => {
                        await onAddExpense(expense);
                        setShowForm(false);
                    }}
                    onClose={() => setShowForm(false)}
                    editingExpense={null}
                />
            )}

        </div>
    );
}

export default Dashboard;

