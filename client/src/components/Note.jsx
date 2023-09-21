import { useCallback, useEffect, useState } from "react"
import Quill from "quill"
// import "quill/dist/quill.snow.css"
import "quill/dist/quill.bubble.css"
import { io } from "socket.io-client"
import { useParams } from "react-router-dom"
import Draggable from 'react-draggable';
import { Delete, DragIndicator } from "@mui/icons-material"


const SAVE_INTERVAL_MS = 2000

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }, { font: [] }],
  [{ list: "ordered" }, { list: "bullet" }, { align: [] }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  ["image", "blockquote", "code-block"],
]

export default function TextEditor({ noteId, note, handleDelete, onNoteDrag }) {
  const { id: pageId } = useParams()
  
  const documentId = noteId
  const [socket, setSocket] = useState()
  const [quill, setQuill] = useState()
  
  // useEffect(() => {
    //   alert(noteId)
    // }, [])
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    useEffect(() => {
      
      const s = io(backendUrl)
      // const s = io("https://think-share-backend.onrender.com")
    // const s = io("http://localhost:3001")
    setSocket(s)

    return () => {
      s.disconnect()
    }
  }, [])

  useEffect(() => {
    if (socket == null || quill == null) return

    socket.once("load-document", document => {
      quill.setContents(document)
      quill.enable()
    })

    socket.emit("get-document", { documentId, pageId })
  }, [socket, quill, documentId])

  useEffect(() => {
    if (socket == null || quill == null) return

    const interval = setInterval(() => {
      socket.emit("save-document", quill.getContents())
    }, SAVE_INTERVAL_MS)

    return () => {
      clearInterval(interval)
    }
  }, [socket, quill])

  useEffect(() => {
    if (socket == null || quill == null) return

    const handler = delta => {
      quill.updateContents(delta)
    }
    socket.on("receive-changes", handler)

    return () => {
      socket.off("receive-changes", handler)
    }
  }, [socket, quill])

  useEffect(() => {
    if (socket == null || quill == null) return

    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return
      socket.emit("send-changes", delta)
    }
    quill.on("text-change", handler)

    return () => {
      quill.off("text-change", handler)
    }
  }, [socket, quill])

  const wrapperRef = useCallback(wrapper => {
    if (wrapper == null) return

    wrapper.innerHTML = ""
    const editor = document.createElement("div")
    wrapper.append(editor)
    const q = new Quill(editor, {
      theme: "bubble",
      modules: { toolbar: TOOLBAR_OPTIONS },
    })
    q.disable()
    q.setText("Loading...")
    setQuill(q)
  }, [])


  const handleDrag = (event, ui) => {
    // Calculate new x and y values based on the drag event and ui.position
    const x = ui.x;
    const y = ui.y;

    // Update the note position and notify the parent component
    onNoteDrag(note.id, x, y);
  };


  return (
    <Draggable
      axis="both"
      handle=".draggingHandle"
      position={null}
      scale={1}
      defaultPosition={{ x: note?.x, y: note?.y }} // Set the initial position based on note data
      onDrag={handleDrag}
    >
      <div style={{ padding: "0", width: "auto", height: "60vh", position: "absolute" }} >
        <span id="buttons">
          <DragIndicator style={{ cursor: "all-scroll" }} className='draggingHandle' />
          <Delete style={{ cursor: "pointer" }} onClick={() => handleDelete(noteId)}>Delete</Delete>
        </span>

        <div className="container" ref={wrapperRef} style={{ width: "auto", height: "auto", position: "absolute" }}></div>
      </div>
    </Draggable>
  )
}
