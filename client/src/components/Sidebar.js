import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import ChatPreview from './ChatPreview'
import { url } from '../Url'

const Sidebar = ({ chatVisible, setChatVisible, newChatTabOpen, setNewChatTabOpen, settingsTabOpen, searchFilter, setSearchFilter, chats, userList, currentChat, setCurrentChat, setNewChat, messages, setNavbarActive, getChats, socket }) => {
    const { getUser, username, userId } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = async () => {
        await fetch(`${url}/api/user/logout`, { credentials: 'include' });
        getUser();
        navigate('/');
    }

    return (
        <>
            {/* Check if settings is open */}
            {!settingsTabOpen ?
                /* If settings is not open, show the current chats sidebar */
                !newChatTabOpen ?
                    <div className={chatVisible ? "sidebar not-visible" : "sidebar"}>
                        <h1 className="sidebar-title">Chats</h1>

                        <form className="searchbar">
                            <div className="searchbar-icon"><span className="material-symbols-outlined">
                                search
                            </span></div>
                            <input className="searchbar-input" placeholder="Search chats or users" onChange={(e) => setSearchFilter(e.target.value)} value={searchFilter} />
                        </form>

                        <ul className="chat-list">
                            { /* Map the filtered array of chats */
                                chats.map((c) => {
                                    /* Check which username in chat does not equal the current users username and store in variable */
                                    const otherUser = c.usernames.filter((u) => u !== username);
                                    /* Filter chats based on the search filter
                                    If the other users username starts with the value in the search filter, return ChatPreview component with chat data properties  */
                                    if (otherUser[0].toLowerCase().startsWith(searchFilter.toLowerCase())) {
                                        return <ChatPreview key={c._id} chat={c} setChatVisible={setChatVisible} currentChat={setCurrentChat} setCurrentChat={setCurrentChat} setNewChat={setNewChat} messages={messages} newChatTabOpen={newChatTabOpen} setNewChatTabOpen={setNewChatTabOpen} setNavbarActive={setNavbarActive} getChats={getChats} socket={socket} />;
                                    }
                                })
                            }
                        </ul>

                    </div>
                    :
                    /* If new chat is open, show the new chat sidebar */
                    <div className={chatVisible ? "sidebar not-visible" : "sidebar"}>
                        <h1 className="sidebar-title">New Chat</h1>

                        <form className="searchbar">
                            <div className="searchbar-icon"><span className="material-symbols-outlined">
                                search
                            </span></div>
                            <input className="searchbar-input" placeholder="Search users" onChange={(e) => setSearchFilter(e.target.value)} value={searchFilter} />
                        </form>

                        <ul className="chat-list">
                            { /* Map the filtered array of users */
                                userList.map((u) => {
                                    /* Filter users based on the search filter
                                    If the other users username starts with the value in the search filter, return ChatPreview component with user data properties */
                                    if (u.username.toLowerCase().startsWith(searchFilter.toLowerCase())) {
                                        return <ChatPreview key={u._id} user={u} setChatVisible={setChatVisible} setNewChat={setNewChat} currentChat={currentChat} setCurrentChat={setCurrentChat} chats={chats} newChatTabOpen={newChatTabOpen} setNewChatTabOpen={setNewChatTabOpen} setNavbarActive={setNavbarActive} getChats={getChats} socket={socket} />;
                                    }
                                })
                            }
                        </ul>
                    </div>
                :
                /* If settings is open, show the settings sidebar */
                <div className={chatVisible ? "sidebar not-visible" : "sidebar"}>
                    <h1 className="sidebar-title">Settings</h1>
                    <ul className="settings-list">
                        <li className="settings-list-item">
                            <button className="logout-button" onClick={() => logout()}>Logout</button>
                        </li>
                    </ul>
                </div>
            }
        </>
    )
}

export default Sidebar