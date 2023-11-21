import React, { useState, useEffect } from "react";
import "./whereToBuy.scss";
import SecondaryButton from "../buttons/SecondaryButton/SecondaryButton";
import { baseImageLink } from "../../util/axiosBooks";

export default function WhereToBuy(props) {
    const [isCheapest, setIsCheapest] = useState(false);

    useEffect(() => {
        // Certifique-se de que props.allPrices é uma array antes de usar reduce
        if (Array.isArray(props.allPrices) && props.allPrices.length > 0) {
            // Verificar se o preço atual é o mais barato na lista
            const isCurrentCheapest = props.allPrices.reduce(
                (cheapest, price) => (price < cheapest ? price : cheapest),
                props.allPrices[0]
            );

            setIsCheapest(props.preco === isCurrentCheapest);
        }
    }, [props.preco, props.allPrices]);

    return (
        <div className={`WhereToBuy ${isCheapest ? "cheapest" : ""}`}>
            <div
                className={"image"}
                style={{ backgroundImage: `url(${baseImageLink + props.capa})` }}
            />

            {isCheapest && (<div className="cheapestIndicator">Mais barato</div>)}

            <div className={"info"}>
                <h3>{props.nome}</h3>
                <p>{props.localidade + ", " + props.distrito}</p>
                <h4>{props.preco}€</h4>

                <SecondaryButton text={"Adicionar ao carrinho"} />

            </div>
        </div>
    );
}
