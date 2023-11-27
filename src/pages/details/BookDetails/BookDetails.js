import "./BookDetails.scss"
import "../../../components/subtitle/subtitle.scss"
import "../../../components/bookInfo/bookInfo.scss"
import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axiosBooks from "../../../util/axiosBooks";

import Subtitle from "../../../components/subtitle/subtitle"
import WhereToBuy from "../../../components/whereToBuy/whereToBuy";
import BookInfo from "../../../components/bookInfo/bookInfo";
import Footer from "../../../components/footer/Footer";
import AboutAuthor from "../../../components/aboutAuthor/aboutAuthor";
import WrapList from "../../../components/bookList/wrapList";
import Reviews from "../../../components/reviews/reviews";
import PrimaryButton from "../../../components/buttons/PrimaryButton/PrimaryButton";
import UserReview from "../../../components/userReviews/userReviews";

export default function BookDetails(props) {
    const {id} = useParams();

    const [details, setDetails] = useState(null)
    const [stores, setStores] = useState(null)
    const [author, setAuthor] = useState(null);
    const [user, setUser] = useState(null)

    const [authorBooks, setAuthorBooks] = useState(null);
    const [genreBooks, setGenreBooks] = useState(null);
    const [comments, setComments] = useState(null);

    const getData = async () => {
        try {
            let details = await axiosBooks.get(`/book/${id}`).then(r => r.data.book);
            console.log("book", details) // remover log quando estiver a funcionar
            setDetails(details);

            await Promise.all([

                axiosBooks.get(`book/available/${id}`).then(r => {
                    console.log(r.data.available)
                    setStores(r.data.available)
                }),

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

                axiosBooks.get(`/user/${id}`).then(r => {

                    console.log(r.data)
                    setUser(r.data)
                }),

                axiosBooks.get(`/item/comments/${details.item}`).then(r => {
                    console.log(r.data.comments)
                    setComments(r.data.comments)
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
    if (!(details && stores && author && authorBooks && genreBooks && comments)) return null;

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
                        {stores.slice(0, 4).map(s => (
                            <WhereToBuy
                                key={props.id}
                                id={s.id}
                                capa={s.capa}
                                nome={s.nome}
                                localidade={s.localidade}
                                distrito={s.distrito}
                                preco={s.preco}
                                allPrices={stores.map(store => store.preco)}
                            />
                        ))}
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

            <Subtitle text={`Mais livros de ${author.nome}`}/>
            <WrapList list={authorBooks.slice(0, 4)}/>
            <div className={"button"}>
                <Link to={"/search"}>
                    <PrimaryButton text={"Ver mais"}/>
                </Link>
            </div>

            <Subtitle text={"Nossas sugestões para ti"}/>
            <WrapList list={genreBooks.slice(0, 4)}
                      key={details.id}/>
            <div className={"button"}>
                <Link to={"/search"}>
                    <PrimaryButton text={"Ver mais"}/>
                </Link>
            </div>

            <Reviews
                foto={user && user.foto ? user.foto : null}
                nota={details.nota}
                avaliacoes={details.avaliacoes}
            />

            <div className={"UserReviewsList"}>
                {comments !== null && comments.slice(0, 4).map(c => (
                    <UserReview
                        key={c.id}
                        nome={c.nome}
                        comentario={c.comentario}
                        foto={c.foto}
                        nota={c.nota}
                    />
                ))}
            </div>
        </div>

        <Footer/>

    </div>
}