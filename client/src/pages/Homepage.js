import React from 'react'
import { useNavigate } from 'react-router-dom'

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage">
      <div className="homepage-container">
        <div className="homepage-top">
          <span className="material-symbols-outlined logo">
            hive
          </span>
        </div>
        <div className="homepage-bottom">
          <h1 className="homepage-title">Chat App</h1>
          <button className="homepage-button" onClick={() => navigate('/login')}>Login</button>
          <button className="homepage-button" onClick={() => navigate('/signup')}>Sign Up</button>
        </div>
      </div>
    </div>
  )
}

export default Homepage