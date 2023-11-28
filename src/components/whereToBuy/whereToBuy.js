import React, {useState, useEffect} from "react";
import "./whereToBuy.scss";
import axiosBooks, {baseImageLink} from "../../util/axiosBooks";
import {Link} from "react-router-dom";
import {useUser} from "../../context/userContext";
import {useError} from "../../context/errorContext";

export default function WhereToBuy(props) {
    const {user} = useUser();
    const {showError} = useError()

    const [isCheapest, setIsCheapest] = useState(false);
    const [libraryIsNear, setLibraryIsNear] = useState(false);

    const handleAddItemToCart = async () => {

        try {
            const pedido = {
                id: props.itemId,
                idBuyer: user.id,
                store: props.id,
            };

            console.log("Pedido: ", pedido);

            const token = localStorage.getItem("token");

            const response = await axiosBooks.post(`/item/add-to-cart/`, pedido, {headers: {'token-header': token}});

            if (response.status === 200) {
                console.log("Adicionado ao carrinho com sucesso");
            } else {
                showError(response.data.message || "Falha ao adicionar ao carrinho");
            }

            console.log("Após enviar o pedido");

        } catch (error) {
            console.error("Erro ao adicionar ao carrinho:", error);

            showError("Erro ao adicionar ao carrinho");
        }
    };


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
        if (user && user.localidade && typeof props.localidade === 'string') {
            const isSameLocation = props.localidade.toLowerCase() === user.localidade.toLowerCase();
            setLibraryIsNear(isSameLocation);
        } else {
            setLibraryIsNear(false);
        }

        console.log("userLocalidade", user);

    }, [props.localidade, user]);


    return (
        <div className={`WhereToBuy ${isCheapest ? "cheapest" : ""}`}>
            <Link to={`/bookstore/${props.id}`} className={"Link"}>
                <div className="image" style={{backgroundImage: `url(${baseImageLink + props.capa})`}}/>
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

            <button className="Button" onClick={handleAddItemToCart}>
                Adicionar ao carrinho
            </button>

        </div>


    );
}
