import "./bookInfo.scss";
import Favorite from "../../pages/favorite/favorite";
import Subtitle from "../subtitle/subtitle";
import React from "react";

export default function BookInfo(props) {
    return <div className={"BookInfo"}>

        <div className={"Capa"}>
          <img src={props.foto}/>
            <Favorite/>
        </div>

        <div className={"Info"}>
        <p>{props.tipo + ", " + props.genero}</p>
        <h1>{props.nome}</h1>
        <h2>de {props.autor}</h2>
        <h3>{props.editora}</h3>

        <div className={"Sinopse"}>
            <Subtitle text={"Sinopse"}/>
            <p>{props.descricao}</p>
        </div>

    </div>

</div>
}