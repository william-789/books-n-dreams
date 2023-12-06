// userPost.js
import { baseImageLink } from "../../util/axiosBooks";
import "./userPost.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import React from "react";

export default function UserPost(props) {
    return (
        <div className="UserPost">

            <div className="Image">
                {props.foto === null ? (
                    <div className="UserPhoto">
                        <FontAwesomeIcon icon={faUser} alt="icon do usuário" />
                    </div>
                ) : (
                    <div
                        className="UserPhoto"
                        style={{ backgroundImage: `url(${baseImageLink + props.foto})` }}
                    />
                )}

                <div className="InputBox">
                    <input type="text" placeholder="Leu algum livro interessante e que gostou?" />
                </div>
            </div>

                <button className="button">
                    Submeter
                </button>


        </div>
    );
}
