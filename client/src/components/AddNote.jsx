import React, { useEffect, useState } from 'react';
import NoteMaker from './NoteMaker';

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

    const [zoomLevel, setZoomLevel] = useState(1);

    const handleZoom = (delta) => {
        setZoomLevel((prevZoom) => prevZoom + delta);
    };

    const handleScroll = (e) => {
        e.preventDefault(); // Prevent default scrolling behavior
        const delta = e.deltaY > 0 ? 0.1 : -0.1;
        handleZoom(delta);
    };

    const handleKeyDown = (e) => {
        if (e.ctrlKey) {
            e.preventDefault(); // Prevent default Ctrl+ArrowUp/ArrowDown behavior
            if (e.key === 'ArrowUp') {
                handleZoom(0.1);
            } else if (e.key === 'ArrowDown') {
                handleZoom(-0.1);
            }
        }
    };

    useEffect(() => {
        // Attach event listeners when the component mounts
        document.addEventListener('wheel', handleScroll, { passive: false });
        document.addEventListener('keydown', handleKeyDown);

        // Clean up event listeners when the component unmounts
        return () => {
            document.removeEventListener('wheel', handleScroll);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div
            tabIndex="0"
            style={{
                transform: `scale(${zoomLevel})`,
                transformOrigin: 'top left', // Keep the zoom centered at the top left corner
            }}
        >
            <button onClick={handleButtonClick}>Generate Div</button>
            {generateDivs()}
        </div>
    );
};

export default AddNote;
