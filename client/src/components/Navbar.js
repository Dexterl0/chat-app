import React, { useState } from 'react'

const Navbar = ({ chatVisible, setNewChatTabOpen, settingsTabOpen, setSettingsTabOpen, navbarActive, setNavbarActive }) => {

    return (
        <div className={chatVisible ? "navbar not-visible" : "navbar"}>
            <div className="navbar-logo">
                <span className="material-symbols-outlined logo">
                    hive
                </span>
            </div>
            <ul className="navbar-list">
                <li onClick={() => { setNewChatTabOpen(true); setSettingsTabOpen(false); setNavbarActive("new") }}>
                    <span className={navbarActive === "new" ? "material-symbols-outlined navbar-active" : "material-symbols-outlined"}>
                        add
                    </span>
                </li>
                <li onClick={() => { setNewChatTabOpen(false); setSettingsTabOpen(false); setNavbarActive("chats") }}>
                    <span className={navbarActive === "chats" ? "material-symbols-outlined navbar-active" : "material-symbols-outlined"}>
                        chat_bubble
                    </span>
                </li>
                <li onClick={() => {setSettingsTabOpen(!settingsTabOpen); setNavbarActive("settings")}}>
                    <span className={navbarActive === "settings" ? "material-symbols-outlined navbar-active" : "material-symbols-outlined"}>
                        settings
                    </span>
                </li>
            </ul>
        </div>
    )
}

export default Navbar