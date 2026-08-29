function SummaryCards({ totalIncome, totalExpenses }) {
    const balance = totalIncome - totalExpenses;

    return (
        <section className="summary-cards">

            <div className="summary-card">
                <span>Total Balance</span>
                <h2>₹{balance}</h2>
            </div>

            <div className="summary-card">
                <span>Total Income</span>
                <h2>₹{totalIncome}</h2>
            </div>

            <div className="summary-card">
                <span>Total Expenses</span>
                <h2>₹{totalExpenses}</h2>
            </div>

        </section>
    );
}

export default SummaryCards;