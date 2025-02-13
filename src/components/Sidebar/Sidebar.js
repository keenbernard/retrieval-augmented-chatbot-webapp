import React from 'react';
import SidebarItem from './Sidebaritem';
import './Sidebar.css';

const Sidebar = ({ chats, activeChatId, onNewChat, onSelectChat }) => {
    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <h2>MIMIR</h2>
                <button onClick={onNewChat}>+ New Chat</button>
            </div>

            <div className="sidebar-section">
                <h3>Previous Chats</h3>
                {chats.map((chat) => (
                    <SidebarItem
                        key={chat.id}
                        title={chat.title}
                        isActive={chat.id === activeChatId} // Check if the chat is active
                        onClick={() => onSelectChat(chat.id)} // Select chat on click
                    />
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
