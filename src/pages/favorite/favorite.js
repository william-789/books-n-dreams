import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from '@fortawesome/free-solid-svg-icons'
import {faHeart as faHeartOpen} from '@fortawesome/free-regular-svg-icons'
import {useState} from "react";

export default function Favorite(props) {
    const [favorite, setFavorite] = useState(false)
    return <div className={"Favorite"}>
    <FontAwesomeIcon onClick={() => favorite ? setFavorite(false) : setFavorite(true)}
                            icon={favorite ? faHeart : faHeartOpen} className={"icon"}/>
    </div>
}