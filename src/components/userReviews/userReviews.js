import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faUser } from "@fortawesome/free-regular-svg-icons";
import { faStar as FaStarSolid } from "@fortawesome/free-solid-svg-icons";

import "./userReviews.scss";
import {baseImageLink} from "../../util/axiosBooks";

export default function UserReview(props) {
    const totalStars = 5;

    const renderUserStars = (nota) => {
        const stars = [];

        for (let i = 1; i <= totalStars; i++) {
            const starIcon = i <= nota ? FaStarSolid : faStar;
            stars.push(
                <FontAwesomeIcon key={i} icon={starIcon} className="star"/>
            );
        }

        return stars;
    };

    return (
        <div className={"Review"}>
            {props.foto === null ? (
                <div className={"UserPhoto"}>
                    <FontAwesomeIcon icon={faUser} alt="icon do usuário" />
                </div>
            ) : (
                <div className={"UserPhoto"}
                    style={{ backgroundImage: `url(${baseImageLink + props.foto})` }}/>
            )}

            <div className={"UserInfo"}>
                <h1>{props.nome}</h1>
                <h2>{props.comentario}</h2>
            </div>

            <div className={"Rating"}>
                {renderUserStars(props.nota)}
            </div>
        </div>
    );
}
