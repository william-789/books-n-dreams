import {baseImageLink} from "../../util/axiosBooks";
import Favorite from "../favorite/favorite";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleRight as arrow} from "@fortawesome/free-solid-svg-icons";
import Subtitle from "../subtitle/subtitle";
import React from "react";

import "./merchInfo.scss"
import SizeSelector from "../sizeSelector/sizeSelector";
import ColorSelector from "../colorSelector/colorSelector";

export default function MerchInfo(props) {
    return (<div className={"MerchInfo"}>
            <div className={"Foto"}
                 style={{backgroundImage: `url(${baseImageLink + props.foto})`}}/>
            <Favorite id={props.id} type={'merch'}/>

            <div className={"Info"}>
                <h4>
                    {props.tipo} <FontAwesomeIcon icon={arrow}/> {props.genero}
                </h4>
                <h1>{props.nome}</h1>

                <div className={"Descricao"}>
                    <Subtitle text={"Descrição"}/>
                    <p>{props.descricao}</p>
                </div>

                <div className={"Cor"}>
                    <Subtitle text={"Cor"}/>
                    <ColorSelector/>
                </div>

                <div className={"Tamanho"}>
                    <Subtitle text={"Tamanho"}/>
                    <SizeSelector/>
                </div>
            </div>
        </div>
    )
}
