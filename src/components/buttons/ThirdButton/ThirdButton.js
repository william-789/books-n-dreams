import React from "react";
import "./ThirdButton.scss"

export default function ThirdButton(props) {
    return <div className={"ThirdButton"}>
        <button className="button"> {props.text}</button>
    </div>
}