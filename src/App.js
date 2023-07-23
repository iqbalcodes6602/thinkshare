import './App.css';
import JoditEditor from "jodit-react"
import { useRef, useState } from "react"

function App() {
  const editor = useRef(null)
  const [content, setContent] = useState("")
  return (
    <div className="App">
      hellow
      <JoditEditor
        ref={editor}
        value={content}
        onChange={(newContent) => setContent(newContent)}
      />
    </div>
  );
}

export default App;
