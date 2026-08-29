import { useState } from "react";

function IncomeForm({ onAddIncome, onClose }) {
    const [formData, setFormData] = useState({
        source: "",
        amount: "",
        date: "",
        description: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.source || !formData.amount || !formData.date) {
            return;
        }

        onAddIncome({
            ...formData,
            amount: Number(formData.amount),
            id: Date.now()
        });

        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="expense-form">

                <div className="form-header">
                    <h2>Add Income</h2>

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
                        <label>Income Source</label>

                        <input
                            type="text"
                            name="source"
                            placeholder="e.g. Salary"
                            value={formData.source}
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
                        className="submit-btn income-submit-btn"
                    >
                        Add Income
                    </button>

                </form>

            </div>
        </div>
    );
}

export default IncomeForm;