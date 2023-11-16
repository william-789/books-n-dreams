// WhereToBuy.js

import "./whereToBuy.scss";
import SecondaryButton from "../buttons/SecondaryButton/SecondaryButton";
import { baseImageLink } from "../../util/axiosBooks";
import React from "react";

export default function WhereToBuy(props) {
    return (
        <div className={"WhereToBuy"}>
            <div className={"image"} style={{ backgroundImage: `url(${baseImageLink + props.capa})` }} />

            <div className={"info"}>
                <h3>{props.nome}</h3>
                <p>{props.localidade + ", " + props.distrito}</p>
                <h4>{props.preco}€</h4>

                <SecondaryButton text={"Adicionar ao carrinho"} />
            </div>
        </div>
    );
}
