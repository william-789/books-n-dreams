import React from "react";
import './userStatusButton.scss'

export default function UserButtonStatus(props) {

    const handleClick = (index) =>{
        props.setActiveButton(index);

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
                className={props.activeButton === 0 ? 'active' : ''}
                onClick={()=> handleClick(0)}>A decorrer</button>
            <div>
                <button
                    className={props.activeButton === 1 ? 'active' : ''}
                    onClick={()=> handleClick(1)}>Entregue</button>
            </div>
            <button
                className={props.activeButton === 2 ? 'active' : ''}
                onClick={()=> handleClick(2)}>Cancelada</button>

        </div>
    );
}
