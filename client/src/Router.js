import React, { useEffect, useContext } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Chat from './pages/Chat'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AuthContext from './context/AuthContext'
import socket from "./socket";

const Router = () => {

    const { userId, username } = useContext(AuthContext);

    useEffect(() => {
        if (username && userId) {
            console.log('connected');
            socket.auth = { username, userId };
            socket.connect();
        }
    }, [username, userId]);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={userId ? (<Navigate replace to="/chat" />) : (<Homepage />)} />
                <Route path="chat" element={!userId ? (<Navigate replace to="/" />) : (<Chat socket={socket} />)} />
                <Route path="login" element={userId ? (<Navigate replace to="/chat" />) : (<Login />)} />
                <Route path="signup" element={userId ? (<Navigate replace to="/chat" />) : (<Signup />)} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router