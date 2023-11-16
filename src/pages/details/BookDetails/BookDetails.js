import "./BookDetails.scss"
import "../../../components/subtitle/subtitle.scss"
import "../../../components/bookInfo/bookInfo.scss"
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
    const {id} = useParams();
    const [details, setDetails] = useState(null)
    const [stores, setStores] = useState(null)
    const [author, setAuthor] = useState(null);

    const [authorBooks, setAuthorBooks] = useState(null);
    const [genreBooks, setGenreBooks] = useState(null);

    const getData = async () => {
        try {
            await axiosBooks.get(`/book/${id}`).then(r => setDetails(r.data.book));
            console.log("book", details) // remover log quando estiver a funcionar

            await Promise.all([

                axiosBooks.get(`book/available/${id}`).then(r => {
                    console.log(r.data.available)
                    setStores(r.data.available)
                }), // replace by available

                axiosBooks.get(`/author/${details.autor_id}`).then(r => {
                    console.log(r.data.author)
                    setAuthor(r.data.author)
                }),

                axiosBooks.get(`/book/all`, {params: {autor: details.autor_id}}).then(r => {
                    console.log(r.data.books)
                    setAuthorBooks(r.data.books)
                }),

                axiosBooks.get(`/book/all`, {params: {genero: details.genero_id}}).then(r => {
                    console.log(r.data.books)
                    setGenreBooks(r.data.books)
                }),
            ])
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        getData();
    }, [])

    // remover && false depois de passar os dados corretos
    if (!(details && stores && author && authorBooks && genreBooks)) return null;

    return <div className={"BookDetail_content"}>

        <div className={"Header"}>
            <h1>Livro</h1>
        </div>

        <div className={"Container"}>
            <BookInfo
                foto={details.foto}
                tipo={details.tipo}
                genero={details.genero}
                nome={details.nome}
                autor={details.autor}
                editora={details.editora}
                sinopse={details.sinopse}/>

            <div className={"Multiple"}>

                <div className={"ContainerLeft"}>

                    <Subtitle text={"Onde Comprar"}/>
                    <div className={"WhereToBuyList"}>
                        {stores.map(s => {
                            return <WhereToBuy
                                capa={s.capa}
                                nome={s.nome}
                                localidade={s.localidade}
                                distrito={s.distrito}
                                preco={s.preco}
                            />
                        })}

                    </div>
                </div>

                <div className={"ContainerRight"}>
                    <AboutAuthor
                        foto={author.foto}
                        nome={author.nome}
                        biografia={author.biografia}
                    />
                </div>
            </div>
            <Subtitle text={`Mais livros de ${author.nome}`} />
            <WrapList list={authorBooks} />

            <Subtitle text={"Nossas sugestões para ti"}/>
            <WrapList list={genreBooks}/>

            <Reviews
                nota={details.nota}
                avaliacoes={details.avaliacoes}/>
        </div>

        <Footer/>

    </div>
}
