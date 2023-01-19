import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import ChatMain from '../components/ChatMain'

const Chat = () => {
    const [chatVisible, setChatVisible] = useState(false);

    return (
        <div className="chat-container">
            <Navbar chatVisible={chatVisible} />
            <Sidebar chatVisible={chatVisible} setChatVisible={setChatVisible} />
            <ChatMain chatVisible={chatVisible} setChatVisible={setChatVisible} />
        </div>
    )
}

export default Chat