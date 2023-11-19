import {baseImageLink} from "../../../util/axiosBooks";
import React from "react";
import {Link} from "react-router-dom";

export default function GeneralSearch(props) {
    return <div className={"GeneralSearch content"}>

        <div className={"container"}>
            <h1>O que pretende pesquisar?</h1>

            <div className={"bannerList"}>

                <Link to={"/search-book"} className={"link"}>
                <div className={"banner"}
                     style={{backgroundImage: `url(${baseImageLink + "/banners/livro.png"})`}}>
                    <h2>LIVROS</h2>
                </div>
                </Link>

                <Link to={"/search-bookshop"} className={"link"}>
                <div className={"banner"}
                     style={{backgroundImage: `url(${baseImageLink + "/banners/livraria.png"})`}}>
                    <h2>LIVRARIAS</h2>
                </div>
                </Link>

                <Link to={"/search-merch"} className={"link"}>
                <div className={"banner"}
                     style={{backgroundImage: `url(${baseImageLink + "/banners/merch.png"})`}}>
                    <h2>MERCHANDISING</h2>
                </div>
                </Link>

                <Link to={"/search-author"} className={"link"}>
                <div className={"banner"}
                     style={{backgroundImage: `url(${baseImageLink + "/banners/autor.png"})`}}>
                    <h2>AUTORES</h2>
                </div>
                </Link>

            </div>
        </div>
    </div>
}