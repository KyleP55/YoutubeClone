import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

import VideoPreview from '../components/ui/VideoPreview';
import SideNav from '../components/ui/SideNav';

import { emailVali, passVali, passMatch, userVali } from '../util/formValidation';

function CreateAccountPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState([null, null, null, null]);

    // Submit button
    async function onSubmitHandler(e) {
        e.preventDefault();
        const emailRes = await emailVali(email);
        const userRes = await userVali(name);

        const newError = error.map((err, i) => {
            if (i === 0) return (emailRes);
            if (i === 1) return (passVali(password));
            if (i === 2) return (passMatch(password, confirmPassword));
            if (i === 3) return (userRes);
        });
        setError(newError);
    }

    return (<>
        <SideNav />
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
                    type="text"
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

                {error && <p>{error}</p>}
                <div className="formButtonContainer">
                    <button onClick={onSubmitHandler} className="button">Create</button>
                    <button type="reset" className="button cancel">Back</button>
                </div>
            </form>
        </div>
    </>);
}

export default CreateAccountPage;