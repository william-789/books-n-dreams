import Subtitle from "../../components/subtitle/subtitle";
import Pagination from "../../components/shared/pagination/Pagination";
import { useUser } from "../../context/userContext";
import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import axiosBooks from "../../util/axiosBooks";
import Merch from "../../components/merch/Merch";
import BookPrice from "../../components/bookPrice/bookPrice";
import UserLibrary from "../../components/userLibrary/UserLibray";

import"./Favorites.scss"

export default function Favorites(props) {
    const history = useHistory();
    const { isLogged, openModal } = useUser();
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPageFav, setCurrentPageFav] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalPagesFav, setTotalPagesFav] = useState(1);

    const [wishlist, setWishlist] = useState([]);
    const [bookstores, setBookstores] = useState([]);
    const [loading, setLoading] = useState(true)

    // if(!isLogged()) {
    //     history.push('/homePage');
    //     openModal()
    // }
    const token = localStorage.getItem("token");
    const config = {
        headers: {
            'token-header': token
        }
    };

    const onLoad = async () => {
        await getWishlist();
        await getFav();
        setLoading(false)
    }
    const getWishlist = async () => {
        try {
            const wishlist = await axiosBooks.get('/user/wishlist', {
                params: {
                    page: currentPage,
                    per_page: 4
                },
                headers: config.headers
            });
            setWishlist(wishlist.data.wishlist);
            setTotalPages(wishlist.data.total_pages)
        } catch (e) {
            console.log(e);
        }
    };
    const getFav = async () => {
        try {
            const favoriteStores = await axiosBooks.get('/user/favorite-stores', {
                params: {
                    page: currentPageFav,
                    per_page: 3
                },
                headers: config.headers
            });
            setBookstores(favoriteStores.data.stores);
            setTotalPagesFav(favoriteStores.data.total_pages)
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(()=>{
        onLoad();
    },[])
    useEffect(()=>{
        if(!loading)
            getWishlist();
    },[currentPage])
    useEffect(()=>{
        if(!loading)
            getFav();
    },[currentPageFav])

    if(loading) return null;


    return <div className={"Favorites Content"}>
        <Subtitle text={'Wishlist'}/>

        <div className={"Whislist"}>
        {
            wishlist.map(i=> i.type === 'merch' ?

              <Merch
                key={i.id}
                id={i.id}
                nome={i.nome}
                autor={i.autor}
                foto={i.foto}
                text={i.desde}
                disponiveis={i.disponiveis}
              /> :
              <BookPrice
                key={i.id}
                id={i.id}
                nome={i.nome}
                autor={i.autor}
                foto={i.foto}
                text={i.desde}
                disponiveis={i.disponiveis}
              />)
        }

        </div>

        <Pagination page={currentPage} totalPages={totalPages} setPage={setCurrentPage}/>
        <Subtitle text={'Livrarias favoritas'}/>
        {
            bookstores.map(b=>
              <UserLibrary {...b} />
            )
        }
        <Pagination page={currentPageFav} totalPages={totalPagesFav} setPage={setCurrentPageFav}/>

    </div>
}
