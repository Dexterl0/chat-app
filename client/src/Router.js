import React, { useContext } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { io } from 'socket.io-client'
import Homepage from './pages/Homepage'
import Chat from './pages/Chat'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AuthContext from './context/AuthContext'

const socket = io('http://localhost:5000');

const Router = () => {

    const { userId } = useContext(AuthContext);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={userId ? (<Navigate replace to="/chat" />) : (<Homepage />)} />
                <Route path="chat" element={!userId ? (<Navigate replace to="/" />) : (<Chat />)} />
                <Route path="login" element={userId ? (<Navigate replace to="/chat" />) : (<Login />)} />
                <Route path="signup" element={userId ? (<Navigate replace to="/chat" />) : (<Signup />)} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router