import { useState } from "react";

import IncomeForm from "../components/IncomeForm";
import IncomeList from "../components/IncomeList";
import Navbar from "../components/Navbar";

import "../styles/Income.css";

function Income({
    incomes,
    onAddIncome,
    onUpdateIncome,
    onDeleteIncome
}) {
    

    const [showForm, setShowForm] = useState(false);

    const totalIncome = incomes.reduce(
        (total, income) => total + income.amount,
        0
    );

    return (
        <div className="income-page">

            <Navbar />

            <div className="income-header">

                <div>
                    <h1>Income</h1>

                    <p>
                        Manage all your sources of income.
                    </p>
                </div>

                <button
                    className="add-income-btn"
                    onClick={() => setShowForm(true)}
                >
                    + Add Income
                </button>

            </div>

            <div className="income-summary">

                <span>Total Income</span>

                <h2>
                    ₹{totalIncome}
                </h2>

            </div>

            <div className="income-container">

                <IncomeList
                    incomes={incomes}
                    onDelete={onDeleteIncome}
                />

            </div>

            {showForm && (
                <IncomeForm
                    onAddIncome={onAddIncome}
                    onClose={() => setShowForm(false)}
                />
            )}

        </div>
    );
}

export default Income;