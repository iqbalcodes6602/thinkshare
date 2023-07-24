import React, { useState } from 'react';
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

    return (
        <div>
            <button onClick={handleButtonClick}>Generate Div</button>
            {generateDivs()}
        </div>
    );
};

export default AddNote;
