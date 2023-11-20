import Subtitle from "../subtitle/subtitle";
import React from "react";
import {Link} from "react-router-dom";

export default function Merch(props) {
    return <div className={"Merch"}>
        <Link to={`/merch/${props.id}`}>
            <Subtitle text={props.name}></Subtitle>
            <img src={props.image} alt={props.name}/>
        </Link>
    </div>
}