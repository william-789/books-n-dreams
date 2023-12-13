import "./bookInfo.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleRight as arrow} from "@fortawesome/free-solid-svg-icons";
import {baseImageLink} from "../../util/axiosBooks";

import Favorite from "../../components/favorite/favorite";
import Subtitle from "../subtitle/subtitle";
import React from "react";

export default function BookInfo(props) {
    return (<div className={"BookInfo"}>
                    <div className={"Capa"}
                         style={{backgroundImage: `url(${baseImageLink + props.foto})`}}/>

            <div className={"favorite"}>
                <Favorite id={props.id} type={'livro'}/>
            </div>

                    <div className={"Info"}>
                        <h4>
                            {props.tipo} <FontAwesomeIcon icon={arrow}/> {props.genero}
                        </h4>
                        <h1>{props.nome}</h1>
                        <h2>de {props.autor}</h2>
                        <h3>{props.editora}</h3>

                        <div className={"Sinopse"}>
                            <Subtitle text={"Sinopse"}/>
                            <p>{props.sinopse}</p>
                        </div>
                    </div>
                </div>
            );
}
