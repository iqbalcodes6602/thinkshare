import { useParams } from "react-router-dom"
import "quill/dist/quill.snow.css"
import { io } from "socket.io-client"
import { useCallback, useEffect, useState } from "react"
import Quill from "quill"

const SAVE_INTERVAL_MS = 2100

const TOOLBAR = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    ["bold", "italic", "underline"],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["clean"],
    ["image", "blockquote", "code-block"],
    [{ script: "sub" }, { script: "super" }],
]

export default function MainDocument() {
    const [quill, setQuill] = useState()
    const { id: mainDocId } = useParams()
    const [socket, setSocket] = useState()

    useEffect(() => {
        const s = io("http://localhost:3001")
        setSocket(s)

        return () => {
            s.disconnect()
        }
    }, [])

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

    useEffect(() => {
        if (socket == null || quill == null) return

        socket.once("sync-document", mainDoc => {
            quill.setContents(mainDoc)
            quill.enable()
        })

        socket.emit("get-document", mainDocId)
    }, [socket, quill, mainDocId])


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

        const interval = setInterval(() => {
            socket.emit("save-document", quill.getContents())
        }, SAVE_INTERVAL_MS)

        return () => {
            clearInterval(interval)
        }
    }, [socket, quill])


    const containerRef = useCallback(container => {
        if (container == null) return

        container.innerHTML = ""
        const textEditor = document.createElement("div")
        container.append(textEditor)
        const q = new Quill(textEditor, {
            theme: "snow",
            modules: { toolbar: TOOLBAR },
        })
        q.disable()
        q.setText("Loading...")
        setQuill(q)
    }, [])
    return (
        <div className="container" ref={containerRef}>
            
        </div>
    )
}