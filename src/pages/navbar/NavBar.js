import {NavLink} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser, faMagnifyingGlass, faCartShopping, faUsers} from '@fortawesome/free-solid-svg-icons'
import axiosBooks from "../../util/axiosBooks";
import {useEffect, useState} from "react";
import {useUser} from "../../context/userContext";

export default function NavBar(props) {
    const { isLogged, user, openModal } = useUser();
    const [quantity, setQuantity] = useState(null);

    const fetchCartQuantity = async () => {
        try {
            const response = await axiosBooks.get(`/user/cart/${user.id}`);
            setQuantity(response.data.Unidades);
        } catch (error) {
            console.error('Error fetching cart quantity:', error);
        }
    };

    const handleClick  = (event) => {
        if(!isLogged()) {
            event.preventDefault();
            openModal();
        }
    }

    useEffect(() => {
        fetchCartQuantity();
    }, [user.id]);


    return <div className={"NavBar"}>

        <div className={"menuBar"}>

            <NavLink to={"/homePage"}>
                <img src={"../../assets/BooksAndDreamsMini.svg"} className={"menuItem logo"}/>
            </NavLink>

            <div className={"menuItems"}>

                <NavLink to={"/profile"} onClick={handleClick}>
                    <div className={"round"} id={"user"}>
                        <FontAwesomeIcon icon={faUser} className={"menuItem"}/>
                    </div>
                </NavLink>

                <NavLink to={"/search"}>
                    <div className={"round"} id={"search"}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} className={"menuItem"}/>
                    </div>
                </NavLink>

                <NavLink to={"/shopping-cart"} onClick={handleClick}>
                    <div className={"round cart"} id={"cart"}>
                        <FontAwesomeIcon icon={faCartShopping} className={"menuItem"}/>

                        {quantity > 0 && (
                            <div className={"quantity"}>
                                <h1>{quantity}</h1>
                            </div>
                        )}
                    </div>
                </NavLink>

                <NavLink to={"/community"} onClick={handleClick}>
                    <div className={"round"} id={"community"}>
                        <FontAwesomeIcon icon={faUsers} className={"menuItem"}/>
                    </div>
                </NavLink>
            </div>

        </div>
    </div>
}
