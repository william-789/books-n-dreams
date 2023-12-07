// BookPrice.js
import "./BookPrice.scss";
import ThirdButton from "../buttons/ThirdButton/ThirdButton";
import { Link } from "react-router-dom";
import { baseImageLink } from "../../util/axiosBooks";
import React from "react";

export default function BookPrice(props) {
    const showLastUnits = props.disponiveis && props.disponiveis < 2;
    const isEsgotado = props.disponiveis === 0;

    return (
        <div className={`BookPrice ${isEsgotado ? 'esgotado' : ''}`}>
            <Link to={`/book/${props.id}`} className={"Link"} >
                <div className={"ImageContainer"}>
                    <div className={"Image"} style={{ backgroundImage: `url(${baseImageLink + props.foto})` }} />
                </div>

                <div className={"Info"}>
                    <h3>{props.nome}</h3>
                    <h4>{props.autor}</h4>

                    <ThirdButton text={isEsgotado ? "Esgotado" : ` ${props.text}€`} disponiveis={props.disponiveis} />
                </div>

                {props.disponiveis > 0 && showLastUnits && <p className={"LastUnits"}>Últimas unidades</p>}
            </Link>
        </div>
    );
}
