import './App.css';
import { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/NavBar';
import AddNote from './components/AddNote';
import 'quill/dist/quill.snow.css'



function App() {

  const [darkMode, setDarkMode] = useState(false);
  // Define the theme for dark mode and light mode
  const theme = createTheme({
    palette: {
      type: darkMode ? 'dark' : 'light',
    },
  });


  return (
    <>
      <div style={{ minHeight: "100vh", minWidth: "80vw", backgroundColor: "#ddd", overflow: "hidden" }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
          <AddNote />
        </ThemeProvider>
        hellossj
      </div>
    </>
  );
}

export default App;
