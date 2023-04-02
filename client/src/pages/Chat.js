import React, { useState, useEffect, useContext } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import ChatMain from '../components/ChatMain'
import { url } from '../Url'
import AuthContext from '../context/AuthContext'
// import socket from '../socket'

const Chat = ({ socket }) => {
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
    const [navbarActive, setNavbarActive] = useState("chats");

    const { userId } = useContext(AuthContext);

    // Get all users & current users chats
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

    useEffect(() => {
        getChats();
        getUsers();
    }, [userId]);

    // Socket IO Message event listener
    useEffect(() => {
        socket.on("message", ({ data, from }) => {
            if (currentChat && currentChat.userIds.includes(from)) {
                setMessages([data, ...messages]);
            }
            getChats();
        });

        return () => {
            socket.off("message");
        }
    }, [currentChat, messages]);

    return (
        <div className="chat-container">
            <Navbar
                chatVisible={chatVisible}
                setNewChatTabOpen={setNewChatTabOpen}
                setSettingsTabOpen={setSettingsTabOpen}
                settingsTabOpen={settingsTabOpen}
                navbarActive={navbarActive}
                setNavbarActive={setNavbarActive}
            />
            <Sidebar
                chatVisible={chatVisible}
                setChatVisible={setChatVisible}
                newChatTabOpen={newChatTabOpen}
                setNewChatTabOpen={setNewChatTabOpen}
                settingsTabOpen={settingsTabOpen}
                searchFilter={searchFilter}
                setSearchFilter={setSearchFilter}
                chats={chats}
                userList={userList}
                currentChat={currentChat}
                setCurrentChat={setCurrentChat}
                setNewChat={setNewChat}
                messages={messages}
                setNavbarActive={setNavbarActive}
                getChats={getChats}
                socket={socket}
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
                newChatTabOpen={newChatTabOpen}
                setNewChatTabOpen={setNewChatTabOpen}
                setNavbarActive={setNavbarActive}
                socket={socket}
            />
        </div>
    )
}

export default Chat