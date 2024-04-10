import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

import VideoPreview from '../components/ui/VideoPreview';
import SideNav from '../components/ui/SideNav';

function CreateAccountPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState();

    // Submit button
    function onSubmitHandler() {

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
                    onInput={setEmail}
                    value={email}
                />



                <label>Password:</label>
                <input
                    type="text"
                    placeholder='Enter Password'
                    onInput={setPassword}
                    value={password}
                />

                <label>Confirm Password:</label>
                <input
                    type="password"
                    placeholder='Confirm Email'
                    onInput={setConfirmPassword}
                    value={confirmPassword}
                />

                <label>User Name:</label>
                <input
                    type="text"
                    placeholder='Enter User Name'
                    onInput={setName}
                    value={name}
                />

                {error && <p>{error}</p>}
                <div className="formButtonContainer">
                    <button className="button">Create</button>
                    <button className="button cancel">Back</button>
                </div>
            </form>
        </div>
    </>);
}

export default CreateAccountPage;