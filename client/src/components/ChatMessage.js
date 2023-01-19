import React from 'react'
import UserIcon from './UserIcon'

const ChatMessage = ({ isUser }) => {
    return (
        <div className={isUser ? "chat-user-message" : "chat-message"}>
            <div className={isUser ? "chat-user-icon" : "chat-icon"}>
                <UserIcon />
            </div>
            <div className={isUser ? "chat-user-message-left" : "chat-message-right"}>
                <p className={isUser ? "chat-user-message-text" : "chat-message-text"}>Hey, Marshall! How are you? Can you please change the color theme of the website to pink and purple?</p>
                <p className={isUser ? "chat-user-message-time" : "chat-message-time"}>08:45 PM</p>
            </div>
        </div>
    )
}

export default ChatMessage