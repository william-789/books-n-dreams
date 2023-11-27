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
import {useUser} from "../../../context/userContext";


export default function User() {
    const { user, isLogged, openModal } = useUser();
    const [detalhes, setDetalhes] = useState();
    const [wishlist, setWishlist] = useState([]);
    const [bookstores, setBookstores] = useState([]);
    const [aDecorrer, setADecorrer] = useState([]);
    const [entregues, setEntregues] = useState([]);
    const [canceladas, setCanceladas] = useState([]);
    const [tabAtiva, setTabAtiva] = useState(0);
    const [carregando, setCarregando] = useState(true)

    if(!isLogged) {openModal()} // REVIEW
    const getData = async () => {
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                'token-header': token
            }
        };

        try {
            const userDetails = await axiosBooks.get(`/user/${user.id}`);
            setDetalhes(userDetails.data.user);

            const wishlist = await axiosBooks.get('/user/wishlist', {
                params: {
                    page: 1,
                    per_page: 4
                },
                headers: config.headers
            });
            setWishlist(wishlist.data.wishlist);

            const favoriteStores = await axiosBooks.get('/user/favorite-stores', {
                params: {
                    page: 1,
                    per_page: 3
                },
                headers: config.headers
            });
            setBookstores(favoriteStores.data.stores);

            const userOrders = await axiosBooks.get('/user/orders-reader', {
                headers: config.headers
            });
            console.log(userOrders.data.a_decorrer)
            setADecorrer(userOrders.data.a_decorrer);
            setEntregues(userOrders.data.entregues);
            setCanceladas(userOrders.data.canceladas);

            setCarregando(false);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(()=>{
        getData()
    },[])

    if(carregando) return null;

    const bgImage = {
        backgroundImage: `url(${baseImageLink+detalhes.capa})`,
    };

    const profileImage = {
        backgroundImage: `url(${baseImageLink+detalhes.foto})`,
    };

    return <div className={"user content"}>

        <div className={"userInfo"}>
            <div className={"userBanner"} style={bgImage}></div>
            <div className={"wrapper-Info"}>
                <div className={"imageText"}>
                    <div className={"userImage"} style={profileImage}></div>
                    <div className={"userText"}>
                        <h1>{detalhes.nome}</h1>
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
            <WrapList list={wishlist}/>
        </div>

        <div className="wrapper">
            {
                bookstores.map((b) =>
                <UserLibrary {...b} />)
            }

            <Link to={"/search-bookshop"}>
                <div className={"btn-box"}>
                    <button className={"button-ver-mais"}>Ver mais</button>
                </div>
            </Link>
            <SubTitles text={"Histórico de Compras"}/>
            <UserButtonStatus activeButton={tabAtiva} setActiveButton={setTabAtiva}/>
            { tabAtiva === 0 && (
                aDecorrer.map((ad)=>
                    <UserStatus />
                ))
            }
            {/*tab 1*/}
            { tabAtiva === 1 && (
              entregues.map((ad)=>
                  <UserStatus />
              ))
            }
            {/*tab 2*/}
            { tabAtiva === 2 && (
              canceladas.map((ad)=>
                  <UserStatus />
              ))
            }

        </div>

        <Footer/>

    </div>

}
