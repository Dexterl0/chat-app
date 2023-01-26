import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { url } from '../Url';

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const signup = async () => {
    try {
      const signupData = {
        username,
        email,
        password,
        confirmPassword
      };

      const res = await fetch(`${url}/api/user/signup`,
        {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(signupData)
        });

      const resJson = await res.json();

      if (resJson.error) {
        setError(resJson.error);
      } else {
        navigate('/chat');
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="signup">
      <div className="signup-container">
        <div className="signup-top">
          <span className="material-symbols-outlined logo">
            hive
          </span>
        </div>
        <div className="signup-bottom">
          <h1 className="signup-title">Sign Up</h1>
          <div className="signup-error">{error}</div>
          <form className="signup-form" onSubmit={(e) => { e.preventDefault(); signup(); }}>
            <input className="signup-email" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} />
            <input className="signup-username" placeholder="Username" onChange={(e) => setUsername(e.target.value)} value={username} />
            <input className="signup-password" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
            <input className="signup-confirm" type="password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} />
            <button className="signup-button" type="submit">Sign Up</button>
            <span className="material-symbols-outlined signup-back" onClick={() => navigate('/')}>
              arrow_back
            </span>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup