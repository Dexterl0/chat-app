import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Chat from './pages/Chat'
import Login from './pages/Login'
import Signup from './pages/Signup'

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