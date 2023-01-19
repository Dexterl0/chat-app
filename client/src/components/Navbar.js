import React from 'react'

const Navbar = ({ chatVisible }) => {
    return (
        <div className={chatVisible ? "navbar not-visible" : "navbar"}>
            <div className="navbar-logo">
                <span className="material-symbols-outlined logo">
                    hive
                </span>
            </div>
            <ul className="navbar-list">
                <li>
                    <span className="material-symbols-outlined">
                        edit
                    </span>
                </li>
                <li>
                    <span className="material-symbols-outlined">
                        chat_bubble
                    </span>
                </li>
                <li>
                    <span className="material-symbols-outlined">
                        light_mode
                    </span>
                </li>
                <li>
                    <span className="material-symbols-outlined">
                        settings
                    </span>
                </li>
            </ul>
        </div>
    )
}

export default Navbar