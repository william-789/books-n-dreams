import {baseImageLink} from "../../util/axiosBooks";
import Favorite from "../favorite/favorite";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleRight as arrow} from "@fortawesome/free-solid-svg-icons";
import Subtitle from "../subtitle/subtitle";
import React from "react";

export default function MerchInfo (props) {
    return(<div className={"MerchInfo"}>
            <div className={"Foto"}
                 style={{backgroundImage: `url(${baseImageLink + props.foto})`}}/>
            <Favorite/>

            <div className={"Info"}>
                <h4>
                    {props.tipo} <FontAwesomeIcon icon={arrow}/> {props.genero}
                </h4>
                <h1>{props.nome}</h1>

                <div className={"Descricao"}>
                    <Subtitle text={"Descricao"}/>
                    <p>{props.descricao}</p>
                </div>
            </div>
        </div>
    )
}