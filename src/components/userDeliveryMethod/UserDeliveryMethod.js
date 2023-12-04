import React, {useState} from "react";
import './UserDeliveryMethod.scss'
import Favorite from "../favorite/favorite";
import {Link} from "react-router-dom";
import {baseImageLink} from "../../util/axiosBooks";



export default function UserDeliveryMethod(props) {
    const [showHomeDelivery, setShowHomeDelivery] = React.useState(true);
    const [showStoreDelivery, setShowStoreDelivery] = React.useState(true);

    const bgImage = {
        backgroundImage: `url(${baseImageLink+props.capa})`,
    };


    return (
        <div className={"userDeliveryMethod"}>

            {
                showHomeDelivery ? <div className={"delivery-container"}>
                    <div className={"home-delivery"}>
                        <div className={"texts"}>
                            <input type="radio" name="radio-delivery" className={"radio-box"} onClick={()=>{setShowHomeDelivery(false); setShowStoreDelivery(true)}}/>
                            <div className={"info"}>
                                <div className={"title"}>{"Envio ao Domicílio"}</div>
                                <div className={"text"}>{"Envio 4€"}</div>
                            </div>

                        </div>
                    </div>
                </div> : <div className={"delivery-container-details"}>
                    <div className={"home-delivery"}>
                        <div className={"texts"}>
                            <input type="radio" name="radio-delivery" className={"radio-box"} onClick={()=>{setShowHomeDelivery(true)}}/>
                            <div className={"info"}>
                                <div className={"title"}>{"Envio ao Domicílio"}</div>
                                <div className={"text"}>{"Envio 4€"}</div>
                            </div>

                        </div>
                    </div>

                    <span className={"description"}>
                        Entrega da encomenda por um estafeta da transportadora, na morada que indicar, no dia útil seguinte à
                        expedição, entre as 9h00 e as 19h00.
                        Opções extra: i) receber encomenda num intervalo de horário; ii) receber a encomenda no sábado seguinte
                        ao dia de expedição, entre as 9h00 e as 13h00.
                        Aviso de entrega da encomenda no mesmo dia por SMS, com possibilidade de escolha da entrega num local diferente.
                </span>

                    <div className={"address-box"}>

                        <div className={"top-box"}>
                            <div className={"address"}>
                                <h1 className={"title"}>Morada de Entrega</h1>
                                <p type="text" className={"text"}>        </p>
                            </div>
                            <div className={"code"}>
                                <h1 className={"title"}>Código Postal</h1>
                                <p type="text" className={"text"}>        </p>
                            </div>
                        </div>

                        <div className={"bottom-box"}>
                            <div className={"local"}>
                                <h1 className={"title"}>Localidade</h1>
                                <p type="text" className={"text"}>        </p>
                            </div>
                            <div className={"district"}>
                                <h1 className={"title"}>Distrito</h1>
                                <p type="text" className={"text"}>        </p>
                            </div>
                        </div>


                    </div>

                </div>
            }

            {
                showStoreDelivery ? <div className={"delivery-container-store"}>
                    <div className={"store-delivery"}>
                        <div className={"texts"}>
                            <input type="radio" name="radio-delivery" className={"radio-box"} onClick={()=>{setShowStoreDelivery(false); setShowHomeDelivery(true)}}/>
                            <div className={"info"}>
                                <div className={"title"}>{"Recolha em Loja"}</div>
                                <div className={"text"}>{"Envio 0€"}</div>
                            </div>

                        </div>
                    </div>
                </div> : <div className={"delivery-container-store-details"}>
                    <div className={"store-delivery"}>
                        <div className={"texts"}>
                            <input type="radio" name="radio-delivery" className={"radio-box"}/>
                            <div className={"info"}>
                                <div className={"title"}>{"Recolha em Loja"}</div>
                                <div className={"text"}>{"Envio 0€"}</div>
                            </div>

                        </div>
                    </div>

                    <span className={"description"}>
                        RECEBA NA DATA INDICADA NA LIVRARIA SELECIONADA
                        Levantamento da sua encomenda numa livraria Bertrand, até 3 dias úteis após a expedição, no respetivo horário de funcionamento.
                        Aviso para levantamento da encomenda por e-mail e SMS.
                        Prazo para levantamento: 20 dias
                </span>

                    <div className={"address-box"}>

                        <div className={"top-box"}>
                            <div className={"address"}>
                                <h1 className={"title"}>Morada de Levantamento</h1>
                                <p type="text" className={"text"}>        </p>
                            </div>
                        </div>


                    </div>

                </div>
            }


        </div>

    );
}
