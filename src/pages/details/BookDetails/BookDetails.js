import "./BookDetails.scss"
import "../../../components/subtitle/subtitle.scss"

import Subtitle from "../../../components/subtitle/subtitle"
import WhereToBuy from "../../../components/whereToBuy/whereToBuy";

import React from "react";
import PrimaryButton from "../../../components/buttons/PrimaryButton/PrimaryButton";
import ThirdButton from "../../../components/buttons/ThirdButton/ThirdButton";
import BookInfo from "../../../components/bookInfo/bookInfo";

export default function BookDetails(props) {
    return <div className={"BookDetail"}>
        <div className={"Container"}>

            <div className={"Header"}>
                <h1>Livro</h1>
            </div>
            <div className={"Wrapper"}>

                <Subtitle text={"Sinopse"}/>
                <Subtitle text={"Sobre o Autor"}/>

                <Subtitle text={"Onde Comprar"}/>
                <WhereToBuy
                    nome={"Livraria Aqui Há Gato"}
                    localidade={"Santarém"}
                    distrito={"Santarém"}
                    preco={"15,50€"}/>

                <Subtitle text={"Mais livros de ..."}/>
                <BookInfo
                nome={"OS ESQUECIDOS DE DOMINGO"}
                autor={"Irene Vallejo"}/>

                <Subtitle text={"Nossas sugestões para ti"}/>

                <Subtitle text={"O que os nossos utilizadores pensam sobre este item"}/>

                <PrimaryButton text={"Compra Agora!"}/>

                <ThirdButton text={"Desde 15,50€"}/>
            </div>
        </div>
    </div>
}