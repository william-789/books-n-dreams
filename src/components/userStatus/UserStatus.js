import React from "react";
import './UserStatus.scss'
import Favorite from "../favorite/favorite";
import {Link} from "react-router-dom";

export default function UserStatus(props) {

    return (
        <div className={"userStatus"}>

            <div className={"userStatusText"}>
                <div className={"texts"}>
                    <div className={"title"}>02/10/2023 Entregue ao domicilio</div>
                    <div className={"text"}>47,83€</div>
                </div>

                <Link to={"/purchase-details"}>
                    <div className={"arrow-icon"}>
                    </div>
                </Link>


            </div>

        </div>
    );
}