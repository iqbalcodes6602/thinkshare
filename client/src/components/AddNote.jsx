import React, { useState } from 'react';
import NoteMaker from './NoteMaker';
import { Add, Remove } from '@mui/icons-material';

const AddNote = () => {
    const [divCount, setDivCount] = useState(0);

    const handleButtonClick = () => {
        setDivCount((prevCount) => prevCount + 1);
    };

    const generateDivs = () => {
        const divs = [];
        for (let i = 0; i < divCount; i++) {
            divs.push(
                <NoteMaker
                    key={i}
                />
            );
        }
        return divs;
    };

    const [zoomLevel, setZoomLevel] = useState(1); // 1 is the default scale (no zoom)

    const handleZoomIn = () => {
        setZoomLevel(prevZoom => prevZoom + 0.1); // Increase the zoom level by 0.1
    };

    const handleZoomOut = () => {
        setZoomLevel(prevZoom => Math.max(0.2, prevZoom - 0.1)); // Decrease the zoom level by 0.1, but minimum scale is 0.2
    };

    return (
        <>
            <button onClick={handleZoomIn}><Add /></button>{parseInt(zoomLevel*100)} %
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
