import { useEffect, useState } from "react";
import '../styles/expenseForm.css';

function ExpenseForm({
    onAddExpense,
    onClose,
    editingExpense
}) {
    const [formData, setFormData] = useState({
        title: "",
        amount: "",
        category: "Food",
        date: "",
        description: ""
    });

    useEffect(() => {
        if (editingExpense) {
            setFormData({
                title: editingExpense.title,
                amount: editingExpense.amount,
                category: editingExpense.category,
                date: editingExpense.date,
                description: editingExpense.description || ""
            });
        } else {
            setFormData({
                title: "",
                amount: "",
                category: "Food",
                date: "",
                description: ""
            });
        }
    }, [editingExpense]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !formData.title ||
            !formData.amount ||
            !formData.date
        ) {
            return;
        }

        await onAddExpense({
            ...formData,
            amount: Number(formData.amount)
        });

        setFormData({
            title: "",
            amount: "",
            category: "Food",
            date: "",
            description: ""
        });

        onClose();
    };

    return (
        <div className="modal-overlay">

            <div className="expense-form">

                <div className="form-header">

                    <h2>
                        {editingExpense
                            ? "Edit Expense"
                            : "Add Expense"
                        }
                    </h2>

                    <button
                        type="button"
                        className="close-btn"
                        onClick={onClose}
                    >
                        ×
                    </button>

                </div>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label>Title</label>

                        <input
                            type="text"
                            name="title"
                            placeholder="e.g. Groceries"
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Amount</label>

                        <input
                            type="number"
                            name="amount"
                            placeholder="Enter amount"
                            value={formData.amount}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Category</label>

                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                        >
                            <option value="Food">Food</option>
                            <option value="Transport">Transport</option>
                            <option value="Shopping">Shopping</option>
                            <option value="Bills">Bills</option>
                            <option value="Entertainment">
                                Entertainment
                            </option>
                            <option value="Health">Health</option>
                            <option value="Education">Education</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Date</label>

                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Description</label>

                        <textarea
                            name="description"
                            placeholder="Optional description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>

                    <button
                        type="submit"
                        className="submit-btn"
                    >
                        {editingExpense
                            ? "Update Expense"
                            : "Add Expense"
                        }
                    </button>

                </form>

            </div>

        </div>
    );
}

export default ExpenseForm;
