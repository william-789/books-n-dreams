import React, { useState, useEffect } from "react";
import "./whereToBuy.scss";
import axiosBooks, { baseImageLink } from "../../util/axiosBooks";
import { Link } from "react-router-dom";
import { useUser } from "../../context/userContext";
import { useError } from "../../context/errorContext";

export default function WhereToBuy(props) {
    const { user } = useUser();
    const { showError } = useError();

    const [isCheapest, setIsCheapest] = useState(false);
    const [libraryIsNear, setLibraryIsNear] = useState(false);
    const [utilizador, setUtilizador] = useState({});

    const handleAddItemToCart = async () => {
        try {
            const pedido = {
                quantity: 1,
                id: props.itemId,
                store: props.id,
            };

            console.log("Pedido: ", pedido);

            const token = localStorage.getItem("token");

            const response = await axiosBooks.post(`/item/add-to-cart/`, pedido, {
                headers: { "token-header": token },
            });

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
        const fetchUser = async () => {
            try {
                const response = await axiosBooks.get(`/user/${user.id}`);
                setUtilizador(response.data.user.localidade);
            } catch (error) {
                console.error('Erro ao obter detalhes do utilizador:', error);
            }
        };

        fetchUser();

        console.log('Before condition check');
        if (props.userLocalidade && typeof props.localidade === 'string') {
            const isSameLocation = props.localidade.toLowerCase() === props.userLocalidade.toLowerCase();
            setLibraryIsNear(isSameLocation);
            console.log('isSameLocation:', isSameLocation);
        } else {
            setLibraryIsNear(false);
        }


        console.log('After condition check');

    }, [props.localidade, utilizador, props.userLocalidade]);

    return (
        <div className={`WhereToBuy ${isCheapest ? "cheapest" : ""}`}>
            <Link to={`/bookstore/${props.id}`} className={"Link"}>
                <div
                    className="image"
                    style={{ backgroundImage: `url(${baseImageLink + props.capa})` }}
                />

                <div className={"indicators"}>
                {isCheapest && (
                    <div className="cheapestIndicator">Mais barato</div>
                )}

                {props.userLocalidade && libraryIsNear && (
                    <div className="libraryNearIndicator">Mais perto</div>
                )}
                </div>

                <div className="info">
                    <h3>{props.nome}</h3>
                    <p>{props.localidade + ", " + props.distrito}</p>
                    <h4>{props.preco}€</h4>
                </div>

            </Link>

            <button className="Button" onClick={handleAddItemToCart}>
                Adicionar ao carrinho
            </button>
        </div>
    );
}
