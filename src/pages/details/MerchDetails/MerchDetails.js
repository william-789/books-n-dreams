import BookInfo from "../../../components/bookInfo/bookInfo";
import Subtitle from "../../../components/subtitle/subtitle";
import WhereToBuy from "../../../components/whereToBuy/whereToBuy";
import WrapList from "../../../components/bookList/wrapList";
import Reviews from "../../../components/reviews/reviews";
import Footer from "../../../components/footer/Footer";
import React, {useEffect, useState} from "react";

import "./MerchDetails.scss"
import axiosBooks from "../../../util/axiosBooks";
import {useParams} from "react-router-dom";
import MerchInfo from "../../../components/merchInfo/merchInfo";

export default function MerchDetails(props) {
    const {id} = useParams();

    const [merch, setMerch] = useState(null);
    const [details, setDetails] = useState(null)
    const [stores, setStores] = useState(null)
    const [genreMerch, setGenreMerch] = useState(null);
    const [genreBooks, setGenreBooks] = useState(null);

    const getData = async () => {
        try {
            await axiosBooks.get(`/item/merch/${id}`).then(r => setDetails(r.data.merch));
            console.log("merch", details) // remover log quando estiver a funcionar

            await Promise.all([

                axiosBooks.get(`item/available/${id}`).then(r => {
                    console.log(r.data.available)
                    setStores(r.data.available)
                }), // replace by available

                axiosBooks.get(`/item/merch/all`, {params: {genero: details.genero_id}}).then(r => {
                    console.log(r.data.merch)
                    setGenreMerch(r.data.merch)
                }),
            ])
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        getData();
    }, [])

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

            <Subtitle text={"Nossas sugestões para ti"}/>
            <WrapList list={genreMerch}/>

            <Reviews
                nota={details.nota}
                avaliacoes={details.avaliacoes}/>
        </div>

        <Footer/>

    </div>
}