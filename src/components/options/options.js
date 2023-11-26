import React from "react";
import "./options.scss";
import Subtitle from "../subtitle/subtitle";
import ColorSelector from "../colorSelector/colorSelector";
import SizeSelector from "../sizeSelector/sizeSelector";

export default function Options({ options }) {
    if (!options || options.length === 0) {
        // Se não houver opções, você pode decidir o que fazer aqui
        return null;
    }

    const colors = options.map(option => option.cor);
    const sizes = options.map(option => option.tamanho);

    const handleColorChange = (color) => {
        // Implemente a lógica para lidar com a mudança de cor, se necessário
        console.log("Selected color:", color);
    };

    const handleSizeChange = (size) => {
        // Implemente a lógica para lidar com a mudança de tamanho, se necessário
        console.log("Selected size:", size);
    };

    return (
        <div className={"Options"}>
            <Subtitle text={"Cor"} />
            {colors && <ColorSelector colors={colors} selectedColor={colors[0]} onSelectColor={handleColorChange} />}

            <Subtitle text={"Tamanho"} />
            {sizes && <SizeSelector sizes={sizes} selectedSize={sizes[0]} onSelectSize={handleSizeChange} />}
        </div>
    );
}
