import React from 'react'
import UserIcon from './UserIcon'
import ChatMessage from './ChatMessage'

const ChatMain = ({ chatVisible, setChatVisible }) => {
    return (
        <div className={chatVisible ? "chat visible" : "chat"}>
            <div className="chat-top">
                <div className="chat-user-icon">
                    <UserIcon />
                </div>
                <p className="chat-name">John Smith</p>
                <span class={chatVisible ? "material-symbols-outlined chat-back" : "material-symbols-outlined chat-back not-visible"} onClick={() => setChatVisible(false)}>
                    arrow_back
                </span>
            </div>
            <div className="chat-middle">
                <ChatMessage isUser={false} />
                <ChatMessage isUser={false} />
                <ChatMessage isUser={true} />
                <ChatMessage isUser={false} />
                <ChatMessage isUser={true} />
                <ChatMessage isUser={false} />
                <ChatMessage isUser={true} />
                <ChatMessage isUser={false} />
                <ChatMessage isUser={true} />
            </div>
            <div className="chat-bottom">
                <form className="chat-form">
                    <textarea className="chat-textarea" placeholder="Type your message..."></textarea>
                    <button className="chat-send-button"><span className="material-symbols-outlined">
                        send
                    </span></button>
                </form>
            </div>
        </div>
    )
}

export default ChatMain