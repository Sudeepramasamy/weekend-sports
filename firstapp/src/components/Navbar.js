import React from 'react'
import { Link } from 'react-router-dom';
import './Navbar.css'



function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg ">
      <Link className="navbar-brand" to="/home">Sports Wekkend</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <Link className="nav-item nav-link" to="/">Home</Link>
          <Link className="nav-item nav-link" to="/turf">Turfs</Link>
          <Link className="nav-item nav-link" to="/contact">Contact</Link>
          <Link className="nav-item nav-link " to="/login">Login</Link>
          <Link className="nav-item nav-link " to="/register">Register</Link>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;