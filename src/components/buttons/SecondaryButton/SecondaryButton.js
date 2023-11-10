import React from "react";
import "./SecondaryButton.scss"

export default function SecondaryButton(props) {
    return <div className={"SecondaryButton"}>
        <h4>{props.text}</h4>
    </div>
}