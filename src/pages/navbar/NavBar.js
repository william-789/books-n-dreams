import {NavLink} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser, faMagnifyingGlass, faCartShopping, faUsers} from '@fortawesome/free-solid-svg-icons'
import axiosBooks from "../../util/axiosBooks";
import {useEffect, useState} from "react";
import {useUser} from "../../context/userContext";

export default function NavBar(props) {
    const { isLogged, user, openModal, quantityCart } = useUser();

    const handleClick  = (event) => {
        if(!isLogged()) {
            event.preventDefault();
            openModal();
        }
    }

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

                        {quantityCart > 0 && (
                            <div className={"quantity"}>
                                <h1>{quantityCart}</h1>
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
