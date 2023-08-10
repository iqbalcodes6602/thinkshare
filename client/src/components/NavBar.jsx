import React from 'react';
import { AppBar, Typography, Toolbar } from '@mui/material';

const Navbar = ({ darkMode, setDarkMode }) => {
    return (
        <AppBar position="fixed" marginBottom="20px" color={'primary'}>
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    My App
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
