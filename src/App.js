import './App.css';
import JoditEditor from "jodit-react"
import { useRef, useState } from "react"
import { CssBaseline, ThemeProvider, createMuiTheme } from '@material-ui/core';
import Navbar from './components/NavBar';


function App() {

  const editor = useRef(null)
  const [content, setContent] = useState("")

  const [darkMode, setDarkMode] = useState(false);
  // Define the theme for dark mode and light mode
  const theme = createMuiTheme({
    palette: {
      type: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="App">
        <JoditEditor
          ref={editor}
          value={content}
          onChange={(newContent) => setContent(newContent)}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
