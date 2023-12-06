import React from "react";
import './PurchaseItems.scss'
import Favorite from "../favorite/favorite";

export default function PurchaseItems(props) {

    return (
        <div className={"purchaseItems-Library"}>
            <div className={"purchaseItems-LibraryImage"}></div>

            <div className={"purchaseItems-LibraryText"}>
                <div className={"texts"}>
                    <div className={"name"}>ALGUÉM FALOU SOBRE NÓS</div>
                    <div className={"author"}>Irene Valejo</div>
                    <div className={"library"}><strong>Livraria</strong> Centésima Página</div>

                    <div className={"purchaseItems-quantity"}>
                        <div className={"quantity"}>
                            <label className={"purchaseItems-title"}>Qnt</label>
                            <label className={"purchaseItems-value"}>1</label>
                        </div>
                        <span className={"price"}>12,00€</span>
                    </div>
                </div>
            </div>


        </div>
    );
}
