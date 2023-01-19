import React from 'react'

const Signup = () => {
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
          <form className="signup-form">
            <input className="signup-email" type="email" placeholder="Email" />
            <input className="signup-username" placeholder="Username" />
            <input className="signup-password" type="password" placeholder="Password" />
            <input className="signup-confirm" type="password" placeholder="Confirm Password" />
            <button className="signup-button">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup