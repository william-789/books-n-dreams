import React from "react";
import './UserLibrary.scss'
import Favorite from "../favorite/favorite";
import {Link} from "react-router-dom";
import {baseImageLink} from "../../util/axiosBooks";

export default function UserLibrary(props) {

  const bgImage = {
    backgroundImage: `url(${baseImageLink+props.capa})`,
  };
    return (
            <div className={"userLibrary"}>

                <div className={"userLibraryImage"} style={bgImage}></div>

                <div className={"userLibraryText"}>

                    <Link to={`/bookstore/${props.id}`}>
                        <div className={"texts"}>
                            <div className={"title"}>{props.nome}</div>
                            <div className={"text"}>{props.morada},<br/>{props.codigo_postal} {/*props.localidade*/} {props.distrito}, Portugal </div>
                        </div>
                    </Link>

                    <Favorite id={props.id} type={'store'}/>
                </div>

            </div>
    );
}
