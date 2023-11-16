import "./BookDetails.scss"
import "../../../components/subtitle/subtitle.scss"
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axiosBooks from "../../../util/axiosBooks";

import Subtitle from "../../../components/subtitle/subtitle"
import WhereToBuy from "../../../components/whereToBuy/whereToBuy";
import BookInfo from "../../../components/bookInfo/bookInfo";
import Footer from "../../../components/footer/Footer";
import AboutAuthor from "../../../components/aboutAuthor/aboutAuthor";
import WrapList from "../../../components/bookList/wrapList";
import Reviews from "../../../components/reviews/reviews";

export default function BookDetails(props) {
    const {id, autor, genero} = useParams();
    const [details, setDetails] = useState(null)
    const [store, setStore] = useState(null)
    const [books, setBooks] = useState(null);
    const [author, setAuthor] = useState(null);

    const [authorBooks, setauthorBooks] = useState(null);
    const [genreBooks, setGenreBooks] = useState(null);

    useEffect(() => {
        axiosBooks.get(`/store/${id}`)
            .then(r => setStore(r.data.stores))
            .catch(e => console.log("Error", e))
    },[])

    useEffect(() => {
        axiosBooks.get(`/book/${id}`)
            .then(r => setDetails(r.data))
            .catch(e => console.log("Error", e))
    }, []);

    useEffect(() => {
        axiosBooks.get(`/book/all`)
            .then(r => setBooks(r.data.books))
            .catch(e => console.log("Error", e))
    }, [])

    useEffect(() => {
        axiosBooks.get(`/book/all`, {params:{autor:autor.id}})
            .then(r => setauthorBooks(r.data.books))
            .catch(e => console.log("Error", e))
    }, [])

    useEffect(() => {
        axiosBooks.get(`/book/all`, {params:{genero:genero.id}})
            .then(r => setGenreBooks(r.data.books))
            .catch(e => console.log("Error", e))
    }, [])

    useEffect(() => {
        axiosBooks.get(`/author/${id}`)
            .then(r => setAuthor(r.data.author))
            .catch(e => console.log("Error", e))
    }, [])

    console.log(details);
    console.log(books);
    console.log(author);

    return <div className={"BookDetail_content"}>

        <div className={"Header"}>
            <h1>Livro</h1>
        </div>

        <div className={"Container"}>

            <BookInfo
                tipo={details.tipo}
                genero={details.genero}
                nome={details.nome}
                autor={details.autor}
                editora={details.editora}
                descricao={details.descricao}
            />

            <div className={"Multiple"}>

                <div className={"ContainerLeft"}>

                    <Subtitle text={"Onde Comprar"}/>
                    <div className={"WhereToBuyList"}>
                        {store.map(s => {
                          return  <WhereToBuy
                              key={store.id}
                              capa={store.capa}
                              nome={store.nome}
                              localidade={store.localidade}
                              distrito={store.distrito}
                              preco={store.preco} // verificar o preço para o item
                          />
                        })}

                    </div>
                </div>

                <div className={"ContainerRight"}>
                    <AboutAuthor
                        nome={autor.nome}
                        biografia={autor.biografia}
                    />
                </div>
            </div>

            <Subtitle text={"Mais livros de ${autor.nome}"}/>
            <WrapList books={authorBooks}/>

            <Subtitle text={"Nossas sugestões para ti"}/>
            <WrapList books={genreBooks}/>

            <Reviews/>
        </div>

        <Footer/>

    </div>
}