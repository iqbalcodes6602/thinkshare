import React, { useState } from 'react';
import NoteMaker from './NoteMaker';
import { Add, Remove } from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid'; // Import uuid library
import Navbar from './NavBar'

const AddNote = () => {
    const [zoomLevel, setZoomLevel] = useState(1); // 1 is the default scale (no zoom)
    const [notes, setNotes] = useState([]);

    const handleButtonClick = () => {
        const newNote = {
            id: uuidv4(), // Generate a unique id for each NoteMaker
        };
        setNotes((prevNotes) => [...prevNotes, newNote]);
    };

    const handleZoomIn = () => {
        setZoomLevel(prevZoom => prevZoom + 0.1); // Increase the zoom level by 0.1
    };

    const handleZoomOut = () => {
        setZoomLevel(prevZoom => Math.max(0.2, prevZoom - 0.1)); // Decrease the zoom level by 0.1, but minimum scale is 0.2
    };

    const generateDivs = () => {
        return notes.map((note) => (
            <span key={note.id} >
                <NoteMaker
                    handleDelete={handleDelete}
                    note={note}
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
            <div style={{marginBottom:"100px"}}></div>

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
