import React from 'react'

const Homepage = () => {
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
            <button className="homepage-button">Login</button>
            <button className="homepage-button">Sign Up</button>
        </div>
      </div>
    </div>
  )
}

export default Homepage