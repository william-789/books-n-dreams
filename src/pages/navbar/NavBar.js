import {NavLink} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser, faMagnifyingGlass, faCartShopping, faUsers} from '@fortawesome/free-solid-svg-icons'
import axiosBooks from "../../util/axiosBooks";
import {useEffect, useState} from "react";
import {useUser} from "../../context/userContext";

export default function NavBar(props) {
    const { user } = useUser();

    const[quantity, setQuantity]=useState(null)

    useEffect(() => {
        const fetchCartQuantity = async () => {
            try {
                const response = await axiosBooks.get(`/user/cart/${user.id}`);
                console.log(response.data.Unidades);
                setQuantity(response.data.Unidades);
            } catch (error) {
                console.error('Error fetching cart quantity:', error);
            }
        };

        fetchCartQuantity();
    }, [user.id]);

    return <div className={"NavBar"}>

        <div className={"menuBar"}>

            <NavLink to={"/homePage"}>
                <img src={"../../assets/BooksAndDreamsMini.svg"} className={"menuItem logo"}/>
            </NavLink>

            <div className={"menuItems"}>

                <NavLink to={"/profile"}>
                    <div className={"round"} id={"user"}>
                        <FontAwesomeIcon icon={faUser} className={"menuItem"}/>
                    </div>
                </NavLink>

                <NavLink to={"/search"}>
                    <div className={"round"} id={"search"}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} className={"menuItem"}/>
                    </div>
                </NavLink>

                <NavLink to={"/shopping-cart"}>
                    <div className={"round cart"} id={"cart"}>
                        <FontAwesomeIcon icon={faCartShopping} className={"menuItem"}/>

                        {quantity > 0 && (
                            <div className={"quantity"}>
                                <h1>{quantity}</h1>
                            </div>
                        )}
                    </div>
                </NavLink>

                <NavLink to={"/community"}>
                    <div className={"round"} id={"community"}>
                        <FontAwesomeIcon icon={faUsers} className={"menuItem"}/>
                    </div>
                </NavLink>
            </div>

        </div>
    </div>
}