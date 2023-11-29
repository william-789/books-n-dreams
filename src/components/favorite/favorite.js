import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartOpen } from '@fortawesome/free-regular-svg-icons'
import { useState } from "react";
import { useUser } from "../../context/userContext";

export default function Favorite(props) { // always receives type - 'store, merch, livro' - and id
    const { isLogged, isFavorite, onWishlist, openModal, toggleFavStore, toggleWishlist } = useUser();
    const [full, setFull] = useState(false)

    if(isLogged()) {
        if(props.type === 'store') {
            setFull(isFavorite(props.id));
        } else {
            setFull(onWishlist(props.id, props.type));
        }
    }
    function handleClick (id) {
        if(isLogged()) {
            if(props.type === 'store') {
                toggleFavStore(id)
            } else {
                toggleWishlist(id, props.type)
            }
        } else {
            openModal()
        }
    }

    const [favorite, setFavorite] = useState(false)
    return <div className={"Favorite"}>
    <FontAwesomeIcon onClick={()=>handleClick(props.id)}
                            icon={ full ? faHeart : faHeartOpen} className={"icon"}/>
    </div>
}
