import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Footer from "../../../components/footer/Footer";
import SubTitles from '../../../components/subtitle/subtitle';
import WrapList from "../../../components/bookList/wrapList"
import axiosBooks from "../../../util/axiosBooks";
import UserLibrary from "../../../components/userLibrary/UserLibray";
import UserStatus from "../../../components/userStatus/UserStatus";
import UserButtonStatus from "../../../components/userStatusButtons/userStatusButton";
import {useUser} from "../../../context/userContext";
import Empty from "../../../components/shared/Empty/Empty";
import UserBanner from "../../../components/shared/UserBanner";


export default function User() {
    const { user, token, getUser, isLogged, openModal } = useUser();
    const [detalhes, setDetalhes] = useState();
    const [wishlist, setWishlist] = useState([]);
    const [bookstores, setBookstores] = useState([]);
    const [aDecorrer, setADecorrer] = useState([]);
    const [entregues, setEntregues] = useState([]);
    const [canceladas, setCanceladas] = useState([]);
    const [tabAtiva, setTabAtiva] = useState(0);
    const [carregando, setCarregando] = useState(true)

    // if(!isLogged()) {
    //     openModal()
    //     return;
    // } // REVIEW
    const getData = async () => {
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                'token-header': token
            }
        };
        // if(token) getUser(); !!!!!! 1.

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
            setADecorrer(userOrders.data.a_decorrer);
            setEntregues(userOrders.data.entregues);
            setCanceladas(userOrders.data.canceladas);

            setCarregando(false);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(()=>{
        getData();
    },[user])

    if(carregando) return null;

    return <div className={"user content"}>

        <UserBanner main {...detalhes} />

        <div className="wrapper">
            <SubTitles text={"Wishlist"}/>
        </div>

        <div className={"wrapper-list-profile"}>
            {wishlist.length > 0 ?
              <WrapList list={wishlist}/> :
              <Empty text={'Sem produtos na wishlist'} />
            }
        </div>

        <div className="wrapper">
            <SubTitles text={"Lista de Favoritos"}/>
        </div>

        <div className="wrapper">
            {
                bookstores.map((b) =>
                <UserLibrary {...b} />)
            }

            {(wishlist.length > 0 || bookstores.length > 0) && <Link to={"/search-bookshop"}>
                <div className={"btn-box"}>
                    <button className={"button-ver-mais"}>Ver mais</button>
                </div>
            </Link>}
            <SubTitles text={"Histórico de Compras"}/>
            <UserButtonStatus activeButton={tabAtiva} setActiveButton={setTabAtiva}/>
            {aDecorrer.length === 0 && entregues.length === 0 && canceladas.length === 0 &&
            <Empty text={'Histórico de compras vazio'} />}
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
