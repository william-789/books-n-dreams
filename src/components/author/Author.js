import React from "react";
import {Link} from "react-router-dom";

export default function Author(props) {

    return <div className={"Author"}>
        <Link to={`/author/${props.id}`}>
            <img src={props.image} alt={props.name}/>
            <h2>{props.name}</h2>
        </Link>
    </div>
}