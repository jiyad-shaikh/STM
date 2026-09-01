function SummaryCards({
    totalBalance,
    totalIncome,
    totalExpenses
}) {

    return (
        <div className="summary-cards">

            <div className="summary-card">

                <span>Total Balance</span>

                <h2>
                    ₹{totalBalance}
                </h2>

            </div>


            <div className="summary-card">

                <span>Total Income</span>

                <h2>
                    ₹{totalIncome}
                </h2>

            </div>


            <div className="summary-card">

                <span>Total Expenses</span>

                <h2>
                    ₹{totalExpenses}
                </h2>

            </div>

        </div>
    );
}

export default SummaryCards;

