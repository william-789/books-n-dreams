import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar, faUser} from "@fortawesome/free-regular-svg-icons";
import {faStar as FaStarSolid} from "@fortawesome/free-solid-svg-icons";

import Subtitle from "../subtitle/subtitle";
import "./reviews.scss";
import axiosBooks from "../../util/axiosBooks";
import {useParams} from "react-router-dom";
import {useUser} from "../../context/userContext";
import ErrorModal from "../error/ErrorModal";

export default function Reviews(props) {
    const {id} = useParams();
    const { user } = useUser();
    const [userReview, setUserReview] = useState(""); // Estado para armazenar a revisão do usuário
    const [userRating, setUserRating] = useState(0.0); // Estado para armazenar a classificação do usuário
    const [errorModalOpen, setErrorModalOpen] = useState(false);

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


    const handleSubmitReview = () => {
        try {
            const pedido = {
                item: id,
                utilizador: user.id,
                nota: userRating,
                comentario: userReview
            };
            console.log("Pedido", pedido);

            const response = axiosBooks.post(`item/rate/${id}`, pedido);
            if (response.status === 200) {
                console.log("Review_added_sucefully");
            } else {
                console.error("Failed_to_add_review");
                setErrorModalOpen(true);
            }
        } catch (error) {
            console.error("Erro ao adicionar avaliação:", error);
        } finally {
            setErrorModalOpen(false);
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

            {errorModalOpen && (
                <ErrorModal
                    message={"Mensagem de erro aqui"}
                    onClose={() => setErrorModalOpen(false)}
                />
            )}

        </div>
    );
}
