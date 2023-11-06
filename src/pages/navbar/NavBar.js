import {NavLink} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser, faMagnifyingGlass, faCartShopping, faUsers} from '@fortawesome/free-solid-svg-icons'

export default function NavBar(props) {
    return <div className={"NavBar"}>

        <div className={"menuBar"}>

            <NavLink to={"/homePage"}>
                <img src={"../../assets/BooksAndDreamsMini.svg"} className={"logo"}/>
            </NavLink>


            <div className={"menuItems"}>

                <NavLink to={"/profile"}>
                    <div className={"round"}>
                        <FontAwesomeIcon icon={faUser} className={"menuItem"}/>
                    </div>
                </NavLink>

                <NavLink to={"/search"}>
                    <div className={"round"}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} className={"menuItem"}/>
                    </div>
                </NavLink>

                <NavLink to={"/shopping-cart"}>
                    <div className={"round"}>
                        <FontAwesomeIcon icon={faCartShopping} className={"menuItem"}/>
                    </div>
                </NavLink>

                <NavLink to={"/community"}>
                    <div className={"round"}>
                        <FontAwesomeIcon icon={faUsers} className={"menuItem"}/>
                    </div>
                </NavLink>
            </div>

        </div>
    </div>
}