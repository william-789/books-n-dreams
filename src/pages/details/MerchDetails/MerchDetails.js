import "./MerchDetails.scss"
import "../../../components/subtitle/subtitle.scss"
import "../../../components/bookInfo/bookInfo.scss"
import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axiosBooks from "../../../util/axiosBooks";

import Subtitle from "../../../components/subtitle/subtitle"
import WhereToBuy from "../../../components/whereToBuy/whereToBuy";
import Footer from "../../../components/footer/Footer";
import WrapList from "../../../components/bookList/wrapList";
import Reviews from "../../../components/reviews/reviews";
import MerchInfo from "../../../components/merchInfo/merchInfo";
import PrimaryButton from "../../../components/buttons/PrimaryButton/PrimaryButton";
import MerchList from "../../../components/merchList/MerchList";
import {useUser} from "../../../context/userContext";
import Empty from "../../../components/shared/Empty/Empty";
import UserReview from "../../../components/userReviews/userReviews";

export default function MerchDetails(props) {
    const {id} = useParams();
    const { user } = useUser();

    const [details, setDetails] = useState(null)
    const [stores, setStores] = useState(null)
    const [book, setBook] = useState(null)
    const [genreMerch, setGenreMerch] = useState(null);
    const [serieMerch, setSerieMerch] = useState(null);
    const [genreBooks, setGenreBooks] = useState(null);
    const [comments, setComments] = useState(null);
    const [allMerch, setAllMerch] = useState(null);
    const [utilizador, setUtilizador] = useState(null)

    const handleMerchClick = (id) => {
        const topoPaginaElement = document.getElementById('topoPagina');
        if (topoPaginaElement) {
            topoPaginaElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const getData = async () => {
        try {
            let details = await axiosBooks.get(`/item/merch/${id}`).then(r => r.data.merch);
            setDetails(details);

            await Promise.all([

                axiosBooks.get(`/item/available/${id}`).then(r => {
                    setStores(r.data.available)
                }),

                axiosBooks.get(`/item/merch/all`).then(r => {
                    setAllMerch(r.data.merch)
                }),

                axiosBooks.get(`/item/merch/all`, {params: {genero: details.genero_id}}).then(r => {
                    setGenreMerch(r.data.merch)
                }),

                axiosBooks.get(`/item/merch/all`, { params: { serie: details.serie } }).then(r => {
                        setSerieMerch(r.data.merch);
                    }),

                axiosBooks.get(`/book/all`, {params: {genero: details.genero_id}}).then(r => {
                    setGenreBooks(r.data.books)
                }),

                axiosBooks.get(`/book/${details.item}`).then(r => {
                    setBook(r.data.book)
                }),

                axiosBooks.get(`/user/${user.id}`).then((r) => {
                    setUtilizador(r.data.user);
                }),

                axiosBooks.get(`/item/comments/${details.id}`).then(r => {
                    setComments(r.data.comments)
                }),
            ])
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        handleMerchClick(id);
    }, [id]);

    useEffect(() => {
        getData();
    }, [id]);

   useEffect(() => {
        const timeoutId = setTimeout(() => {
            getData();
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, [comments]);

    // remover && false depois de passar os dados corretos
    if (!(details && serieMerch && stores && genreMerch && genreBooks && comments)) return null;

    return <div className={"MerchDetail_content"}>

        <div id="topoPagina" />

        <div className={"Header"}>
            <h1>Merch</h1>
        </div>

        <div className={"Container"}>
            <MerchInfo
                id={details.id}
                foto={details.foto}
                tipo={details.tipo}
                genero={details.genero}
                nome={details.nome}
                descricao={details.descricao}
            />

            <Subtitle text={"Onde Comprar"}/>
            <div className={"WhereToBuyList"}>
                {stores.slice(0, 4).map(s => (
                    <WhereToBuy
                        id={s.id}
                        capa={s.capa}
                        nome={s.nome}
                        localidade={s.localidade}
                        distrito={s.distrito}
                        preco={s.preco}
                        itemId={details.id}
                        allPrices={stores.map((store) => store.preco)}
                        userLocalidade={utilizador ? utilizador.localidade : null}
                    />
                ))}
            </div>

            <Subtitle text={`Produtos relacionados`} />
            {genreMerch.length > 0 ? (
                <>
                    <MerchList list={genreMerch.slice(0, 4)} />
                    {genreMerch.length > 4 && (
                        <div className={"button"}>
                            <Link to={"/search"}>
                                <PrimaryButton text={"Ver mais"} />
                            </Link>
                        </div>
                    )}
                </>
            ) : (
                <Empty text={"Sem produtos relacionados"} />
            )}

            <Subtitle text={`Livros relacionados`} />
            {genreBooks.length > 0 ? (
                <>
                    <WrapList list={genreBooks.slice(0, 4)} key={details.id} />
                    {genreBooks.length > 4 && (
                        <div className={"button"}>
                            <Link to={"/search"}>
                                <PrimaryButton text={"Ver mais"} />
                            </Link>
                        </div>
                    )}
                </>
            ) : (
                <Empty text={"Sem livros relacionados"} />
            )}

            <Subtitle text={"Nossas sugestões para ti"} />
            {serieMerch.length > 10? (
                <>
                    <MerchList list={serieMerch.slice(0, 4)} details={details} />
                    <div className={"button"}>
                        <Link to={"/search"}>
                            <PrimaryButton text={"Ver mais"} />
                        </Link>
                    </div>
                </>
            ) : (
                <MerchList list={serieMerch} details={details} />
            )}


            <Reviews
                foto={user && user.foto ? user.foto : null}
                nota={details.nota}
                avaliacoes={details.avaliacoes}
                id={details.id}
            />

            <div className={"UserReviewsList"}>
                {comments !== null &&
                    comments.slice(0, 4).map((c) => (
                        <UserReview
                            key={c.id}
                            nome={c.nome}
                            comentario={c.comentario}
                            foto={c.foto}
                            nota={c.nota}/>
                    ))}
            </div>

        </div>

        <Footer/>

    </div>
}