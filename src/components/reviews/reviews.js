import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar, faUser} from "@fortawesome/free-regular-svg-icons";
import {faStar as FaStarSolid} from "@fortawesome/free-solid-svg-icons";

import Subtitle from "../subtitle/subtitle";
import "./reviews.scss";
import axiosBooks from "../../util/axiosBooks";
import {useError} from "../../context/errorContext";

export default function Reviews(props) {
    const {id} = props;
    const { showError } = useError()
    const [userReview, setUserReview] = useState(""); // Estado para armazenar a revisão do usuário
    const [userRating, setUserRating] = useState(0.0); // Estado para armazenar a classificação do usuário

    const totalStars = 5;

    const totalReviews = props.avaliacoes || 0;
    const averageRating = props.nota;

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

    const handleSubmitReview = async () => {
        try {
            const pedido = {
                nota: userRating,
                comentario: userReview
            };

            const token = localStorage.getItem("token");
            const response = await axiosBooks.post(`item/rate/${id}`, pedido, { headers: { 'token-header': token } });

            if (response.status === 200) {
                console.log("Review added successfully");

            } else if (response.status === 400 && response.data.message === "already_rated") {
                showError("Item already rated by the user");
            } else {
                showError(response.data.message || "Failed to add review");
            }
        } catch (error) {
            showError("Erro ao adicionar avaliação");
        }

        // Limpar o estado da revisão e da classificação após a submissão
        setUserReview("");
        setUserRating(0);

    };

    return (
        <div className={"Reviews"}>
            <Subtitle text={"O que os nossos utilizadores pensam sobre este item"}/>
            {averageRating !== null ? (
                <div className={"Average"}>
                    <h1> {(+averageRating).toFixed(1)} </h1>
                    <div className="AverageValue">
                        {[...Array(totalStars)].map((_, index) => (
                            <FontAwesomeIcon key={index} icon={FaStarSolid} className="Star"/>
                        ))}
                        <div className="ReviewCount">{`${totalReviews} avaliações`}</div>
                    </div>
                </div>
            ) : (
                <p>Sem avaliações.</p>
            )}

            <div className={"WriteReviews"}>
                {props.foto === null ? (
                    <>
                    <div className={"UserPhoto"}>
                        <FontAwesomeIcon icon={faUser} alt="icon do usuário"/>
                    </div>
                    </>
                ) : (
                    <div className={"UserPhoto"}>
                        <img src={props.foto} alt="Foto do usuário"/>
                    </div>
                )}

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
