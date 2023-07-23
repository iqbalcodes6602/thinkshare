import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Navbar from './components/NavBar';
import { useState } from 'react';
import NoteMaker from './components/NoteMaker';


function App() {


  const [darkMode, setDarkMode] = useState(false);
  // Define the theme for dark mode and light mode
  const theme = createTheme({
    palette: {
      type: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <NoteMaker />
    </ThemeProvider>
  );
}

export default App;
