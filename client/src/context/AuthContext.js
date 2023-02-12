import React, { useState, useEffect, createContext } from 'react'
import { url } from '../Url';

const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const [userId, setUserId] = useState(null);
    const [username, setUsername] = useState(null);

    const getUser = async () => {
        const res = await fetch(`${url}/api/user/loggedin`, { credentials: 'include' });
        const resJson = await res.json();
        setUserId(resJson.user._id);
        setUsername(resJson.user.username);
    };

    useEffect(() => {
        getUser();
    }, []);

    return <AuthContext.Provider value={{ getUser, userId, username }}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContext;
export { AuthContextProvider };