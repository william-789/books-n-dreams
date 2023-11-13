import React from "react";
import './Footer.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInstagram, faLinkedin, faSquareFacebook, faSquareXTwitter} from "@fortawesome/free-brands-svg-icons";


export default function Footer(props) {

    return <div className="footer">

            <div className={"columns"}>
                <div className={"col"}>
                    <h1>Suporte</h1>
                    <p>Contactos</p>
                    <p>Encomenda</p>
                    <p>Devoluções</p>
                </div>

                <div className={"col"}>
                    <h1>Companhia</h1>
                    <p>Sobre Nós</p>
                    <p>Blog</p>
                    <p>Colaboração</p>
                </div>

                <div className={"col"}>
                    <h1>Informação</h1>
                    <p>Termos e Condições</p>
                    <p>Privacidade</p>
                    <p>Sitemap</p>
                </div>

                <div className={"col"}>
                    <h1>Localização</h1>
                    <p>email@booksdreams.com</p>
                    <p>Av. Liberdade, 1, Lisboa</p>
                    <p>+351 2191819181</p>
                </div>
            </div>

            <hr className={"line"}/>

            <div className={"social"}>

                <div className={"links"}>
                    <a href={"https://www.facebook.com"}>
                        <div className={"box"} id={"facebook"}>
                            <FontAwesomeIcon icon={faSquareFacebook} className={"social_icon"}/>
                        </div>
                    </a>

                    <a href={"https://www.instagram.com"}>
                        <div className={"box"} id={"instagram"}>
                            <FontAwesomeIcon icon={faInstagram} className={"social_icon"}/>
                        </div>
                    </a>

                    <a href={"https://twitter.com"}>
                        <div className={"box"} id={"x-twitter"}>
                            <FontAwesomeIcon icon={faSquareXTwitter} className={"social_icon"}/>
                        </div>
                    </a>

                    <a href={"https://www.linkedin.com"}>
                        <div className={"box"} id={"linkedIn"}>
                            <FontAwesomeIcon icon={faLinkedin} className={"social_icon"}/>
                        </div>
                    </a>

                </div>

                <div className={"download"}>
                    <h2>Download The App</h2>
                    <div className={"stores"}>
                        <a href={"https://play.google.com/store/games"}>
                            <div className={"card googlePlay"}></div>
                        </a>

                        <a href={"https://www.apple.com/app-store/"}>
                            <div className={"card appStore"}></div>
                        </a>
                    </div>

                </div>

            </div>

            <hr className={"line"}/>
            <p className={"copy"}>Copyright © 2023 Books and Dreams Ltd. Todos os Direitos Reservados.</p>

    </div>


}