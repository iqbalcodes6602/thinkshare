import React, { useCallback, useEffect, useState } from 'react'
import Draggable from 'react-draggable';
import { DragIndicator, Delete } from '@mui/icons-material';
import Quill from 'quill'
import '../styles/editor.css'
import io from 'socket.io-client'

function NoteMaker(props) {
    const [socket, setSocket] = useState()
    const [quill, setQuill] = useState()

    useEffect(() => {
        const s = io("http://localhost:3001")
        setSocket(s)

        return () => {
            s.disconnect()
        }
    }, [])
   
    useEffect(() => {
        if(socket == null || quill == null) return

        const handler =  (delta, oldDelta, source) => {
            if (source !== 'user') return
            socket.emit("send-changes", delta)
        }
        quill.on('text-change', handler)

        return () => {
            quill.off('text-change', handler)
        }
    }, [socket, quill])

    const wrapperRef = useCallback(wrapper => {
        if (wrapper == null) return

        wrapper.innerHTML = ""
        const editor = document.createElement('div')
        wrapper.append(editor)
        const q = new Quill(editor, { theme: "snow", modules: { toolbar: TOOLBAR_OPTIONS }, })
        setQuill(q)
    }, [])

    const TOOLBAR_OPTIONS = [
        [{ header: [1, 2, 3, 4, 5, 6, false] }, { font: [] }],
        [{ list: "ordered" }, { list: "bullet" }, { align: [] }],
        ["bold", "italic", "underline"],
        [{ color: [] }, { background: [] }],
        [{ script: "sub" }, { script: "super" }],
        ["image", "blockquote", "code-block"],
    ]

    return (
        <Draggable
            axis="both"
            handle=".draggingHandle"
            position={null}
            scale={1}
            defaultPosition={{ x: 100, y: 100 }}
        >
            <div style={{ padding: "0", width: "auto", height: "60vh", position: "absolute" }} >
                <DragIndicator style={{ cursor: "all-scroll" }} className='draggingHandle' />

                <Delete style={{ cursor: "pointer" }} onClick={() => props.handleDelete(props.note.id)}>Delete</Delete>

                <div className="container" ref={wrapperRef} style={{ width: "auto", height: "auto", position: "absolute" }}></div>
            </div>
        </Draggable>
    )
}

export default NoteMaker
