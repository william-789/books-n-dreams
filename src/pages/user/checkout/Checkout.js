import React, {useEffect, useState} from "react";
import './Checkout.scss';
import Footer from "../../../components/footer/Footer";
import SubTitles from '../../../components/subtitle/subtitle';
import axiosBooks from "../../../util/axiosBooks";
import {useUser} from "../../../context/userContext";
import UserPaymentType from "../../../components/userPaymentType/UserPaymentType";
import UserDeliveryMethod from "../../../components/userDeliveryMethod/UserDeliveryMethod";
import UserBanner from "../../../components/shared/UserBanner";
import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";

export default function Checkout() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { user } = useUser();
  const [detalhes, setDetalhes] = useState();
  const [data, setData] = useState(null);
  const [carregando, setCarregando] = useState(true)
  const [moradaUser, setMoradaUser] = useState(null)
  const [openModal, setOpenModal] = useState(false)
  const history = useHistory();

  const getData = async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        'token-header': token
      }
    };

    try {
      const userDetails = await axiosBooks.get(`/user/${user.id}`);
      setDetalhes(userDetails.data.user);
      const data = userDetails.data.user
      const checkoutData = await axiosBooks.get(`/item/checkout-data`, {
        headers: config.headers
      });
      setData(checkoutData.data);
      setMoradaUser({moradaU: data.morada, codigo: data.codigo_postal, localidade: data.localidade, distrito: data.distrito})
      setCarregando(false);
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmit = async (formdata) => {
    const token = localStorage.getItem("token");
    let copyData = {...data, type: formdata.type, contacto: formdata.contacto}
    const listaCopy = copyData.lista.slice(0);
    const newList = listaCopy.map((l)=>{
      let porte = l.porte;
      if(formdata[`${l.id}delivery`] === "Levantamento em loja") {
        porte = 0;
      }

      return {
        ...l,
        porte,
        delivery: formdata[`${l.id}delivery`]
      }
    })
    copyData.lista = newList;
    copyData.total = newList.reduce((a, item) => a + item.porte, copyData.total)

    await axiosBooks.post('/item/checkout', JSON.stringify(copyData), {
      headers: {
        'token-header': token,
        'Content-Type': 'application/json'
      }
    })
      .then(r=> {
        console.log(r.data)
        history.push('/profile')
      })
      .catch(e => {})
  };

  useEffect(()=>{
    getData()
  },[user])

  if(carregando) return null;

  return <div className={"shoppingCart content"}>

    <UserBanner {...detalhes}/>

    <form className="wrapper" onSubmit={handleSubmit(onSubmit)}>
      <h1 className={"title-checkout"}>Check Out</h1>
      <div className={"space"}></div>
      {
        data.lista.map((l)=>{
          return <>
            <SubTitles text={`Método de envio / Recolha - ${l.livraria}`}/>
            <UserDeliveryMethod register={register} {...l} {...moradaUser}/>
          </>
        })
      }

      <div className={"space"}></div>

      <SubTitles text={"Tipo de Pagamento"}/>

      <UserPaymentType register={register} />

      <div className={"total-checkout"}>
        <div className={"text"}>Total</div>
        <div className={"price"}>55,88€</div>
      </div>

      <div className={"btn-box"}>
        <button className={"button-continuar"} type={"submit"}>Continuar</button>
      </div>

    </form>

    <div className={"space"}></div>




    <Footer/>

  </div>

}
