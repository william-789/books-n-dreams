import React from "react";
import "./PrimaryButton.scss";

export default function PrimaryButton(props) {
    return <div className={"PrimaryButton"}>
        <h1>{props.text}</h1>
    </div>
}