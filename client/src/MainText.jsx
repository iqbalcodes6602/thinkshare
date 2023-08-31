// import React from 'react'
// import TextEditor from './TextEditor'
// import { v4 as uuidV4 } from "uuid"

// function MainText() {
//   return (
//     <>
//     {/* <TextEditor noteId ={`${uuidV4()}`} />
//     <TextEditor noteId ={`${uuidV4()}`} /> */}
//     <TextEditor noteId ='1' />
//     <TextEditor noteId ='2' />
//     </>
//   )
// }

// export default MainText


import React, { useEffect, useState } from 'react';
import { Add, Remove } from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid'; // Import uuid library
import { useParams } from 'react-router-dom';
import TextEditor from './TextEditor';

const AddNote = () => {
    const [zoomLevel, setZoomLevel] = useState(1); // 1 is the default scale (no zoom)
    const [notes, setNotes] = useState([]);
    const { id: pageId } = useParams()
    console.log(pageId)

    useEffect(() => {
        // Retrieve the notes object from local storage based on the document ID
        const storedNotesObject = localStorage.getItem(pageId);
        if (storedNotesObject) {
            const parsedNotesObject = JSON.parse(storedNotesObject);
            setNotes(parsedNotesObject.notes);
        } else {
            const initialNote = {
                id: uuidv4(),
                x: 100,
                y: 100
            };
            const newNotesArray = [...notes, initialNote];
            setNotes(newNotesArray);

            // Create the notes object
            const notesObject = {
                id: pageId,
                notes: newNotesArray,
            };

            // Store the notes object in local storage
            localStorage.setItem(pageId, JSON.stringify(notesObject));
        }
    }, [pageId, notes]);

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
            id: pageId,
            notes: newNotesArray,
        };

        // Store the notes object in local storage
        localStorage.setItem(pageId, JSON.stringify(notesObject));
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
            id: pageId,
            notes: updatedNotes,
        };
        localStorage.setItem(pageId, JSON.stringify(notesObject));
    };



    const generateDivs = () => {
        return notes.map((note) => (
            <span
                key={note.id}
                style={{ transform: `translate(${note.x}px, ${note.y}px)` }}
            >
                {/* <NoteMaker
                    note={note}
                    onNoteDrag={handleNoteDrag}
                /> */}
                <TextEditor
                    note={note}
                    noteId={note.id}
                    handleDelete={handleDelete}
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
            <button onClick={handleZoomIn}><Add /></button>{parseInt(zoomLevel * 100)} %
            <button onClick={handleZoomOut}><Remove /></button>
            <div
                style={{ transform: `scale(${zoomLevel})`, transformOrigin: '0 0', display: "flex" }}
            >
                <button onClick={handleButtonClick}>Generate Div</button>
                {generateDivs()}
            </div>
        </>
    );
};

export default AddNote;