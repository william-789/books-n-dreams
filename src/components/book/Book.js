import React from "react";
import './Book.scss';
import {Link} from "react-router-dom";


export default function Book(props) {

    return <div className="Livro">


        <Link to={`/book/id`} >
            <div className="livro-image"></div>
        </Link>

        <p className="title">ALGUEM FALOU SOBRE NÓS</p>
        <p className="nome">Irene Vallejo</p>

        <Link to={"/shopping-cart"} >
                <button className="btn-desde">Desde 14.00€</button>
        </Link>

    </div>


}