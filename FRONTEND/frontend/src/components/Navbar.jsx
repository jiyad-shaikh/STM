import { NavLink } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
    return (
        <nav className="navbar">

            <div className="navbar-inner">

                <div className="logo">
                    <NavLink to="/">
                        <span>₹</span> Expense Tracker
                    </NavLink>
                </div>

                <div className="nav-links">

                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? "active" : ""
                        }
                    >
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/expenses"
                        className={({ isActive }) =>
                            isActive ? "active" : ""
                        }
                    >
                        Expenses
                    </NavLink>

                    <NavLink
                        to="/income"
                        className={({ isActive }) =>
                            isActive ? "active" : ""
                        }
                    >
                        Income
                    </NavLink>

                </div>

            </div>

        </nav>
    );
}

export default Navbar;