import React from "react";
import {Link} from "react-router-dom";
import {baseImageLink} from "../../util/axiosBooks";
import ThirdButton from "../buttons/ThirdButton/ThirdButton";

export default function Merch(props) {
    return <div className={"Merch"}>
        <Link to={`/merch/${props.id}`} className={"Link"}>
            <div className={"ImageContainer"}>
                <div className={"Image"} style={{ backgroundImage: `url(${baseImageLink + props.image})` }} />
            </div>

            <div className={"info"}>
                <h3>{props.name}</h3>

                <ThirdButton text={props.text === undefined ? "Esgotado" : "Desde " + props.text + "€"} />
            </div>

        </Link>
    </div>
}