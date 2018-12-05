import React from 'react';
import { elastic as Menu } from "react-burger-menu";
import { Link } from 'react-router-dom';
import './SideBar.css'; 

const SideBar = () => {
    return (
        <Menu>
            <Link className="menu-item" to="/">
                Home
            </Link>
        </Menu>
    );
};

export default SideBar;