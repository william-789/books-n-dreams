import { baseImageLink } from "../../util/axiosBooks";
import React from "react";
import ThirdButton from "../buttons/ThirdButton/ThirdButton";
import {Link} from "react-router-dom";

export default function Merch(props) {
    const { nome, foto, text, disponiveis } = props;
    return (
        <div className={"Merch"}>
            <Link to={`/merch/${props.id}`} className={"Link"}>

            <div className={"ImageContainer"}>
                <div className={"Image"} style={{ backgroundImage: `url(${baseImageLink + foto})` }} />
            </div>
            <div className={"info"}>
                <h3>{nome}</h3>
                <ThirdButton text={disponiveis === 0 ? "Esgotado" : `Desde ${text}€`} disponiveis={disponiveis} />
            </div>
            </Link>
        </div>
    );
}
