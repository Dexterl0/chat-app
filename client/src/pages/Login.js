import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const navigate = useNavigate();

    const { getUser } = useContext(AuthContext);

    const login = async () => {
        try {
            { /* Create loginData object from the submitted email and password */ }
            const loginData = {
                email,
                password
            };

            { /* Send loginData to authenticate login */ }
            const res = await fetch(`${process.env.REACT_APP_URL}/api/user/login`,
                {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(loginData)
                });

            const resJson = await res.json();

            if (resJson.error) {
                setError(resJson.error);
            } else {
                { /* If Successful, check user is logged in and redirect to chat page */ }
                await getUser();
                navigate('/chat');
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="login">
            <div className="login-container">
                <div className="login-top">
                    <span className="material-symbols-outlined logo">
                        hive
                    </span>
                </div>
                <div className="login-bottom">
                    <h1 className="login-title">Login</h1>
                    <div className="login-error">{error}</div>
                    <form className="login-form" onSubmit={(e) => { e.preventDefault(); login(); }}>
                        <input className="login-email" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} />
                        <input className="login-password" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
                        <button className="login-button" type="submit">Login</button>
                        <span className="material-symbols-outlined login-back" onClick={() => navigate('/')}>
                            arrow_back
                        </span>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login