import '../styles/expenseItem.css';

function ExpenseItem({
    expense,
    onDelete,
    onEdit
}) {

    return (
        <div className="expense-item">

            <div className="expense-info">

                <div className="expense-icon">
                    ₹
                </div>

                <div className="expense-details">

                    <h3>
                        {expense.title}
                    </h3>

                    <p>
                        {expense.date}
                    </p>

                    <span className="expense-category">
                        {expense.category}
                    </span>

                </div>

            </div>

            <div className="expense-right">

                <span className="expense-amount">
                    - ₹{expense.amount}
                </span>

                <div className="expense-actions">

                    <button
                        onClick={() =>
                            onEdit(expense)
                        }
                        title="Edit"
                    >
                        ✏️
                    </button>

                    <button
                        className="delete-btn"
                        onClick={() =>
                            onDelete(expense.id)
                        }
                        title="Delete"
                    >
                        🗑️
                    </button>

                </div>

            </div>

        </div>
    );
}

export default ExpenseItem;

