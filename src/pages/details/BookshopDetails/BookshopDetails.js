import {useParams} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import axiosBooks, {baseImageLink} from "../../../util/axiosBooks";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from '@fortawesome/free-solid-svg-icons'
import Favorite from "../../favorite/favorite";
import Subtitle from "../../../components/subtitle/subtitle";

export default function BookshopDetails(props) {
    const {id} = useParams();
    const [details, setDetails] = useState(null);

    useEffect(() => {
        axiosBooks.get(`/store/${id}`)
            .then(r => setDetails(r.data))
            .catch(e => console.log("Error", e))
    },[])

    if(!details) {
        return null
    }

    let bookstoreInfo = details.bookstore.info
    let bookstorePhoto = details.bookstore.fotos.filter(l => {
        return l.particularidade === null
    })
    let special = details.bookstore.fotos.find(l => {
        return l.particularidade !== null
    })

    return <div className={"BookshopDetails content"}>

        <div className={"header"}>
            <div className={"banner"}
                 style={{backgroundImage: `url(${baseImageLink + bookstoreInfo.capa})`}}/>

            <div className={"favorite"}>
                <Favorite/>
            </div>
        </div>

        <div className={"container"}>

            <h1>{bookstoreInfo.nome}</h1>

            <div className={"information"}>

                <div className={"left"}>
                    <Subtitle text={"Morada"}/>
                    <p>{bookstoreInfo.morada}, {bookstoreInfo.codigo_postal} {bookstoreInfo.localidade}</p>

                    <Subtitle text={"Contactos"}/>
                    <p>{bookstoreInfo.contacto}</p>

                    <Subtitle text={"Hora de Funcionamento"}/>
                    <p>{bookstoreInfo.horario.replaceAll(",", "\n")}</p>
                </div>

                <div className={"right"}>
                    <Subtitle text={"Descrição"}/>
                    <p>{bookstoreInfo.description}</p>
                </div>

            </div>

            <Subtitle text={"Fotografias"}/>
            <div className={"photos"}>
                {bookstorePhoto.map(l => {
                    console.log("path", l.path);
                    return <img src={baseImageLink + l.path} className={"photo"}/>
                })}
            </div>

            <Subtitle text={special.particularidade}/>

            <div className={"information"}>
                <img src={baseImageLink + special.path} className={"specialPhoto"}/>
                <p className={"text"}>{special.descricao}</p>
            </div>

            <Subtitle text={"Livros Disponíveis"}></Subtitle>

        </div>
    </div>
}