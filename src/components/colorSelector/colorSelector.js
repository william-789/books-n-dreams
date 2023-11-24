import React, { useState } from 'react';
import"./colorSelector.scss"
export default function ColorSelector (props) {
    const [selectedColor, setSelectedColor] = useState(null);

    const colors = ['red', 'green', 'blue'];

    const handleColorClick = (color) => {
        setSelectedColor(color);
    };

    return (
        <div className="Color-selector">
            {colors.map((color) => (
                <div
                    key={color}
                    className={`Color-option ${selectedColor === color ? 'selected' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorClick(color)}
                ></div>
            ))}
        </div>
    );
};

