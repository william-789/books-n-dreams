import React from "react";
import './UserDeliveryMethod.scss'
import Favorite from "../favorite/favorite";
import {Link} from "react-router-dom";
import {baseImageLink} from "../../util/axiosBooks";



export default function UserDeliveryMethod(props) {

    const bgImage = {
        backgroundImage: `url(${baseImageLink+props.capa})`,
    };


    return (
        <div className={"userDeliveryMethod"}>

            <div className={"delivery-container"}>
                <div className={"home-delivery"}>
                    <div className={"texts"}>
                        <input type="radio" name="radio-delivery" className={"radio-box"}/>
                        <div className={"info"}>
                            <div className={"title"}>{"Envio ao Domicílio"}</div>
                            <div className={"text"}>{"Envio 4€"}</div>
                        </div>

                    </div>
                </div>
            </div>

            <div className={"delivery-container-store"}>
                <div className={"store-delivery"}>
                    <div className={"texts"}>
                        <input type="radio" name="radio-delivery" className={"radio-box"}/>
                        <div className={"info"}>
                            <div className={"title"}>{"Recolha em Loja"}</div>
                            <div className={"text"}>{"Envio 0€"}</div>
                        </div>

                    </div>
                </div>
            </div>


        </div>

    );
}
