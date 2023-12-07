import React, { useState } from "react";
import "./colorSelector.scss";

export default function ColorSelector(props) {
    const [selectedColor, setSelectedColor] = useState(null);

    const colors = ["#D99E28", "#C69A9B", "#C5E4CD", "#747574"];

    const handleColorClick = (color) => {
        setSelectedColor(color);

        if (props.onColorChange) {
            props.onColorChange(color);
        }
    };

    return (
        <div className="Color-selector">
            {colors.map((color) => (
                <div
                    key={color}
                    className={`Color-option ${selectedColor === color ? "selected" : ""}`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorClick(color)}
                ></div>
            ))}
        </div>
    );
}
