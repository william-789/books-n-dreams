import React from "react";
import "./PrimaryButton.scss";

export default function PrimaryButton(props) {
    return <div className={"PrimaryButton"}>
        <button className="button"> {props.text}</button>
    </div>
}