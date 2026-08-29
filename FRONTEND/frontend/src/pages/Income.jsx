import { useState } from "react";

import IncomeForm from "../components/IncomeForm";
import IncomeList from "../components/IncomeList";
import Navbar from "../components/Navbar";

import "../styles/Income.css";

function Income() {
    const [incomes, setIncomes] = useState([]);

    const [showForm, setShowForm] = useState(false);

    const totalIncome = incomes.reduce(
        (total, income) => total + income.amount,
        0
    );

    const handleAddIncome = (income) => {
        setIncomes((previousIncomes) => [
            ...previousIncomes,
            income
        ]);
    };

    const handleDeleteIncome = (id) => {
        setIncomes((previousIncomes) =>
            previousIncomes.filter(
                (income) => income.id !== id
            )
        );
    };

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
                    onDelete={handleDeleteIncome}
                />

            </div>

            {showForm && (
                <IncomeForm
                    onAddIncome={handleAddIncome}
                    onClose={() => setShowForm(false)}
                />
            )}

        </div>
    );
}

export default Income;