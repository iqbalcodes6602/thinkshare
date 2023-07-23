import React from 'react';
import { IconButton } from '@material-ui/core';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';

const DarkModeToggle = ({ darkMode, setDarkMode }) => {
    const handleToggle = () => {
        setDarkMode(!darkMode);
    };

    return (
        <IconButton onClick={handleToggle} color="inherit">
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
    );
};

export default DarkModeToggle;
