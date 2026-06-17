import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "../styles/Navbar.scss";

const Navbar = ({ isLoggedIn, handleLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" onClick={closeMenu}>
          RecipeRevive
        </Link>
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      <div className={`navbar-menu ${menuOpen ? "active" : ""}`}>
        <ul>
          <li>
            <Link to="/" onClick={closeMenu}>
              Home
            </Link>
          </li>

          {isLoggedIn && (
            <>
              <li>
                <Link to="/recipe-search" onClick={closeMenu}>
                  Recipe Search
                </Link>
              </li>

              <li>
                <Link to="/nutrition-info" onClick={closeMenu}>
                  Nutrition Info
                </Link>
              </li>

              <li>
                <Link to="/reminder" onClick={closeMenu}>
                  Expiration Reminder
                </Link>
              </li>
            </>
          )}

          {!isLoggedIn ? (
            <>
              <li>
                <Link to="/login" onClick={closeMenu}>
                  Login
                </Link>
              </li>

              <li>
                <Link to="/signup" onClick={closeMenu}>
                  Signup
                </Link>
              </li>
            </>
          ) : (
            <li>
              <button
                className="logout-button"
                onClick={() => {
                  handleLogout();
                  closeMenu();
                }}
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
