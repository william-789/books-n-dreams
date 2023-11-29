import React from "react";
import './UserItems.scss'
import Favorite from "../favorite/favorite";
import UserLine from "./UserLine";

export default function UseItems(props) {

    return (
        <div className={"userItems-Library"}>
            <div className={"userItems-LibraryImage"}></div>

            <div className={"userItems-LibraryText"}>
                <div className={"texts"}>
                    <div className={"name"}>ALGUÉM FALOU SOBRE NÓS</div>
                    <div className={"author"}>Irene Valejo</div>
                    <div className={"library"}><strong>Livraria</strong> Centésima Página</div>

                    <div className={"quantity"}>
                        <div className={"quantity-buttons"}>
                            <button className={"plus"}>+</button>
                            <label className={"quantity-value"}>1</label>
                            <button className={"minus"}>-</button>
                            <button className={"remove"}>Remover</button>
                        </div>
                        <span className={"price"}>12,00€</span>
                    </div>
                </div>
            </div>


        </div>
    );
}
