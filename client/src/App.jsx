import './App.css';
import { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/NavBar';
import AddNote from './components/AddNote';

function App() {


  const [darkMode, setDarkMode] = useState(false);
  // Define the theme for dark mode and light mode
  const theme = createTheme({
    palette: {
      type: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <div style={{backgroundColor: "black", minHeight:"100vh", minWidth:"100vw"}}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <AddNote />
      </ThemeProvider>
    </div>
  );
}

export default App;
