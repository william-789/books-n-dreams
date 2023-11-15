import "./aboutAuthor.scss";
import React from "react";
import Subtitle from "../subtitle/subtitle";

export default function AboutAuthor(props) {
    return (
        <div className={"AboutAuthor"}>
            <Subtitle text={"Sobre o Autor"} />

            <div className={"ContentWrapper"}>
                <div className={"Image"}>
                    <img src={props.foto} />
                </div>

                <div className={"Info"}>
                    <h2>{props.nome}</h2>
                    <p>{props.biografia}</p>
                </div>
            </div>
        </div>
    );
}
