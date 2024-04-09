function LogInPopUp({ toggle }) {
    return (<>
        <div className="formPopUp">
            <form className="formContainer">
                <h1 className="h1OR">Login</h1><br />

                <label><b>Email</b></label>
                <input type="text" placeholder="Enter Email" name="email" required />

                <label><b>Password</b></label>
                <input type="password" placeholder="Enter Password" name="psw" required />

                <button type="submit" className="btn">Login</button>
                <button type="button" className="btn cancel" onClick={toggle}>Close</button>
            </form>
        </div>
    </>);
}

export default LogInPopUp;