function ExpenseItem({ expense, onDelete, onEdit }) {
    return (
        <div className="expense-item">

            <div className="expense-info">

                <div className="expense-icon">
                    {expense.category.charAt(0)}
                </div>

                <div>
                    <h3>{expense.title}</h3>

                    <p>
                        {expense.category} • {expense.date}
                    </p>

                    {expense.description && (
                        <small>{expense.description}</small>
                    )}
                </div>

            </div>

            <div className="expense-actions">

                <strong>
                    - ₹{expense.amount}
                </strong>

                <button
                    onClick={() => onEdit(expense)}
                >
                    Edit
                </button>

                <button
                    onClick={() => onDelete(expense.id)}
                >
                    Delete
                </button>

            </div>

        </div>
    );
}

export default ExpenseItem;