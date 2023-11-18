import Subtitle from "../subtitle/subtitle";
import React from "react";
import {Link} from "react-router-dom";

export default function Bookshop(props) {
    return <div className={"Bookshop"}>
        <Link to={`/bookstore/${props.id}`}>
        <Subtitle text={props.name}></Subtitle>
        <img src={props.image} alt={props.name}/>
        </Link>
    </div>
}