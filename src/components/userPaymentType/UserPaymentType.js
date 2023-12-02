import React from "react";
import './UserPaymentType.scss'
import Favorite from "../favorite/favorite";
import {Link} from "react-router-dom";
import {baseImageLink} from "../../util/axiosBooks";
import imageCreditCard from "./credit-card-solid.png";
import imageMultiBank from "./multibanco.png";
import imageMbWay from "./mbWay.png";


export default function UserPaymentType(props) {

    const bgImage = {
        backgroundImage: `url(${baseImageLink+props.capa})`,
    };


        return (
            <div className={"userPaymentType"}>

                <div className={"card-container"}>
                    <div className={"paymentType-Card"}>
                        <div className={"texts"}>
                            <input type="radio" name="radio" className={"radio-box"}/>
                            <div className={"title"}>{"**** **** **** 39747"}</div>
                        </div>
                            <img src={imageCreditCard} className={"otherPayments"} alt=""/>
                    </div>
                </div>

                <div className={"mbWay-container"}>
                    <div className={"paymentType-Card"}>
                        <div className={"texts"}>
                            <input type="radio" name="radio" className={"radio-box"}/>
                            <div className={"title"}>{"MB WAY"}</div>
                        </div>
                        <img src={imageMbWay} className={"mbway"} alt=""/>
                    </div>
                </div>

                <div className={"multi-container"}>
                    <div className={"paymentType-Card"}>
                        <div className={"texts"}>
                            <input type="radio" name="radio" className={"radio-box"}/>
                            <div className={"title"}>{"Multibanco"}</div>
                        </div>
                        <img src={imageMultiBank} className={"otherPayments"} alt=""/>
                    </div>
                </div>

            </div>

        );
}
