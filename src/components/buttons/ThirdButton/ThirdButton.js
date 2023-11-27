import React from "react";
import "./ThirdButton.scss";

export default function ThirdButton(props) {
    const { text, disponiveis, onClick } = props;
    const isEsgotado = disponiveis === 0;

    return (
        <div className={`ThirdButton ${isEsgotado ? "esgotado" : ""}`}>
            <button className="button" onClick={onClick} disabled={isEsgotado}>
                {isEsgotado ? "Esgotado" : disponiveis > 0 ? `Desde ${text}` : text}
            </button>
        </div>
    );
}
