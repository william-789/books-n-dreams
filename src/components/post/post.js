import "./post.scss";
import {baseImageLink} from "../../util/axiosBooks";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsis, faX, faThumbsUp, faComment} from "@fortawesome/free-solid-svg-icons";
import {faComment as faCommentEmpty, faUser} from '@fortawesome/free-regular-svg-icons'
import {faThumbsUp as faThumbsUpEmpty} from '@fortawesome/free-regular-svg-icons'
import {faUser as faUserEmpty} from '@fortawesome/free-regular-svg-icons'

import React, {useState} from "react";

export default function Post(props) {
    const [comment, setComment] = useState("");

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleAddComment = () => {
        // Lógica para adicionar o comentário (pode ser implementada conforme necessário)
        console.log("Adicionar comentário:", comment);
        setComment(""); // Limpa a caixa de texto após adicionar o comentário
    };

    return (
        <div className={"Post"}>
            <div className={"Extras"}>
                <FontAwesomeIcon icon={faEllipsis}/>
                <FontAwesomeIcon icon={faX}/>
            </div>

            <div className={"UserInfo"}>
                <div className={"Profile"}
                     style={{backgroundImage: `url(${baseImageLink + props.imagem})`}}/>

                <div className={"Text"}>
                    <h2>{props.nome}</h2>
                    <h3>1 d</h3>
                </div>
            </div>

            <div className={"Image"}>
                <div className={"Cover"}
                     style={{backgroundImage: `url(${baseImageLink + props.foto})`}}/>
            </div>

            <div className={"TextoPost"}>
                <h2>{props.texto}</h2>
            </div>

            <div className={"LikesComments"}>
                <div className={"Likes"}>
                    <FontAwesomeIcon icon={faThumbsUp}/>
                    <h2>2</h2>
                </div>

                <div className={"Comments"}>
                    <h2> 1 comentário</h2>
                </div>
            </div>

            <div className={"LikesCommentsGiven"}>
                <div className={"LikesGiven"}>
                    <FontAwesomeIcon icon={faThumbsUpEmpty}/>
                    <h2> Gostar </h2>
                </div>

                <div className={"CommentsGiven"}>
                    <FontAwesomeIcon icon={faCommentEmpty}/>
                    <h2> Comentar</h2>
                </div>
            </div>

            <div className={"Comentario"}>
                <div className={"Icon"}>
                    <FontAwesomeIcon icon={faUserEmpty}/>
                </div>

                <div className={"Rectangle"}>
                    <h3>Concordo consigo, acabei de ler este mesmo livro e adorei :D</h3>
                </div>

            </div>

            <div className={"LikeReply"}>
                <h2> Gostar</h2>
                <h2> Responder</h2>

                <h3>3h</h3>

            </div>

            <div className={"CommentBox"}>
                <div className={"UserImage"}>
                    {props.utilizador === null ? (
                        <div className="User">
                            <FontAwesomeIcon icon={faUser} alt="icon do usuário"/>
                        </div>
                    ) : (
                        <div className="UserCircle">
                            <img className="UserImage" src={baseImageLink + props.utilizador} alt="Foto do usuário"/>
                        </div>
                    )}
                </div>

                <div className={"CommentContent"}>
    <input
        placeholder="Comente..."
        value={comment}
        onChange={handleCommentChange}
    />
                    <button onClick={handleAddComment}>Adicionar Comentário</button>
                </div>
            </div>

        </div>
    );
}
