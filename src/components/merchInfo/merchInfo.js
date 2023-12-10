import React, { useState } from 'react';
import { baseImageLink } from "../../util/axiosBooks";
import Favorite from "../favorite/favorite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight as arrow } from "@fortawesome/free-solid-svg-icons";
import Subtitle from "../subtitle/subtitle";
import SizeSelector from "../sizeSelector/sizeSelector";
import ColorSelector from "../colorSelector/colorSelector";
import "./merchInfo.scss";
export default function MerchInfo(props) {
    const [selectedColor, setSelectedColor] = useState(null);
    const handleColorChange = (color) => {
        setSelectedColor(color);
    };
    const renderMerchImage = () => {
        if (props.nome === "Camisola Harry Potter") {
            switch (selectedColor) {
                case "#D99E28":
                    return baseImageLink + "/merch/HPCamisolaYellow.png";
                case "#C69A9B":
                    return baseImageLink + "/merch/HPCamisolaPink.png";
                case "#C5E4CD":
                    return baseImageLink + "/merch/HPCamisolaMint.png";
                case "#747574":
                    return baseImageLink + "/merch/HPCamisola.png";
                default:
                    return baseImageLink + "/merch/HPCamisola.png";
            }
        } else {
            return baseImageLink + props.foto;
        }
    };

    return (
        <div className={"MerchInfo"}>
            <div className={"Foto"} style={{backgroundImage: `url(${renderMerchImage()})`}} />

            <div className={"favorite"}>
                <Favorite id={props.id} type={'merch'}/>
            </div>

            <div className={"Info"}>
                <h4>
                    {props.tipo} <FontAwesomeIcon icon={arrow}/> {props.genero}
                </h4>
                <h1>{props.nome}</h1>

                <div className={"Descricao"}>
                    <Subtitle text={"Descrição"}/>
                    <p>{props.descricao}</p>
                </div>

                {props.nome === "Camisola Harry Potter" && (
                    <>
                        <div className={"Cor"}>
                            <Subtitle text={"Cor"}/>
                            <ColorSelector onColorChange={handleColorChange} />
                        </div>

                        <div className={"Tamanho"}>
                            <Subtitle text={"Tamanho"}/>
                            <SizeSelector/>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
