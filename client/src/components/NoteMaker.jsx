import React, { useCallback, useEffect, useState } from 'react'
import Draggable from 'react-draggable';
import { DragIndicator, Delete } from '@mui/icons-material';
import Quill from 'quill'
import '../styles/editor.css'
import io from 'socket.io-client'

const SAVE_INTERNAL_MS = 2000
function NoteMaker(props) {
    const documentId = props.note.id
    const [socket, setSocket] = useState()
    const [quill, setQuill] = useState()

    useEffect(() => {
        if (socket == null || quill == null) return

        socket.once("load-document", document => {
            quill.setContents(document)
            quill.enable()
        })

        socket.emit("get-document", documentId)
    }, [socket, quill, documentId])

    // make connection to socketio backend
    useEffect(() => {
        const s = io("http://localhost:3001")
        setSocket(s)

        return () => {
            s.disconnect()
        }
    }, [])

    // send changes done to backend through socketio
    useEffect(() => {
        if (socket == null || quill == null) return

        const handler = (delta, oldDelta, source) => {
            if (source !== 'user') return
            socket.emit("send-changes", delta)
        }
        quill.on('text-change', handler)

        return () => {
            quill.off('text-change', handler)
        }
    }, [socket, quill])


    // recieve changes from backend through socket io and upate the note
    useEffect(() => {
        if (socket == null || quill == null) return

        const handler = (delta) => {
            quill.updateContents(delta)
        }
        socket.on('recieve-changes', handler)

        return () => {
            socket.off('recieve-changes', handler)
        }
    }, [socket, quill])


    // save the data to db
    useEffect(() => {
        if (socket == null || quill == null) return
        const interval = setInterval(() => {
            socket.emit('save-document', quill.getContents())
        }, SAVE_INTERNAL_MS);

        return () => {
            clearInterval(interval)
        }
    }, [socket, quill])


    // function to generate a new note
    const wrapperRef = useCallback(wrapper => {
        if (wrapper == null) return

        wrapper.innerHTML = ""
        const editor = document.createElement('div')
        wrapper.append(editor)
        const q = new Quill(editor, { theme: "snow", modules: { toolbar: TOOLBAR_OPTIONS }, })
        q.disable()
        q.setText('Loading...')
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

    const handleDrag = (event, ui) => {
        // Calculate new x and y values based on the drag event and ui.position
        const x = ui.x;
        const y = ui.y;
        
        // Update the note position and notify the parent component
        props.onNoteDrag(props.note.id, x, y);
    };

    return (
        <Draggable
            axis="both"
            handle=".draggingHandle"
            position={null}
            scale={1}
            // defaultPosition={{ x: 100, y: 100 }}
            defaultPosition={{ x: props?.note?.x, y: props?.note?.y }} // Set the initial position based on note data
            onDrag={handleDrag}
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
