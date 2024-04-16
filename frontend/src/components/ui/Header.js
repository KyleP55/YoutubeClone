import { useState, useEffect, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { IoAddCircleOutline } from "react-icons/io5";
import axios from "axios";
import { UserContext } from "../../context/userContext";

import logo from "../../images/logo.png";
import LogInPopUp from "./LogInPopUp";

import "../../css/header.css";

function Header() {
    const userContext = useContext(UserContext);
    const [logInWindow, setLogInWindow] = useState(false);

    function toggleWindow() {
        if (logInWindow) {
            setLogInWindow(false);
        } else {
            setLogInWindow(true);
        }
    }

    const unauthed = <>
        {logInWindow && <LogInPopUp toggle={toggleWindow} />}
        <a onClick={toggleWindow} className="accountText">
            Log In
        </a>
        <Link to="/account/login" className="accountText">
            Create Account
        </Link>
        <Link to="/upload">
            <IoAddCircleOutline size="50px" />
        </Link>
    </>

    const authed = <>
        <p>Welcome Back {userContext.userName}!</p>
        <a onClick={console.log('todo')} className="accountText">
            Log Out
        </a>
        <Link to="/account/login" className="accountText">
            My Account
        </Link>
        <Link to="/upload">
            <IoAddCircleOutline size="50px" />
        </Link>
    </>

    return (<>
        <div className="header">
            <div className="logo">
                <Link to='/'><img className="logoImage" src={logo} alt="Logo" /></Link>
            </div>
            <div className="searchBar">

            </div>
            <div className="accountBars">
                {!userContext.id && unauthed}
                {userContext.id && authed}
            </div>
        </div>
        <Outlet />
    </>)
}

export default Header;