import React from "react";
import './UserItems.scss'
import { baseImageLink } from "../../util/axiosBooks";

export default function UseItems(props) {
    const bgImage = {
        backgroundImage: `url(${baseImageLink+props.foto})`,
    };


    return (
        <div className={"userItems-Library"}>
            <div className={"userItems-LibraryImage"} style={bgImage}></div>

            <div className={"userItems-LibraryText"}>
                <div className={"texts"}>
                    <div className={"name"}>{props.nome}</div>
                    <div className={"author"}>{props.autor}</div>
                    <div className={"library"}><strong>Livraria:</strong>{props.livraria}</div>

                    <div className={"quantity"}>
                        <div className={"quantity-buttons"}>
                            <button className={"plus"} onClick={props.increment}>+</button>
                            <label className={"quantity-value"}>{props.unidades}</label>
                            <button className={"minus"} onClick={props.decrement}>-</button>
                            <button className={"remove"} onClick={props.remove}>Remover</button>
                        </div>
                        <span className={"price"}>{props.unidades*(+props.preco)}€</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
