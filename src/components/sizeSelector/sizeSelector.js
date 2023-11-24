import React, { useState } from "react";
import "./sizeSelector.scss"

export default function SizeSelector (props) {
    const [selectedSize, setSelectedSize] = useState(null);

    const handleSizeClick = (size) => {
        setSelectedSize(size);
    };

    return (
        <div className={"Size-selector"}>
            <div
                className={`Size ${selectedSize === 'S' ? 'selected' : ''}`}
                onClick={() => handleSizeClick('S')}
            >
                S
            </div>
            <div
                className={`Size ${selectedSize === 'M' ? 'selected' : ''}`}
                onClick={() => handleSizeClick('M')}
            >
                M
            </div>
            <div
                className={`Size ${selectedSize === 'L' ? 'selected' : ''}`}
                onClick={() => handleSizeClick('L')}
            >
                L
            </div>
        </div>
    );
};
