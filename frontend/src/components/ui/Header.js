import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { IoAddCircleOutline } from "react-icons/io5";
import axios from "axios";

import logo from "../../images/logo.png";
import LogInPopUp from "./LogInPopUp";

import "../../css/header.css";

function Header() {
    const [logInWindow, setLogInWindow] = useState(false);

    function toggleWindow() {
        if (logInWindow) {
            setLogInWindow(false);
        } else {
            setLogInWindow(true);
        }
    }

    function submitHandler(email, password) {

    }

    return (<>
        <div className="header">
            <div className="logo">
                <Link to='/'><img className="logoImage" src={logo} alt="Logo" /></Link>
            </div>
            <div className="searchBar">

            </div>
            <div className="accountBars">
                {logInWindow && <LogInPopUp toggle={toggleWindow} submit={submitHandler} />}
                <a onClick={toggleWindow} className="accountText">
                    Log In
                </a>
                <Link to="/account/login" className="accountText">
                    Create Account
                </Link>
                <Link to="/upload">
                    <IoAddCircleOutline size="50px" />
                </Link>
            </div>
        </div>
        <Outlet />
    </>)
}

export default Header;