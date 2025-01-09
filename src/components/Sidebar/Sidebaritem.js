import React from 'react';
import './SidebarItem.css';

const SidebarItem = ({ title, isActive, onClick }) => {
    return (
        <div
            className={`sidebar-item ${isActive ? 'active' : ''}`} // Add 'active' class if isActive is true
            onClick={onClick}
        >
            {title}
        </div>
    );
};

export default SidebarItem;
