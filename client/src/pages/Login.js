import React from 'react'

const Login = () => {
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
                    <form className="login-form">
                        <input className="login-email" type="email" placeholder="Email" />
                        <input className="login-password" type="password" placeholder="Password" />
                        <button className="login-button">Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login