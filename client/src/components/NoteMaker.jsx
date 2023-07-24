import React, { useCallback } from 'react'
import Draggable from 'react-draggable';
import { DragIndicator, Delete } from '@mui/icons-material';
import Quill from 'quill'
import '../styles/editor.css'

function NoteMaker(props) {
    const wrapperRef = useCallback(wrapper => {
        if (wrapper == null) return

        wrapper.innerHTML = ""
        const editor = document.createElement('div')
        wrapper.append(editor)
        new Quill(editor, { theme: "snow" })
    }, [])

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
                <div className="container" ref={wrapperRef} style={{ width: "auto", height: "auto", margin: "10px" }}></div>
            </div>
        </Draggable>
    )
}

export default NoteMaker
