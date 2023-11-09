import "./BookDetails.scss"
import NavBar from "../../navbar/NavBar";

import Subtitle from "../../../components/subtitle/subtitle"
import WhereToBuy from "../../../components/whereToBuy/whereToBuy";

import React from "react";
import "../../../components/subtitle/subtitle.scss"

export default function BookDetails(props) {
    return <div className={"BookDetail"}>
    <NavBar/>

    <div className={"Container"}>
      <div className={"Wrapper"}>
      <div className={"Header"}>
          <h1>Livros</h1>
      </div>

          <Subtitle text={"Sinopse"}/>
          <Subtitle text={"Sobre o Autor"}/>

          <Subtitle text={"Onde Comprar"}/>
          <WhereToBuy/>

          <Subtitle text={"Mais livros de ..."}/>

          <Subtitle text={"Nossas sugestões para ti"}/>

          <Subtitle text={"O que os nossos utilizadores pensam sobre este item"}/>

      </div>
    </div>
</div>
}