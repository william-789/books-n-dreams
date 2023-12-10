import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from '@fortawesome/free-solid-svg-icons'
import {faHeart as faHeartOpen} from '@fortawesome/free-regular-svg-icons'
import {useEffect, useState} from "react";
import {useUser} from "../../context/userContext";

export default function Favorite(props) { // always receives type - 'store, merch, livro' - and id
    const {isLogged, isFavorite, onWishlist, openModal, toggleFavStore, toggleWishlist} = useUser();
    const [full, setFull] = useState(false)

    const { id, type } = props;

    useEffect(() => {
        if (isLogged()) {
            if (props.type === 'store') {
                const isFav = isFavorite(props.id);
                setFull(isFav);
                console.log(`Store ${props.id} isFavorite: ${isFav}`);
            } else {
                const isOnWishlist = onWishlist(props.id, props.type);
                setFull(isOnWishlist);
                console.log(`${props.type} ${props.id} onWishlist: ${isOnWishlist}`);
            }
        }
    }, [id, type, isFavorite, onWishlist, isLogged]);


    function handleClick(id) {
        if (isLogged()) {
            if (props.type === 'store') {
                toggleFavStore(id)
            } else {
                toggleWishlist(id, props.type)
                console.log("Favorito iem",id)
            }
        } else {
            openModal()
        }
    }

    return <div className={"Favorite"}>
        <FontAwesomeIcon onClick={() => handleClick(props.id)}
                         icon={full ? faHeart : faHeartOpen} className={"icon"}/>
    </div>
}
