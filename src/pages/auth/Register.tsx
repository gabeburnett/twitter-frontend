import React, { useState } from 'react';
import './styles.scss';
import { GiKiwiBird } from 'react-icons/gi';
import { MdError } from 'react-icons/md';

/**
 * Represents the register page. Handles input field validation and register request.
 */
const Register = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    
    /**
     * Validates input fields, then makes a register request.
     */
    const onRegisterClick = () => {
        if (email.length < 3 || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test(email)) {
            setError("Enter a valid email.");
        } else if (password.length < 6) {
            setError("Passwords must be at least 6 characters long.");
        } else if (password !== confirmPassword) {
            setError("Passwords don't match.");
        } else {
            fetch("http://localhost:3000/api/auth/register", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Accept": "*",
                    "Content-Type": "application/json; charset=utf-8" },
                body: JSON.stringify({ email, username, password })
            })
            .then((res) => {
                if (res.status === 200) {
                    window.location.href = "/login";
                } else if (res.status === 400) {
                    res.json().then((body) => setError(body.error));
                } else {
                    setError("Uh oh, something isn't working..");
                }
            })
            .catch((err) => {
                console.log(err);
                setError("Unable to connect.");
            });
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-panel">
                <div className="auth-header">
                    <GiKiwiBird/>
                    <span>Twitter Clone</span>
                </div>
                {error.length > 0 &&
                    <div className="auth-error">
                        <MdError/>
                        <span>{error}</span>
                    </div>
                }
                <input type="text" className="input-form" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)}/>
                <input type="text" className="input-form" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)}/>
                <input type="text" className="input-form" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
                <input type="text" className="input-form" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>
                <div className="auth-btns">
                    <button className="btn" onClick={() => onRegisterClick()}>Create Account</button>
                </div>
            </div>
        </div>
    );
}

export default Register;