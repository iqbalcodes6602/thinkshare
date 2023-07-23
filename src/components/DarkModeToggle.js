import React from 'react';
import { IconButton } from '@material-ui/core';
import { Brightness4, Brightness7 } from '@mui/icons-material';


const DarkModeToggle = ({ darkMode, setDarkMode }) => {
    const handleToggle = () => {
        setDarkMode(!darkMode);
    };

    return (
        <IconButton onClick={handleToggle} color="inherit">
            {darkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
    );
};

export default DarkModeToggle;
