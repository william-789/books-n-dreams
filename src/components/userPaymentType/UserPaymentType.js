import React from "react";
import './UserPaymentType.scss'
import Favorite from "../favorite/favorite";
import {Link} from "react-router-dom";
import {baseImageLink} from "../../util/axiosBooks";
import imageCreditCard from "./credit-card-solid.png";
import imageMultiBank from "./multibanco.png";
import imageMbWay from "./mbWay.png";
import Input from "../shared/Input/Input";
import RadioInput from "../shared/Input/RadioInput";


export default function UserPaymentType(props) {

  return (
    <div className={"userPaymentType"}>

      <div className={"card-container"}>
        <div className={"paymentType-Card"}>
          <div className={"texts"}>
            <RadioInput
              name={"type"}
              register={props.register}
              value={"credit"}
            />
            <div className={"title"}>{"**** **** **** 39747"}</div>
          </div>
          <img src={imageCreditCard} className={"otherPayments"} alt=""/>
        </div>
      </div>

      <div className={"mbWay-container"}>
        <div className={"paymentType-Card"}>
          <div className={"texts"}>
            <RadioInput
              name={"type"}
              register={props.register}
              value={"mbway"}
            />
            <div className={"title"}>{"MB WAY"}</div>
          </div>
          <img src={imageMbWay} className={"mbway"} alt=""/>
        </div>
      </div>

      <div className={"multi-container"}>
        <div className={"paymentType-Card"}>
          <div className={"texts"}>
            <RadioInput
              name={"type"}
              register={props.register}
              value={"multibanco"}
            />
            <div className={"title"}>{"Multibanco"}</div>
          </div>
          <img src={imageMultiBank} className={"otherPayments"} alt=""/>
        </div>
      </div>

    </div>

  );
}
