import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './styles.scss';
import { GiKiwiBird } from 'react-icons/gi';
import { MdError } from 'react-icons/md';

import Cookies from 'js-cookie';

/**
 * Represents the login page, checks input fields and makes a login request.
 */
const Login = () => {
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    
    /** Makes a login request and processes the response. */
    const onLoginClick = () => {
        if (email.length < 3 || password.length === 0) {
            setError("Fill out all fields.");
        } else {
            fetch("http://localhost:3000/api/auth/login", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Accept": "*",
                    "Content-Type": "application/json; charset=utf-8" },
                body: JSON.stringify({ email, password })
            })
            .then((res) => {
                if (res.status === 200) {
                    history.push("/");
                } else {
                    setError("Invalid email or password.");
                }
            })
            .catch((err) => {
                console.log(err);
                setError("Unable to connect.");
            });
        }
    }

    const logout = () => {
        fetch("http://localhost:3000/api/auth/logout", {
            method: "GET",
            credentials: "include",
            headers: {
                "Accept": "*",
                "Authorization": "Bearer " + Cookies.get("jwtToken"),
                "Content-Type": "application/json; charset=utf-8"
            }
        })
        .then((res) => res.text())
        .then((txt) => console.log(txt))
        .catch((err) => {
            console.log(err);
        });
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
                <input type="text" className="input-form" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
                <div className="auth-btns">
                    <button className="btn" onClick={() => onLoginClick()}>Login</button>
                    <a href="/register" className="btn">Register</a>
                </div>
            </div>
        </div>
    );
}

export default Login;