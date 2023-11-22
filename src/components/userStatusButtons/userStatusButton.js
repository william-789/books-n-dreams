import React from "react";
import './userStatusButton.scss'
import {Link} from "react-router-dom";
import {useState} from "react";

export default function UserButtonStatus(props) {

    const [activeButton, setActiveButton] = useState(0);

    const handleClick = (index) =>{
        setActiveButton(index);

        switch (index){
            case 0 :
                break;
            case 1 :
                break;
            default :
        }

    }

    return (
        <div className={"userButtonStatus"}>
            <button
                className={activeButton === 0 ? 'active' : ''}
                onClick={()=> handleClick(0)}>Entregue</button>
            <div>
                <button
                    className={activeButton === 1 ? 'active' : ''}
                    onClick={()=> handleClick(1)}>A decorrer</button>
            </div>
            <button
                className={activeButton === 2 ? 'active' : ''}
                onClick={()=> handleClick(2)}>Cancelada</button>

        </div>
    );
}