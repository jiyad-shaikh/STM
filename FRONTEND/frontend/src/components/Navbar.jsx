import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar">

            <div className="logo">
                <Link to="/">
                    Expense Tracker
                </Link>
            </div>

            <div className="nav-links">

                <Link to="/">
                    Dashboard
                </Link>

                <Link to="/expenses">
                    Expenses
                </Link>

                <Link to="/income">
                    Income
                </Link>

            </div>

        </nav>
    );
}

export default Navbar;