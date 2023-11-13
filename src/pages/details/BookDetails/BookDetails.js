import "./BookDetails.scss"
import "../../../components/subtitle/subtitle.scss"
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axiosBooks from "../../../util/axiosBooks";

import Subtitle from "../../../components/subtitle/subtitle"
import WhereToBuy from "../../../components/whereToBuy/whereToBuy";
import BookList from "../../../components/bookList/bookList";
import BookInfo from "../../../components/bookInfo/bookInfo";
import Footer from "../../../components/footer/Footer";
import AboutAuthor from "../../../components/aboutAuthor/aboutAuthor";

export default function BookDetails(props) {
    const {id} = useParams();
    const [details, setDetails] = useState(null)

    useEffect(() => {
        axiosBooks.get(`/book/${id}`)
            .then(r => setDetails(r))
            .catch(e => console.log("Error", e))
    })

    console.log(details);

    return <div className={"BookDetail_content"}>

            <div className={"Header"}>
                <h1>Livro</h1>
            </div>

            <div className={"Container"}>
                <BookInfo
                tipo = {"Livro"}
                genero ={"Biográfico"}
                nome = {"Alguém Falou Sobre Nós"}
               autor = {"Irene Vallejo"}
                editora = {"Porto Editora"}
                descricao = {"A sociedade contemporânea vive imersa no imediatismo. Prioriza, sobretudo, o novo e o superficial e não tem tempo para ponderar ou olhar para trás. Felizmente, livros como este convidam-nos a fazer uma pausa para dar espaço às ideias, e dialogar com as vozes que antes levantaram as mesmas questões que nós. Nestas colunas semanais publicadas no jornal espanhol El Heraldo de Aragón, e das quais saem os luminosos ensaios aqui reunidos, Irene Vallejo reflete sobre as diferentes formas de como o presente está ligado à nossa história. A sua prosa límpida, a sua curiosidade inquieta e a paixão fervorosa com que olha para a sabedoria clássica são um lembrete bem-vindo de que a Antiguidade ainda está viva em nós hoje, e que a história não é um processo linear, mas um diálogo intemporal em constante desenvolvimento.Olhando para o passado, Irene Vallejo projeta um novo olhar sobre este mundo cada vez mais incerto, confuso e labiríntico, e fá-lo com uma voz precisa e lírica, que tem a rara qualidade de falar diretamente à experiência pessoal e à intimidade de cada leitor."}
                />

                <AboutAuthor
                nome = {"Irene Vallejo"}
                biografia = {"Irene Vallejo é apaixonada pela mitologia grega e romana desde tenra idade. Estudou Filologia Clássica, doutorando-se nas universidades de Saragoça e Florença. É escritora, colunista do El País e do Heraldo de Aragón, palestrante e promotora de educação e do conhecimento sobre o mundo clássico. Partilha com os outros, diariamente, a sua paixão pela Antiguidade, pelos livros e pela leitura. Em 2020, recebeu o Prémio Nacional de Literatura 2020 (Espanha) na categoria de ensaio com o livro O Infinito Num Junco."}
                />

                    <Subtitle text={"Mais livros de ..."}/>
                    <BookList/>

                <Subtitle text={"Onde Comprar"}/>

                <div className={"WhereToBuyList"}>
                <WhereToBuy
                    nome={"Livraria Aqui Há Gato"}
                    localidade={"Santarém"}
                    distrito={"Santarém"}
                    preco={"15,50€"}/>

                <WhereToBuy
                    nome={"Livraria Aqui Há Gato"}
                    localidade={"Santarém"}
                    distrito={"Santarém"}
                    preco={"15,50€"}/>

                <WhereToBuy
                    nome={"Livraria Aqui Há Gato"}
                    localidade={"Santarém"}
                    distrito={"Santarém"}
                    preco={"15,50€"}/>
            </div>

                <Subtitle text={"Nossas sugestões para ti"}/>
                <BookList/>

                <Subtitle text={"O que os nossos utilizadores pensam sobre este item"}/>

            </div>

        <Footer/>

    </div>
}