import { useState } from "react";
import axios from "axios";

import { emailVali, passVali, passMatch, userVali, dobVali } from '../../util/formValidation.js';

function AccountCreationForm({ created }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [dob, setDoB] = useState()
    const [error, setError] = useState([null, null, null, null, null]);

    useState(() => { console.log(confirmPassword) }, [confirmPassword])
    // Submit button
    async function onSubmitHandler(e) {
        e.preventDefault();
        const emailRes = await emailVali(email);
        const userRes = await userVali(name);

        // Check Validation/Set errors
        const newError = error.map((err, i) => {
            if (i === 0) return (emailRes);
            if (i === 1) return (passVali(password));
            if (i === 2) return (passMatch(password, confirmPassword));
            if (i === 3) return (userRes);
            if (i === 4) return (dobVali(dob));
            return (null);
        });
        setError(newError);

        // Check if any errors exists
        let errors = false;
        newError.forEach((i) => { if (i !== null) errors = true; });
        if (errors) return;

        // Submit New Account
        const info = {
            email: email,
            password: password,
            userName: name,
            dob: dob
        }

        try {
            await axios.post('/accounts/createAccount', info)
                .then((res) => {
                    created();
                });
        } catch (err) {
            alert(err);
        }
    }

    return (<>
        <div className="page">
            <form className="formContainer centerDiv">
                <h1>Create Account!</h1>

                <label>Email:</label>
                <input
                    type="text"
                    placeholder='Enter Email'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <p className='errorMessage'>{error[0]}</p>


                <label>Password:</label>
                <input
                    type="password"
                    placeholder='Enter Password'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <p className='errorMessage'>{error[1]}</p>

                <label>Confirm Password:</label>
                <input
                    type="password"
                    placeholder='Confirm Email'
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                />
                <p className='errorMessage'>{error[2]}</p>

                <label>User Name:</label>
                <input
                    type="text"
                    placeholder='Enter User Name'
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
                <p className='errorMessage'>{error[3]}</p>

                <label>Date of Birth:</label><br />
                <input
                    type="date"
                    onChange={(e) => setDoB(e.target.value)}
                    min="1920-01-01"
                    max="2024-01-01"
                />
                <p className='errorMessage'>{error[4]}</p>

                <div className="formButtonContainer">
                    <button onClick={onSubmitHandler} className="button">Create</button>
                    <button type="reset" className="button cancel">Back</button>
                </div>
            </form>
        </div>
    </>);
}

export default AccountCreationForm;