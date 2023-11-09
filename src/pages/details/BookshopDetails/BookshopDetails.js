import {useParams} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import axiosBooks from "../../../util/axiosBooks";
import NavBar from "../../navbar/NavBar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from '@fortawesome/free-solid-svg-icons'
import Favorite from "../../favorite/favorite";

export default function BookshopDetails(props) {
    const {id} = useParams();
    const [details, setDetails] = useState(null)

    useEffect(() => {
        axiosBooks.get(`/store/${id}`)
            .then(r => setDetails(r))
            .catch(e => console.log("Error", e))
    })

    console.log(details)

    return <div className={"BookshopDetails content"}>

        <div className={"header"}>
            <div className={"banner"}
                 style={{backgroundImage: `url(https://media.cntraveler.com/photos/5edf98c162bb344a7a7bab53/16:9/w_1920,c_limit/SistersUptownBooks-NYC-WTJ2W3.jpg)`}}/>

            <div className={"favorite"}>
                <Favorite/>
            </div>
        </div>

        <div className={"container"}>


            <h1>Centésima Página</h1>

            <div className={"information"}>
                <div className={"left"}>
                    <h2>Morada</h2>
                    <p></p>

                    <h2>Contactos</h2>
                    <p></p>

                    <h2>Horário de Funcionamento</h2>
                    <p></p>

                </div>

                <div className={"right"}>
                    <h2>Descrição</h2>
                    <p></p>

                </div>

            </div>

            <h2>Fotografias</h2>
            <div className={"photos"}>
            </div>

            <h2>Fotografias</h2>
            <h2>Fotografias</h2>
            <h2>Fotografias</h2>
            <h2>Fotografias</h2>
            <h2>Fotografias</h2>
            <h2>Fotografias</h2>

        </div>
    </div>
}