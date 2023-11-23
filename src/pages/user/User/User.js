import React, {useEffect, useState} from "react";
import './User.scss';
import {Link} from "react-router-dom";
import Footer from "../../../components/footer/Footer";
import SubTitles from '../../../components/subtitle/subtitle';
import Library from "../../../components/library/Library";
import WrapList from "../../../components/bookList/wrapList"
import axiosBooks, {baseImageLink} from "../../../util/axiosBooks";
import ThirdButton from "../../../components/buttons/ThirdButton/ThirdButton";
import Favorite from "../../../components/favorite/favorite";
import UserLibrary from "../../../components/userLibrary/UserLibray";
import SecondaryButton from "../../../components/buttons/SecondaryButton/SecondaryButton";
import UserStatus from "../../../components/userStatus/UserStatus";
import UserButtonStatus from "../../../components/userStatusButtons/userStatusButton";


export default function User(props) {
    const [livros, setLivros] = useState(null);

    useEffect(()=>{
        axiosBooks.get("/book/all").then(r=>setLivros(r.data.books)).catch(e=>console.log(e))
    },[])

    if(!livros) return null;

    return <div className={"user content"}>

        <div className={"userInfo"}>
            <div className={"userBanner"}></div>
            <div className={"wrapper-Info"}>
                <div className={"imageText"}>
                    <div className={"userImage"}></div>
                    <div className={"userText"}>
                        <h1>Ana Borges</h1>

                        <div className={"button"}>
                            <Link to={"/edit-personal"}>
                                <ThirdButton text={"Editar Perfil"}/>
                            </Link>
                        </div>


                    </div>
                </div>
            </div>
        </div>
        <div className="wrapper">

            <SubTitles text={"Lista de Favoritos"}/>

        </div>

        <div className={"wrapper-list-profile"}>
            <WrapList list={livros.slice(0, 4)}/>
        </div>

        <div className="wrapper">
            <UserLibrary/>
            <UserLibrary/>

            <Link to={"/search-bookshop"}>
                <div className={"btn-box"}>
                    <button className={"button-ver-mais"}>Ver mais</button>
                </div>
            </Link>
            <SubTitles text={"Histórico de Compras"}/>
            <UserButtonStatus/>
            <UserStatus/>
            <UserStatus/>

        </div>

        <Footer/>

    </div>

}
