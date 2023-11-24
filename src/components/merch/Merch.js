import React from "react";
import {Link} from "react-router-dom";
import {baseImageLink} from "../../util/axiosBooks";
import ThirdButton from "../buttons/ThirdButton/ThirdButton";

export default function Merch(props) {
    return <div className={"Merch"}>
        <Link to={`/merch/${props.id}`}>
            <div className={"image"}>
                <img src={baseImageLink + props.image} alt={props.name}/>
            </div>

            <div className={"info"}>
                <h3>{props.name}</h3>

                <ThirdButton text={props.text === undefined ? "Esgotado" : "Desde " + props.text + "€"} />
            </div>

        </Link>
    </div>
}