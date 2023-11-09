import React from "react";
import './Home.scss';
import NavBar from '../navbar/NavBar';

export default function Home(props) {

    return <div className={"home"}>



        <div className="container">
            <NavBar/>

            <div className="navBar-background"></div>

            <div className="wrapper">

                <div className="logo-container">
                    <div className="logoBooksAndDreams"></div>
                    <p className="textBooksAndDreams">Uma aplicação, mil livrarias, infinitas histórias</p>
                </div>

                {/* CHRISTMAS BANNER          */}
                <div className="banner-christmas">

                    <div className="christmas-texto">
                        <div className="left"></div>
                        <div className="right">
                            <p>A <strong>BOOKS AND DREAMS</strong><br/>
                                deseja-te um Feliz Natal!</p>

                            <p>
                                Acompanha o teu Natal com os melhores<br/>
                                livros natalícios que temos para te oferecer.
                            </p>

                            <button className="btn-compre-agora">Compre Agora!</button>
                        </div>

                    </div>



                </div>

                <div className="banner-library">
                    <h1>Titulo2</h1>
                    <p>
                        IMAGE BACKGROUND RESPONSIVE IMAGE
                        IMAGE ON DIV BOX METHOD 2
                        mage as background of the DIV, with text in front.
                    </p>
                </div>

                <div className="banner-library">
                    <h1>Titulo2</h1>
                    <p>
                        IMAGE BACKGROUND RESPONSIVE IMAGE
                        IMAGE ON DIV BOX METHOD 2
                        mage as background of the DIV, with text in front.
                    </p>
                </div>

                <div className="footer">
                    <p><strong>FOOTER</strong></p>
                </div>







                {/* LIBRARY BANNER
                <div className="banner-library">
                    <h1>Titulo2</h1>
                    <p>
                        IMAGE BACKGROUND RESPONSIVE IMAGE
                        IMAGE ON DIV BOX METHOD 2
                        mage as background of the DIV, with text in front.
                    </p>
                </div>
                */}


            </div>

        </div>








    </div>
}