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

export default function MerchDetails(props) {
    const {id} = useParams();

    const [details, setDetails] = useState(null)
    const [stores, setStores] = useState(null)
    const [genreMerch, setGenreMerch] = useState(null);
    const [genreBooks, setGenreBooks] = useState(null);
    const [comments, setComments] = useState(null);
    const [user, setUser] = useState(null);
    const [allMerch, setAllMerch] = useState(null);

    const getData = async () => {
        try {
            let details = await axiosBooks.get(`/item/merch/${id}`).then(r => r.data.merch);
            // console.log("merch", details)
            setDetails(details);

            await Promise.all([

                axiosBooks.get(`/item/available/${id}`).then(r => {
                    //console.log(r.data.available)
                    setStores(r.data.available)
                }), // replace by available

                axiosBooks.get(`/item/merch/all`).then(r => {
                    // console.log(r.data.merch)
                    setAllMerch(r.data.merch)
                }),

                axiosBooks.get(`/item/merch/all`, {params: {genero: details.genero_id}}).then(r => {
                   // console.log(r.data.merch)
                    setGenreMerch(r.data.merch)
                }),

                axiosBooks.get(`/book/all`, {params: {genero: details.genero_id}}).then(r => {
                    // console.log(r.data.books)
                    setGenreBooks(r.data.books)
                }),

                axiosBooks.get(`/user/${id}`).then(r => {
                    // console.log(r.data)
                    setUser(r.data)
                }),

                axiosBooks.get(`/item/comments/${details.item}`).then(r => {
                    // console.log(r.data.comments)
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

    console.log(details, stores, genreMerch, genreBooks, comments);

    // remover && false depois de passar os dados corretos
    if (!(details && allMerch && stores && genreMerch && genreBooks && comments)) return null;

    return <div className={"MerchDetail_content"}>

        <div className={"Header"}>
            <h1>Merch</h1>
        </div>

        <div className={"Container"}>
            <MerchInfo
                foto={details.foto}
                tipo={details.tipo}
                genero={details.genero}
                nome={details.nome}
                descricao={details.descricao}/>

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
            </div>

            <Subtitle text={`Produtos relacionados`}/>
            <WrapList list={genreMerch.slice(0, 4)}/>
            <div className={"button"}>
                <Link to={"/search"}>
                    <PrimaryButton text={"Ver mais"}/>
                </Link>
            </div>

            <Subtitle text={`Livros relacionados`}/>
            <WrapList list={genreBooks.slice(0, 4)}/>
            <div className={"button"}>
                <Link to={"/search"}>
                    <PrimaryButton text={"Ver mais"}/>
                </Link>
            </div>

            <Subtitle text={"Nossas sugestões para ti"}/>
            <WrapList list={allMerch.slice(0,4)}/>
            <Link to={"/search"}>
                <PrimaryButton text={"Ver mais"}/>
            </Link>

            <Reviews
                foto={user && user.foto ? user.foto : null}
                nota={details.nota}
                avaliacoes={details.avaliacoes}/>
        </div>

        <Footer/>

    </div>
}