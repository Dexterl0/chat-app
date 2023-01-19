import React from 'react'
import UserIcon from './UserIcon'

const ChatPreview = ({ setChatVisible }) => {
    return (
        <li className="chat-list-item" onClick={() => setChatVisible(true)}>
            <div className="chat-preview-left">
                <UserIcon />
            </div>
            <div className="chat-preview-right">
                <div className="chat-preview-top">
                    <p className="chat-preview-name">John Smith</p>
                    <p className="chat-preview-time">08:45 PM</p>
                </div>
                <div className="chat-preview-bottom">
                    <p className="chat-preview-text">Hello! Yeah, I'm going to meet a friend of mine at the department store.</p>
                    <span className="chat-preview-unread">
                        3
                    </span>
                </div>
            </div>
        </li>
    )
}

export default ChatPreview