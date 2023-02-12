import React, { useState, useEffect, useContext } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import ChatMain from '../components/ChatMain'
import { url } from '../Url'
import AuthContext from '../context/AuthContext'
import { io } from 'socket.io-client'

const socket = io('http://localhost:3000', { autoConnect: false })

const Chat = () => {
    const [chatVisible, setChatVisible] = useState(false);
    const [chats, setChats] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [newChat, setNewChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [receivedMessage, setReceivedMessage] = useState(null);
    const [newChatTabOpen, setNewChatTabOpen] = useState(false);
    const [userList, setUserList] = useState([]);
    const [searchFilter, setSearchFilter] = useState("");
    const [settingsTabOpen, setSettingsTabOpen] = useState(false);

    const { userId } = useContext(AuthContext);

    // Get all users & current users chats
    useEffect(() => {
        const getChats = async () => {
            try {
                const res = await fetch(`${url}/api/chat/${userId}`);
                const resJson = await res.json();
                setChats(resJson);
            } catch (err) {
                console.error(err);
            }
        };
        const getUsers = async () => {
            try {
                const res = await fetch(`${url}/api/user/userlist/${userId}`);
                const resJson = await res.json();
                setUserList(resJson.users);
            } catch (err) {
                console.error(err);
            }
        };
        getChats();
        getUsers();
    }, [userId, chats]);

    return (
        <div className="chat-container">
            <Navbar
                chatVisible={chatVisible}
                setNewChatTabOpen={setNewChatTabOpen}
                setSettingsTabOpen={setSettingsTabOpen}
                settingsTabOpen={settingsTabOpen}
            />
            <Sidebar
                chatVisible={chatVisible}
                setChatVisible={setChatVisible}
                newChatTabOpen={newChatTabOpen}
                settingsTabOpen={settingsTabOpen}
                searchFilter={searchFilter}
                setSearchFilter={setSearchFilter}
                chats={chats}
                userList={userList}
                currentChat={currentChat}
                setCurrentChat={setCurrentChat}
                setNewChat={setNewChat}
                messages={messages}
            />
            <ChatMain
                chatVisible={chatVisible}
                setChatVisible={setChatVisible}
                currentChat={currentChat}
                setCurrentChat={setCurrentChat}
                messages={messages}
                setMessages={setMessages}
                newMessage={newMessage}
                setNewMessage={setNewMessage}
                newChat={newChat}
                setNewChat={setNewChat}
                chats={chats}
                setChats={setChats}
                setNewChatTabOpen={setNewChatTabOpen}
            />
        </div>
    )
}

export default Chat