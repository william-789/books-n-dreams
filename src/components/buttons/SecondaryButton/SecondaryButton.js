import React from "react";
import "./SecondaryButton.scss"

export default function SecondaryButton(props) {
    return <div className={"SecondaryButton"}>
        <button className="button"> {props.text}</button>
    </div>
}