import React from "react";
import './UserStatus.scss'
import { Link } from "react-router-dom";

export default function UserStatus(props) {
    const dateString = props.data;
    const date = new Date(dateString);
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

    return (
        <div className={"userStatus"}>

            <div className={"userStatusText"}>
                <div className={"texts"}>
                    <div className={"title"}>{formattedDate} {props.estado}</div>
                    <div className={"text"}>{props.total}€</div>
                </div>

                <Link to={`/purchase-details/${props.codigo}`}>
                    <div className={"arrow-icon"}>
                    </div>
                </Link>


            </div>

        </div>
    );
}
