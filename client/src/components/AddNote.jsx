import React, { useEffect, useState } from 'react';
import NoteMaker from './NoteMaker';
import { Add, Remove } from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid'; // Import uuid library
import Navbar from './NavBar'
import { useParams } from 'react-router-dom';

const AddNote = () => {
    const [zoomLevel, setZoomLevel] = useState(1); // 1 is the default scale (no zoom)
    const [notes, setNotes] = useState([]);
    const { id: documentId } = useParams();
    console.log(documentId)

    useEffect(() => {
        // Retrieve the notes object from local storage based on the document ID
        const storedNotesObject = localStorage.getItem(documentId);
        if (storedNotesObject) {
            const parsedNotesObject = JSON.parse(storedNotesObject);
            setNotes(parsedNotesObject.notes);
        }
    }, [documentId]);

    // const handleButtonClick = () => {
    //     const newNote = {
    //         id: uuidv4(), // Generate a unique id for each NoteMaker
    //     };
    //     setNotes((prevNotes) => [...prevNotes, newNote]);
    // };
    const handleButtonClick = () => {
        const newNote = {
            id: uuidv4(),
            x: 100,
            y: 100 
        };
        const newNotesArray = [...notes, newNote];
        setNotes(newNotesArray);

        // Create the notes object
        const notesObject = {
            id: documentId,
            notes: newNotesArray,
        };

        // Store the notes object in local storage
        localStorage.setItem(documentId, JSON.stringify(notesObject));
    };


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
    
        setNotes(updatedNotes);
    
        // Update local storage with the updated notes
        const notesObject = {
            id: documentId,
            notes: updatedNotes,
        };
        localStorage.setItem(documentId, JSON.stringify(notesObject));
    };
    


    const generateDivs = () => {
        return notes.map((note) => (
            <span
                key={note.id}
                style={{ transform: `translate(${note.x}px, ${note.y}px)` }}
            >
                <NoteMaker
                    handleDelete={handleDelete}
                    note={note}
                    onNoteDrag={handleNoteDrag}
                />
            </span>
        ));
    };

    const handleDelete = (id) => {
        setNotes((prevNotes) => {
            return prevNotes.filter((note) => note.id !== id);
        });
    };

    return (
        <>
            <Navbar />
            <div style={{ marginBottom: "100px" }}></div>

            <button onClick={handleZoomIn}><Add /></button>{parseInt(zoomLevel * 100)} %
            <button onClick={handleZoomOut}><Remove /></button>
            <div
                style={{ transform: `scale(${zoomLevel})`, transformOrigin: '0 0' }}
            >
                <button onClick={handleButtonClick}>Generate Div</button>
                {generateDivs()}
            </div>
        </>
    );
};

export default AddNote;