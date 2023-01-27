import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { io } from 'socket.io-client'
import Homepage from './pages/Homepage'
import Chat from './pages/Chat'
import Login from './pages/Login'
import Signup from './pages/Signup'

const socket = io('http://localhost:5000');

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="chat" element={<Chat />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router