function IncomeList({ incomes, onDelete }) {
    if (incomes.length === 0) {
        return (
            <div className="empty-state">
                <h3>No income added</h3>
                <p>Add your income to track your balance.</p>
            </div>
        );
    }

    return (
        <div className="income-list">

            {incomes.map((income) => (
                <div
                    className="income-item"
                    key={income.id}
                >
                    <div className="income-info">

                        <div className="income-icon">
                            ₹
                        </div>

                        <div>
                            <h3>{income.source}</h3>

                            <p>
                                {income.date}
                            </p>

                            {income.description && (
                                <small>
                                    {income.description}
                                </small>
                            )}
                        </div>

                    </div>

                    <div className="income-actions">

                        <strong>
                            + ₹{income.amount}
                        </strong>

                        <button
                            onClick={() =>
                                onDelete(income.id)
                            }
                        >
                            Delete
                        </button>

                    </div>
                </div>
            ))}

        </div>
    );
}

export default IncomeList;