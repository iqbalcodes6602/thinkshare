import React from 'react';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { Icon } from '@mui/material';


const DarkModeToggle = ({ darkMode, setDarkMode }) => {
    const handleToggle = () => {
        setDarkMode(!darkMode);
    };

    return (
        <Icon onClick={handleToggle} color="inherit">
            {darkMode ? <Brightness7 /> : <Brightness4 />}
        </Icon>
    );
};

export default DarkModeToggle;
