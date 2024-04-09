import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { IoAddCircleOutline } from "react-icons/io5";

import logo from "../../images/logo.png";
import LogInPopUp from "./LogInPopUp";

function Header() {
    const [logInWindow, setLogInWindow] = useState(false);

    function toggleWindow() {
        if (logInWindow) {
            setLogInWindow(false);
        } else {
            setLogInWindow(true);
        }
    }

    useEffect(() => { console.log(logInWindow) }, [logInWindow])

    return (<>
        <div className="header">
            <div className="logo">
                <Link to='/'><img className="logoImage" src={logo} alt="Logo" /></Link>
            </div>
            <div className="navBar">

            </div>
            <div className="accountBars">
                {logInWindow && <LogInPopUp toggle={toggleWindow} />}
                <a onClick={toggleWindow} className="accountText">
                    Log In
                </a>
                <Link to="/createAccount" className="accountText">
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