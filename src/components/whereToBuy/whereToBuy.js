import React, {useState, useEffect} from "react";
import "./whereToBuy.scss";
import SecondaryButton from "../buttons/SecondaryButton/SecondaryButton";
import {baseImageLink} from "../../util/axiosBooks";
import {Link, useParams} from "react-router-dom";

export default function WhereToBuy(props) {
    const [isCheapest, setIsCheapest] = useState(false);
    const [libraryIsNear, setLibraryIsNear] = useState(false);

    useEffect(() => {
        if (Array.isArray(props.allPrices) && props.allPrices.length > 0) {
            const isCurrentCheapest = props.allPrices.reduce(
                (cheapest, price) => (price < cheapest ? price : cheapest),
                props.allPrices[0]
            );
            setIsCheapest(props.preco === isCurrentCheapest);
        }
    }, [props.preco, props.allPrices]);

    useEffect(() => {
        if (props.user && typeof props.localidade === 'string' && typeof props.user.localidade === 'string') {
            const isSameLocation = props.localidade.toLowerCase() === props.user.localidade.toLowerCase();
            setLibraryIsNear(isSameLocation);
        } else {
            setLibraryIsNear(false);
        }
        console.log("userLocalidade", props.user);

    }, [props.localidade, props.user]);

    return (
        <div className={`WhereToBuy ${isCheapest ? "cheapest" : ""}`}>
            <Link to={`/bookstore/${props.id}`} className={"Link"}>
                <div className="image" style={{ backgroundImage: `url(${baseImageLink + props.capa})` }} />
                {isCheapest && <div className="cheapestIndicator">Mais barato</div>}
                <div className="info">
                    <h3>{props.nome}</h3>
                    <p>{props.localidade + ", " + props.distrito}</p>
                    <h4>{props.preco}€</h4>

                    {props.userLocalidade && libraryIsNear && (
                        <div className="libraryNearIndicator">Mais perto</div>
                    )}
                </div>
            </Link>
            <SecondaryButton className="SecondaryButton" text={"Adicionar ao carrinho"} />
        </div>


    );
}
