import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faUser } from "@fortawesome/free-regular-svg-icons";
import { faStar as FaStarSolid } from "@fortawesome/free-solid-svg-icons";

import "./userReviews.scss";

export default function UserReviews(props) {
    const totalStars = 5;
    const reviewList = props.list || [];

    const renderUserStars = (nota) => {
        const stars = [];

        for (let i = 1; i <= totalStars; i++) {
            const starIcon = i <= nota ? FaStarSolid : faStar;
            stars.push(
                <FontAwesomeIcon key={i} icon={starIcon} className="star" />
            );
        }

        return stars;
    };

    return (
        <div className={"User-Reviews"}>
            {reviewList.map((review, index) => (
                <div key={index} className={"Review"}>
                    {review.foto === null ? (
                        <div className={"UserPhoto"}>
                            <FontAwesomeIcon
                                icon={faUser}
                                alt="icon do usuário"
                            />
                        </div>
                    ) : (
                        <div className={"UserPhoto"}>
                            <img
                                src={review.foto}
                                alt="Foto do usuário"
                            />
                        </div>
                    )}

                    <div className={"UserInfo"}>
                        <h1>{review.nome}</h1>
                        <h2>{review.comentario}</h2>
                    </div>

                    <div className={"Rating"}>
                        {renderUserStars(review.nota)}
                    </div>
                </div>
            ))}
        </div>
    );
}
