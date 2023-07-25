import React, { useCallback, useEffect } from 'react'
import Draggable from 'react-draggable';
import { DragIndicator, Delete } from '@mui/icons-material';
import Quill from 'quill'
import '../styles/editor.css'
import io from 'socket.io-client'

function NoteMaker(props) {

    useEffect(() => {
        const socket = io("http://localhost:3001")

        return () => {
            socket.disconnect()
        }
    }, [])

    const wrapperRef = useCallback(wrapper => {
        if (wrapper == null) return

        wrapper.innerHTML = ""
        const editor = document.createElement('div')
        wrapper.append(editor)
        new Quill(editor, { theme: "snow", modules: { toolbar: TOOLBAR_OPTIONS }, })
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
