import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as FaStarSolid } from "@fortawesome/free-solid-svg-icons";

import Subtitle from "../subtitle/subtitle";
import "./reviews.scss";

export default function Reviews(props) {
    const [userReview, setUserReview] = useState(""); // Estado para armazenar a revisão do usuário
    const [userRating, setUserRating] = useState(0); // Estado para armazenar a classificação do usuário

    const totalStars = 5;

    const totalReviews = props.avaliacoes || 0;


    const averageRating = props.nota/props.avaliacoes;

    const renderUserStars = () => {
        const stars = [];

        for (let i = 1; i <= totalStars; i++) {
            const starIcon = i <= userRating ? FaStarSolid : faStar;
            stars.push(
                <FontAwesomeIcon
                    key={i}
                    icon={starIcon}
                    onClick={() => handleStarClick(i)}
                    className="star"
                />
            );
        }

        return stars;
    };

    const handleReviewChange = (event) => {
        setUserReview(event.target.value);
    };

    const handleStarClick = (rating) => {
        setUserRating(rating);
    };

    const handleSubmitReview = () => {
        // Lógica para enviar a revisão e a classificação para o servidor, se necessário
        console.log("Revisão submetida:", userReview);
        console.log("Classificação submetida:", userRating);

        // Limpar o estado da revisão e da classificação após a submissão
        setUserReview("");
        setUserRating(0);
    };

    return (
        <div className={"Reviews"}>
            <Subtitle text={"O que os nossos utilizadores pensam sobre este item"} />
            {averageRating !== null ? (
                <div className={"Average"}>
                    <h1> {averageRating}</h1>
                    <div className="AverageValue">
                        {[...Array(totalStars)].map((_, index) => (
                            <FontAwesomeIcon key={index} icon={FaStarSolid} className="Star" />
                        ))}
                        <div className="ReviewCount">{`${totalReviews} avaliações`}</div>
                    </div>
                </div>
            ) : (
                <p>Sem avaliações.</p>
            )}

            <div className={"WriteReviews"}>
                <div className={"UserPhoto"}>
                    <img src={props.foto} alt="Foto do usuário" />
                </div>

                <div className={"ReviewBox"}>
                    <textarea
                        placeholder="Escreve um comentário aqui"
                        value={userReview}
                        onChange={handleReviewChange}
                    />
                    {/* Renderização de estrelas para a avaliação do usuário */}
                    <div className="StarRating">{renderUserStars()}</div>
                </div>

                <button className="button" onClick={handleSubmitReview}>
                    Submeter
                </button>
            </div>
        </div>
    );
}
