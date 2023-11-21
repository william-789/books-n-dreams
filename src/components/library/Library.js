
import React from "react";
import './Library.scss';
import {Link} from "react-router-dom";

export default function Library(props) {

    return <div className="banner-library">

        <div className="right">
            <div className="library-text">
                <p className={"title"}><strong>Livraria da Semana</strong><br/></p>

                <h1 className={"slogan"}>Aqui Há Gato</h1>
                <p className={"text"}>Santarém, Portugal</p>

                <Link to={"/bookstore/6"}>
                    <div className={"box"} id={"mais-info"}>
                        <button className="btn-mais-info"><strong>Mais Informações</strong></button>
                    </div>
                </Link>
            </div>
        </div>
    </div>
}