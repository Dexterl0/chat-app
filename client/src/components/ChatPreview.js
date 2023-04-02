import React, { useState, useContext, useEffect } from 'react'
import UserIcon from './UserIcon'
import AuthContext from '../context/AuthContext'
import { url } from '../Url'

const ChatPreview = ({ setChatVisible, chat, user, currentChat, setCurrentChat, setNewChat, chats, messages, newChatTabOpen, setNewChatTabOpen, setNavbarActive, getChats, setOtherUser, socket }) => {
    const [recentMessage, setRecentMessage] = useState();
    const [unread, setUnread] = useState(false);

    const { username, userId } = useContext(AuthContext);

    /* If chat property exists, set name to the username of the other user
    If it does not exist, set to the username from the user property */
    const name = chat ? chat.usernames.filter((u) => u !== username) : user.username;

    /* Check if date is equal to current date, if so, return time, else return date  */
    const checkDay = (date1, date2) => {
        if (date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate()) {
            return new Date(chat.createdAt).toLocaleString("en-GB", { timeStyle: "short" });
        } else {
            return new Date(chat.createdAt).toLocaleString("en-GB", { dateStyle: "short" });
        }
    }

    const time = chat ? checkDay(new Date(chat.updatedAt), new Date()) : null;

    /* Update users unread property in database */
    const setHasRead = async () => {
        try {
            const hasReadData = {
                chatId: chat._id,
                userId
            };

            const res = await fetch(`${url}/api/chat/setHasRead`,
                {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(hasReadData)
                });
            const resJson = await res.json();
            const read = resJson.updatedChat.hasRead.find((u) => u.userId.toString() === userId);
            setUnread(read.unread);
            getChats();
        } catch (err) {
            console.error(err);
        }
    };

    const handleClick = () => {
        setChatVisible(true);
        setUnread(false);
        /* If chat property exists, set the currentChat to chat, setNewChat to null and call setHasRead */
        if (chat) {
            setCurrentChat(chat); setNewChat(null); setHasRead();
        }
        /* If chat property does not exist and there is an existing chat which includes the other users ID, set the current chat to the existing chat */
        else if (chats.find((c) => c.userIds.includes(user._id))) {
            setCurrentChat(chats.find((c) => c.userIds.includes(user._id)));
        }
        /* Otherwise pass the other users data to the newChat state and set current chat to null */
        else { setNewChat({ id: user._id, username: user.username }); setCurrentChat(null) }
    };

    useEffect(() => {
        /* If chat property exists, retrieve the most recent message from the chat and store in recentMessage state */
        if (chat) {
            setRecentMessage(chat.messages[chat.messages.length - 1]);
            /* If there is a chat property, find the users hasRead property and set it to the unread state */
            const currentUser = chat.hasRead.find((u) => u.userId.toString() === userId);
            setUnread(currentUser.unread);
        };
        /* If messages property exists and length is more than 0, check if the messages chat ID equals this chats chat ID.
        If it does, set recent messsage to the most recent message in the messages array */
        if (messages && messages.length > 0) {
            if (messages[0].chatId === chat._id) {
                setRecentMessage(messages[0]);
            }
        }
    }, [chat, messages]);

    /* If chat property does not exist give time a className of "not-visible" and text the default message */
    /* When the ChatPreview li element is clicked, set the unread state to false and run the setHasRead function */
    return (
        <li className="chat-list-item" onClick={() => { handleClick(); }}>
            <div className="chat-preview-left">
                <UserIcon />
            </div>
            <div className="chat-preview-right">
                <div className="chat-preview-top">
                    <p className="chat-preview-name">{name}</p>
                    <p className={chat ? "chat-preview-time" : "chat-preview-time not-visible-main"}>{time}</p>
                </div>
                <div className="chat-preview-bottom">
                    <p className="chat-preview-text">{recentMessage ? recentMessage.text : `Send a message to ${name}`}</p>
                    {/* If chat property exists, check if unread state is true or false
                    If unread state is false, give className of not-visible-main
                    If chat property does not exist, give className of not-visible-main */}
                    <span className={chat ? unread ? "chat-preview-unread" : "chat-preview-unread not-visible-main" : "chat-preview-unread not-visible-main"}>
                    </span>
                </div>
            </div>
        </li>
    )
}

export default ChatPreview