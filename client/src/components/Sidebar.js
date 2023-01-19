import React from 'react'
import ChatPreview from './ChatPreview'

const Sidebar = ({ chatVisible, setChatVisible }) => {
    return (
        <div className={chatVisible ? "sidebar not-visible" : "sidebar"}>
            <h1 className="sidebar-title">Chats</h1>

            <form className="searchbar">
                <div className="searchbar-icon"><span className="material-symbols-outlined">
                    search
                </span></div>
                <input className="searchbar-input" placeholder="Search messages or users" />
            </form>

            <ul className="chat-list">
                <ChatPreview setChatVisible={setChatVisible} />
                <ChatPreview setChatVisible={setChatVisible} />
                <ChatPreview setChatVisible={setChatVisible} />
                <ChatPreview setChatVisible={setChatVisible} />
                <ChatPreview setChatVisible={setChatVisible} />
                <ChatPreview setChatVisible={setChatVisible} />
            </ul>
        </div>
    )
}

export default Sidebar