import React, { useContext } from 'react'
import UserIcon from './UserIcon'
import AuthContext from '../context/AuthContext'

const ChatMessage = ({ m }) => {
    const { userId } = useContext(AuthContext);

    /* Check if the current user is also the sender */
    const isUser = m.senderId === userId ? true : false;

    /* Check if date is equal to current date, if so, return time, else return date  */
    const checkDay = (date1, date2) => {
        if (date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate()) {
            return new Date(m.createdAt).toLocaleString("en-GB", { timeStyle: "short" });
        } else {
            return new Date(m.createdAt).toLocaleString("en-GB", { dateStyle: "short" });
        }
    }

    const time = m ? checkDay(new Date(m.createdAt), new Date()) : null;

    return (
        <div className={isUser ? "chat-user-message" : "chat-message"}>
            <div className={isUser ? "chat-user-icon" : "chat-icon"}>
                <UserIcon />
            </div>
            <div className={isUser ? "chat-user-message-left" : "chat-message-right"}>
                <p className={isUser ? "chat-user-message-text" : "chat-message-text"}>{m.text}</p>
                <p className={isUser ? "chat-user-message-time" : "chat-message-time"}>{time}</p>
            </div>
        </div>
    )
}

export default ChatMessage