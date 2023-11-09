import React from "react";
import "./subtitle.scss"

export default function Subtitle(props) { 
    return (
        <div className={"Subtitles"}>
            <h2>{props.text}</h2>
        </div>
    );
}
