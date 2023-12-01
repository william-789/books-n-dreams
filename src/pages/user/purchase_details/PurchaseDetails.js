import React, {useEffect, useState} from "react";
import './PurchaseDetails.scss';
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
import PurchaseItems from "../../../components/purchaseItems/PurchaseItems";


export default function PurchaseDetails() {
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

    return <div className={"purchaseDetails content"}>

        <div className={"purchaseDetails-Info"}>
            <div className={"purchaseDetails-Banner"} style={bgImage}></div>
            <div className={"wrapper-Info"}>
                <div className={"imageText"}>
                    <div className={"purchaseDetails-Image"} style={profileImage}></div>
                    <div className={"purchaseDetails-Text"}>
                        <h1>Nome Ut</h1>
                    </div>
                </div>
            </div>
        </div>

        <div className="wrapper">

            <SubTitles text={"A minha encomenda"}/>

            <div className={"card"}>
                <div className={"order-box"}>
                    <div className={"order-number"}>Ordem Nº 238562312</div>
                    <div className={"order-date"}>00/10/2023</div>
                </div>
                <UserLine/>

            <div className={"status-text"}>
                <div className={"text"}>
                    <div className={"delivery-date"}>Entregue a 04/10/2023</div>
                    <div className={"order-total"}>Total 47,83€</div>
                </div>
                <div className={"in-chart"}>Artigos na encomenda (3)</div>
            </div>

            <UserLine/>

            <div className={"purchase-items"}>
                <PurchaseItems/>
                <PurchaseItems/>
                <PurchaseItems/>
            </div>

            </div>


            {/* BOTÃO */}
            <Link to={"/profile"}>
                <div className={"btn-box"}>
                    <button className={"button-cancelar"}>Cancelar</button>
                </div>
            </Link>

        </div>

        <div className={"space"}></div>

        <Footer/>

    </div>

}
