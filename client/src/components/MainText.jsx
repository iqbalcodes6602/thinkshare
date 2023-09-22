
import React, { useEffect, useState } from 'react';
import { Add, AddToPhotos, Remove } from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid'; // Import uuid library
import { useParams } from 'react-router-dom';
import Note from './Note';
import { io } from "socket.io-client"
import '../styles/navbarstyle.css'

const MainText = () => {
    const [zoomLevel, setZoomLevel] = useState(0.7); // 1 is the default scale (no zoom)
    const [notes, setNotes] = useState([]);
    const { id: pageId } = useParams()
    const [socket, setSocket] = useState()
    // console.log(pageId)

    // socket io conenction establishment
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    console.log(backendUrl)
    useEffect(() => {
        const s = io(backendUrl)
        // const s = io("https://think-share-backend.onrender.com")
        // const s = io("http://localhost:3001")
        setSocket(s)

        return () => {
            s.disconnect()
        }
    }, [])

    //   connection user
    useEffect(() => {
        if (socket == null) return

        socket.once("fetch-notes", mainNote => {
            setNotes(mainNote.notes)
        })

        socket.emit("user-connected", pageId)

    }, [socket, pageId])

    useEffect(() => {
        if (socket == null) return
        socket.once("fetch-notes", mainNote => {
            setNotes(mainNote.notes)
        })
        console.log("notes", notes)
    }, [pageId, notes]);

    const handleButtonClick = () => {
        const newNote = {
            id: uuidv4(),
            x: -100,
            y: -100,
            background: getRandomColor()
        };
        const newNotesArray = [...notes, newNote];
        setNotes(newNotesArray);

        // Create the notes object
        const notesObject = {
            id: pageId,
            notes: newNotesArray,
        };


        socket.emit("send-updated-notes", notesObject)

    };

    useEffect(() => {
        if (socket == null) return;

        const handler = notesObject => {
            // alert("here")
            socket.emit("save-notes", notesObject)
            setNotes(notesObject.notes);
        };

        // Add the pageId to target the specific room
        socket.on(`receive-updated-notes-${pageId}`, handler);

        return () => {
            // Remove the listener for the specific room
            socket.off(`receive-updated-notes-${pageId}`, handler);
        };
    }, [socket, notes, pageId]);

    const handleZoomIn = () => {
        setZoomLevel(prevZoom => prevZoom + 0.1); // Increase the zoom level by 0.1
    };

    const handleZoomOut = () => {
        setZoomLevel(prevZoom => Math.max(0.2, prevZoom - 0.1)); // Decrease the zoom level by 0.1, but minimum scale is 0.2
    };

    const handleNoteDrag = (id, x, y) => {
        // Find the note by ID and update its position
        const updatedNotes = notes.map(note => {
            if (note.id === id) {
                return { ...note, x, y };
            }
            return note;
        });

        // setNotes(updatedNotes);

        // Update local storage with the updated notes
        const notesObject = {
            id: pageId,
            notes: updatedNotes,
        };
        socket.emit("send-updated-notes", notesObject)
    };

    const colors = ["#9BEDFD", "#D8D0FE", "#FEE33A", "#FEC0D9"];
    const getRandomColor = () => {
        return colors[(notes.length) % 4];
    };


    const generateDivs = () => {
        if (notes) {
            console.log('notes', notes)
            return notes.map((note) => (
                <span
                    key={note.id}
                    style={{ transform: `translate(${note.x}px, ${note.y}px)` }}
                >
                    <Note
                        note={note}
                        noteId={note.id}
                        handleDelete={handleDelete}
                        onNoteDrag={handleNoteDrag}
                    />
                </span>
            ));
        }
        else return
    };

    const handleDelete = (id) => {
        if (notes.length <= 1) return
        const notesObject = {
            id: pageId,
            notes: notes.filter((note) => note.id !== id)
        }
        socket.emit("send-updated-notes", notesObject)
    };

    return (
        <>
            <div
                style={{
                    transform: `scale(${zoomLevel})`,
                    transformOrigin: 'center center', // Center the transform origin
                    display: "flex",
                    justifyContent: "center", // Horizontally center the content
                    alignItems: "center", // Vertically center the content
                    height: "100vh", // Set the container height to 100% of the viewport height
                    width: "100%", // Set the container width to 100%
                }}
            >
                {
                    notes && generateDivs()
                }
            </div>
            <div class="card">
                <div class="menu">
                    <ul>
                        <li>
                            <button onClick={handleButtonClick}><AddToPhotos /> </button>
                        </li>
                        <li>
                            <button style={{ borderRadius: "50% 50% 0 0" }} onClick={handleZoomIn}><Add /></button>
                        </li>
                        <li style={{ fontWeight: "700", fontSize: "18px", height: "25px" }}>
                            {parseInt(zoomLevel * 100)}%
                        </li>
                        <li>
                            <button style={{ borderRadius: "0 0 50% 50%" }} onClick={handleZoomOut}><Remove /></button>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default MainText;