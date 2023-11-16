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
    const { id } = useParams();
    const [details, setDetails] = useState(null)
    const [stores, setStores] = useState(null)
    const [author, setAuthor] = useState(null);

    const [authorBooks, setAuthorBooks] = useState(null);
    const [genreBooks, setGenreBooks] = useState(null);

    const getData = async () => {
        try {
            await axiosBooks.get(`/book/${id}`).then(r=>setDetails(r.data.book));
            console.log("book", details) // remover log quando estiver a funcionar

            Promise.all([
                axiosBooks.get(`book/available/${id}`).then(r=>setStores(r.data.available)), // replace by available
                axiosBooks.get(`/author/${details.autor_id}`).then(r=>setAuthor(r.data.author)),
                axiosBooks.get(`/book/all`, {params:{autor:details.autor_id}}).then(r=>setAuthorBooks(r.data.books)),
                axiosBooks.get(`/book/all`, {params:{genero:details.genero_id}}).then(r=>setGenreBooks(r.data.books)),
            ]);

            // remover logs depois
            console.log("details",details);
            console.log("stores",stores);
            console.log("author",author);
            console.log("author books",authorBooks);
            console.log("genre books",genreBooks);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(()=>{
        getData();
    },[])

    // remover && false depois de passar os dados corretos
    if(!(details && stores && author && authorBooks && genreBooks && false)) return null;

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
                        {stores.map(s => {
                          return  <WhereToBuy
                              key={s.id}
                              capa={s.capa}
                              nome={s.nome}
                              localidade={s.localidade}
                              distrito={s.distrito}
                              preco={s.preco} // verificar o preço para o item
                          />
                        })}

                    </div>
                </div>

                <div className={"ContainerRight"}>
                    <AboutAuthor
                        nome={author.nome}
                        biografia={author.biografia}
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
