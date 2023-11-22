import React from "react";
import './UserLibrary.scss'
import Favorite from "../favorite/favorite";
import {Link} from "react-router-dom";

export default function UserLibrary(props) {

    return (
            <div className={"userLibrary"}>

                <div className={"userLibraryImage"}></div>

                <div className={"userLibraryText"}>

                    <Link to={"/bookstore/:id"}>
                        <div className={"texts"}>
                            <div className={"title"}>Centesima Página</div>
                            <div className={"text"}>Rua Dona Augusta 5,<br/>1225-221 Lisboa, Portugal </div>
                        </div>
                    </Link>

                    <Favorite/>
                </div>

            </div>
    );
}