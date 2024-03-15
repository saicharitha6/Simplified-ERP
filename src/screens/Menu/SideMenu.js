// SideMenu.js

import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { ListItemButton } from '@mui/material';
import { NavLink } from 'react-router-dom';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { Link } from 'react-router-dom';
import styles from './SideMenu.module.css'; // Import CSS module for styling

const SideMenu = () => {
    const [state, setState] = useState({ left: false });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <div
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <ListItem component={Link} to="/dashboard">
                    <ListItemIcon><DashboardIcon /></ListItemIcon>
                    <ListItemText primary={"Dashboard"} />
                </ListItem>
                <ListItem component={Link} to="/productlist">
                    <ListItemIcon><StorefrontIcon /></ListItemIcon>
                    <ListItemText primary={"Products"} />
                </ListItem>
                <ListItem component={Link} to="/orderPage">
                    <ListItemIcon><ShoppingCartIcon /></ListItemIcon>
                    <ListItemText primary={"Orders"} />
                </ListItem>
            </List>
        </div>
    );

    return (
        <div className={styles.SideMenu}>
            {/* Apply CSS classes for styling */}
            <MenuIcon onClick={toggleDrawer("left", true)} className={styles.menuIcon} />
            <Drawer
                anchor={"left"}
                open={state["left"]}
                onClose={toggleDrawer("left", false)}
            >
                {list("left")}
            </Drawer>
            <h1 className={styles.top}>ERP System Store</h1>
            <div className={styles.home}> <NavLink className={styles.nav} to="/">HOME</NavLink></div>
            <div className={styles.cartIcon}>
                <NavLink to="/cart">
                    <img src={require('../../assests/cart.jpg')} className={styles.cartImage} alt="Cart" />
                </NavLink>
            </div>
        </div>
    );
};

export default SideMenu;
