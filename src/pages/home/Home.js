import React, {useEffect, useState} from "react";
import './Home.scss';
import {Link} from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Books from "../../components/books/Books";
import SubTitles from '../../components/subtitle/subtitle'
import Library from "../../components/library/Library";
import WrapList from "../../components/bookList/wrapList"
import axiosBooks from "../../util/axiosBooks";

export default function Home(props) {
    const [livros, setLivros] = useState(null);

    useEffect(()=>{
        axiosBooks.get("/book/all").then(r=>setLivros(r.data.books)).catch(e=>console.log(e))
    },[])

    if(!livros) return null;

        return <div className={"home content"}>

            <div className="wrapper">

                <div className="logo-container">
                    <div className="logoBooksAndDreams"></div>
                    <p className="textBooksAndDreams">Uma aplicação, mil livrarias, infinitas histórias</p>
                </div>
                <div className="banner-christmas">
                <div className="christmas-texto">

                        <div className="left"></div>
                        <div className="right">
                            <p>A <strong>BOOKS AND DREAMS</strong><br/>
                                deseja-te um Feliz Natal!</p>

                            <p className={"extra"}>
                                Acompanha o teu Natal com os melhores<br/>
                                livros natalícios que temos para te oferecer.
                            </p>

                            <Link to={"/search-book"}>
                                <div className={"box"} id={"compre-agora"}>
                                    <button className="btn-compre-agora"><strong>Compre Agora!</strong></button>
                                </div>
                            </Link>

                        </div>

                    </div>
                </div>
                <SubTitles text={"As nossas sugestões para ti"}/>
            </div>

            <div className={"wrapper-list-home"}>
                <WrapList  list={livros.slice(0, 8)} />
            </div>


            <div className="wrapper">
                <Library/>
                <SubTitles text={"A nossa missão"}/>

                <div className="banner-mission">
                    <div className={"mission-text"}>
                        <p>Facilidade e <br/> Praticalidade na Compra</p>
                        <p>Promoção de <br/>Experiências Únicas</p>
                        <p>Manutenção Cultural</p>
                        <p>Incentivo à Interação e <br/>Sentido de Comunidade</p>
                    </div>

                    <div className={"image-mission"}></div>
                </div>
            </div>
            <Footer/>

        </div>

}
