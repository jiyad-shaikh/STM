import ExpenseItem from "./ExpenseItem";
import '../styles/expenseList.css';

function ExpenseList({
    expenses,
    onDelete,
    onEdit,
    category
}) {

    const filteredExpenses =
        category === "All Categories"
            ? expenses
            : expenses.filter(
                expense => expense.category === category
            );

    if (filteredExpenses.length === 0) {
        return (
            <div className="empty-state">
                <h3>No expenses found</h3>
                <p>
                    Add an expense to start tracking your spending.
                </p>
            </div>
        );
    }

    return (
        <div className="expense-list">

            {filteredExpenses.map(expense => (
                <ExpenseItem
                    key={expense.id}
                    expense={expense}
                    onDelete={onDelete}
                    onEdit={onEdit}
                />
            ))}

        </div>
    );
}

export default ExpenseList;