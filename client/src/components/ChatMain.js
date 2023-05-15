import React, { useState, useEffect, useContext } from 'react'
import UserIcon from './UserIcon'
import ChatMessage from './ChatMessage'
import AuthContext from '../context/AuthContext'
// import socket from '../socket'

const ChatMain = ({ chatVisible, setChatVisible, currentChat, setCurrentChat, messages, setMessages, newMessage, setNewMessage, newChat, setNewChat, chats, setChats, newChatTabOpen, setNewChatTabOpen, setNavbarActive, socket }) => {
    const { username, userId } = useContext(AuthContext);
    /* If there is a currentChat property, find the username that is not equal to the current user and store in name variable.
    Otherwise name should be an empty string */
    const name = currentChat ? currentChat.usernames.find((u) => u !== username) : newChat ? newChat.username : "";
    const receiverId = currentChat ? currentChat.userIds.find((u) => u !== userId) : newChat ? newChat.id : null;

    /* Get the messages associated with the current chat */
    const getMessages = async () => {
        const res = await fetch(`${process.env.REACT_APP_URL}/api/message/${currentChat._id}`);
        const resJson = await res.json();
        setMessages(resJson);
    }

    const sendMessage = async () => {
        if (newMessage) {
            try {
                const messageData = {
                    chatId: currentChat._id,
                    senderId: userId,
                    username,
                    text: newMessage
                };

                const res = await fetch(`${process.env.REACT_APP_URL}/api/message/`,
                    {
                        method: 'POST',
                        credentials: 'include',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(messageData)
                    });

                const resJson = await res.json();

                setNewMessage("");
                setMessages([resJson, ...messages]);
                if (newChatTabOpen) {
                    setNewChatTabOpen(false);
                    setNavbarActive("chats");
                }

                /* Emit Socket Io message event */
                socket.emit("message", {
                    data: resJson,
                    to: receiverId,
                });
            } catch (err) {
                console.error(err);
            }
        }
    };

    const createNewChat = async () => {
        try {
            const userData = {
                senderId: userId,
                receiverId: newChat.id
            };
            const chatRes = await fetch(`${process.env.REACT_APP_URL}/api/chat/`,
                {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(userData)
                });
            const chatResJson = await chatRes.json();
            setCurrentChat(chatResJson);
            setNewChat(null);
            setChats([...chats, chatResJson]);
            setNewChatTabOpen(false);
            setNavbarActive("chats")
        } catch (err) {
            console.error(err);
        }
    };

    /* If there is a current chat, send message. If there is not an existing chat, create a new chat, then send message */
    const handleClick = (e) => {
        e.preventDefault();
        if (currentChat) {
            sendMessage();
        } else if (newChat) {
            createNewChat();
        }
    }

    /* Function that submits the new message when enter is pressed and allows shift + enter to create a line break */
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            handleClick(e);
        }
    };

    /* If there is a currentChat property, call the getMessages function */
    useEffect(() => {
        setMessages([]);
        if (currentChat) {
            getMessages();
        }
    }, [currentChat]);

    /* After a new chat has been created call send message to it */
    useEffect(() => {
        sendMessage();
    }, [currentChat]);

    return (
        <div className={chatVisible ? "chat visible" : "chat"}>
            <div className="chat-top">
                <div className="chat-user-icon">
                    <UserIcon />
                </div>
                <p className="chat-name">{name}</p>
                <span className={chatVisible ? "material-symbols-outlined chat-back" : "material-symbols-outlined chat-back not-visible"} onClick={() => setChatVisible(false)}>
                    arrow_back
                </span>
            </div>
            <div className="chat-middle">
                {messages.map((m) => (<ChatMessage key={m._id} m={m} />))}
            </div>
            <div className="chat-bottom">
                <form className="chat-form">
                    <textarea className="chat-textarea" placeholder="Type your message..." onChange={(e) => setNewMessage(e.target.value)} value={newMessage} onKeyDown={handleKeyDown}></textarea>
                    <button className="chat-send-button" onClick={(e) => { handleClick(e) }}><span className="material-symbols-outlined">
                        send
                    </span></button>
                </form>
            </div>
        </div>
    )
}

export default ChatMain