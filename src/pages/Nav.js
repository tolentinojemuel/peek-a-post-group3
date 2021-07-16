import React, { useState } from "react";
import { auth } from "../utils/firebase";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import "../styles/Nav.css";

export default function Nav({ user }) {
  const [navbar, setNavbar] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 20) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  window.addEventListener("scroll", changeBackground);
  return (
    <nav className={navbar ? "homeHeader active" : "homeHeader"}>
      <div className="logoContainer">
        <Link to="/">
          <div className="logo1Container">
            <img
              className="logoImage"
              src="../images/logo.png"
              alt="LOGO HERE"
            />
          </div>
        </Link>
        <div className="logo2Container">
          <h2 className="logoText">Peek a Post</h2>
        </div>
        <div className="drop-down">
          <ul className="ul-list"></ul>
        </div>
      </div>

      <div className="button-left">
        <div className="links">
        <ul>
          <li>
            <Link  to="/" className="a-link">Home</Link>
          </li>
          <li>
            <Link to="/profile" className="a-link">Profile</Link>
          </li>
        </ul>
        <div className="logoutButton-container">
        <Button onClick={() => auth.signOut()} className="logout-button">Logout</Button>
        </div>
      </div>
      </div>
    </nav>
  );
}
