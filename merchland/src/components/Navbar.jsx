import React from "react";
import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      {/* Logo Section */}
      <div className="logo">
        <h1>Merchland</h1>
      </div>

      {/* Navigation Section */}
      <nav className="nav-container">
        <div className="all-buttons">
          <ul className="nav-buttons">
            {/* Dropdown Menu */}
            <li className="menu-dropdown">
              <a href="#menu" className="menu-btn">Menu</a>
              <ul className="dropdown-content">
                <li className="dropdown-buttons" ><a href="#home">Home</a></li>
                <li className="dropdown-buttons" ><a href="#about">About</a></li>
                <li className="dropdown-buttons" ><a href="#stores">Stores</a></li>
                <li className="dropdown-buttons" ><a href="#categories">Categories</a></li>
                <li className="dropdown-buttons" ><a href="#contact">Contact</a></li>
              </ul>
            </li>
            <li className="nav-item"><a href="#home">Home</a></li>
            <li className="nav-item"><a href="#about">About</a></li>
            <li className="nav-item"><a href="#stores">Stores</a></li>
            <li className="nav-item"><a href="#categories">Categories</a></li>
            <li className="nav-item"><a href="#contact">Contact</a></li>
          </ul>
        </div>

        {/* Search Bar and Cart */}
        <div className="search-cart">
          <input type="text" placeholder="Search..." className="search-bar" />
          <button className="cart-button">
            <i className="fas fa-shopping-cart"></i> Cart
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
