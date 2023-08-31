import TextEditor from "./TextEditor"
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
} from "react-router-dom"
import { v4 as uuidV4 } from "uuid"
import MainText from "./MainText"

function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Navigate to={`/documents/${uuidV4()}`}/>} />
        {/* <Route path="/documents/:id" element={<TextEditor noteId ={`${uuidV4()}`} />} /> */}
        <Route path="/documents/:id" element={<MainText />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
