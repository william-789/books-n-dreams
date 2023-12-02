import React, {useEffect, useState} from "react";
import './Checkout.scss';
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
import Empty from "../../../components/shared/Empty/Empty";
import UserItems from "../../../components/userItems/UserItems";
import UserLine from "../../../components/userItems/UserLine";
import UserPaymentType from "../../../components/userPaymentType/UserPaymentType";
import UserDeliveryMethod from "../../../components/userDeliveryMethod/UserDeliveryMethod";



export default function Checkout() {
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

    {/* if(carregando) return null; */}

    const bgImage = {
        backgroundImage: `url(${null})`,
    };

    const profileImage = {
        backgroundImage: `url(${null})`,
    };

    return <div className={"shoppingCart content"}>

        <div className={"shoppingCart-Info"}>
            <div className={"shoppingCart-Banner"} style={bgImage}></div>
            <div className={"wrapper-Info"}>
                <div className={"imageText"}>
                    <div className={"shoppingCart-Image"} style={profileImage}></div>
                    <div className={"shoppingCart-Text"}>
                        <h1>Nome Ut</h1>
                    </div>
                </div>
            </div>
        </div>

        <div className="wrapper">

            <h1 className={"title-checkout"}>Check Out</h1>
            <div className={"space"}></div>
            <SubTitles text={"Método de envio / Recolha"}/>

            <UserDeliveryMethod/>

            <div className={"space"}></div>

            <SubTitles text={"Tipo de Pagamento"}/>

            <UserPaymentType/>

            <div className={"total-checkout"}>
                <div className={"text"}>Total</div>
                <div className={"price"}>55,88€</div>
            </div>

            {/* BOTÃO */}
            <Link to={"/checkout"}>
                <div className={"btn-box"}>
                    <button className={"button-continuar"}>Continuar</button>
                </div>
            </Link>

        </div>

        <div className={"space"}></div>




        <Footer/>

    </div>

}
