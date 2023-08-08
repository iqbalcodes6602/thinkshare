import './App.css';
import 'quill/dist/quill.snow.css'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'; // Import uuid library
import TextEditor from './TextEditor';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={`/documents/${uuidv4()}`}/>} />
        <Route path="/documents/:id" element={<TextEditor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
