import React from 'react';
import { AppBar, Typography, Toolbar } from '@mui/material';
import DarkModeToggle from './DarkModeToggle';

const Navbar = ({ darkMode, setDarkMode }) => {
    return (
        <AppBar position="static" color={darkMode ? 'default' : 'primary'}>
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    My App
                </Typography>
                <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
