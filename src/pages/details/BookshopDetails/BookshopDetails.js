import {Link, useParams} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import axiosBooks, {baseImageLink} from "../../../util/axiosBooks";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight} from '@fortawesome/free-solid-svg-icons'
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons'
import Favorite from "../../../components/favorite/favorite";
import Subtitle from "../../../components/subtitle/subtitle";
import WrapList from "../../../components/bookList/wrapList";
import PrimaryButton from "../../../components/buttons/PrimaryButton/PrimaryButton";
import SllideShow from "../../../components/slideShow/SlideShow";
import Footer from "../../../components/footer/Footer";

export default function BookshopDetails(props) {
    const {id} = useParams();
    const [details, setDetails] = useState(null);
    const [books, setBooks] = useState(null);
    const [photos, setPhotos] = useState(null);
    const [stores, setStores] = useState(null)


    useEffect(() => {
        axiosBooks.get(`/store/${id}`)
            .then(r => {
                setDetails(r.data)
                setPhotos(r.data.bookstore.fotos)
            })
            .catch(e => console.log("Error", e))

        axiosBooks.get(`/book/all`, {params: {livraria: id}})
            .then(r => setBooks(r.data.books))
            .catch(e => console.log("Error", e))

    }, [])

    if (!details || !books || !photos) {
        return null
    }

    const bookstoreInfo = details.bookstore.info
    const bookstorePhoto = photos.filter(l => l.particularidade === null)
    const photoList = bookstorePhoto.map(p => p.path)

    let special = details.bookstore.fotos.find(l => {
        return l.particularidade !== null
    })

    return <div className={"BookshopDetails content"}>

        <div className={"header"}>
            <div className={"banner"}
                 style={{backgroundImage: `url(${baseImageLink + bookstoreInfo.capa})`}}/>

            <div className={"favorite"}>
                <Favorite id={bookstoreInfo.id} type={'store'}/>
            </div>
        </div>

        <div className={"container"}>

            <h1>{bookstoreInfo.nome}</h1>

            <div className={"information"}>

                <div className={"left"}>
                    <Subtitle text={"Descrição"}/>
                    <p>{bookstoreInfo.description}</p>
                </div>

                <div className={"right"}>
                    <Subtitle text={"Morada"}/>
                    <p>{bookstoreInfo.morada},</p>
                    <p>{bookstoreInfo.codigo_postal} {bookstoreInfo.localidade}</p>

                    <Subtitle text={"Contactos"}/>
                    <p>{bookstoreInfo.contacto}</p>

                    <Subtitle text={"Hora de Funcionamento"}/>
                    <p dangerouslySetInnerHTML={{__html: bookstoreInfo.horario.replaceAll(', ', '<br>')}}></p>
                </div>

            </div>

            <Subtitle text={"Fotografias"}/>

            <SllideShow photos={photoList} size={3}/>

            <Subtitle text={special.particularidade}/>

            <div className={"information"}>
                <div className={"specialPhotoContainer"}>
                    <img src={baseImageLink + special.path} className={"specialPhoto"}/>
                </div>
                <p className={"text"}>{special.descricao}</p>
            </div>

            <Subtitle text={"Livros Disponíveis"}></Subtitle>

            <WrapList list={books.slice(0, 4)}/>

            <div className={"button"}>
                <Link to={"/search"}>
                    <PrimaryButton text={"Ver mais"}/>
                </Link>
            </div>

            <br/>
            <br/>

        </div>
        <Footer/>
    </div>

}
