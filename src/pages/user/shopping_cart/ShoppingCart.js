import React, {useEffect, useState} from "react";
import './ShoppingCart.scss';
import {Link} from "react-router-dom";
import Footer from "../../../components/footer/Footer";
import SubTitles from '../../../components/subtitle/subtitle';
import axiosBooks from "../../../util/axiosBooks";
import {useUser} from "../../../context/userContext";
import UserItems from "../../../components/userItems/UserItems";
import UserLine from "../../../components/userItems/UserLine";
import UserBanner from "../../../components/shared/UserBanner";


export default function ShoppingCart() {
    const { user, isLogged, openModal, quantityCart, setQuantityCart } = useUser();
    const [detalhes, setDetalhes] = useState();
    const [cart, setcart] = useState(null);
    const [carregando, setCarregando] = useState(true)
    const [total, setTotal] = useState(0)

    const token = localStorage.getItem("token");
    const getData = async () => {
        const config = {
            headers: {
                'token-header': token
            }
        };

        try {
            const userDetails = await axiosBooks.get(`/user/${user.id}`);
            setDetalhes(userDetails.data.user);

            const cartData = await axiosBooks.get('/item/cart', {
                headers: config.headers
            });
            setcart(cartData.data);

            setCarregando(false);
        } catch (e) {
            console.log(e);
        }
    };

    const updateDbCart = async (quantity, id, store, opcao) => {
        const pedido = {
            quantity,
            id,
            store,
            opcao
        };
        await axiosBooks.post('/item/add-to-cart/', pedido, {
            headers: { "token-header": token },
        } )
    }
    const handleIncrement = async (itemData) => {
        const { id, unidades, storeId, opcao } = itemData
        await updateDbCart(unidades+1, id, storeId, opcao)
          .then(()=>{
              const updatedCart = cart.map((item) =>
                item.id === itemData.id ? { ...item, unidades: item.unidades + 1 } : item
              );
              setcart(updatedCart);
              setQuantityCart(+quantityCart+1)
          })
          .catch(e=>{
              console.log(e)
          })

    };

    const handleDecrement = async (itemData) => {
        const { id, unidades, storeId, opcao } = itemData
        await updateDbCart(unidades-1, id, storeId, opcao)
          .then(()=>{
              const updatedCart = cart.map((item) =>
                item.id === id && item.unidades > 0 ? { ...item, unidades: item.unidades - 1 } : item
              );
              setcart(updatedCart);
              setQuantityCart(quantityCart-1)
          })
          .catch(e=>{
              console.log(e)
          })
    };

    const handleRemove = async (itemData) => {
        const { id, storeId, opcao } = itemData
        await updateDbCart(0, id, storeId, opcao)
          .then(()=>{
              const [itemCart] = cart.filter((item)=>item.id === id);
              const updatedCart = cart.filter((item) =>
                item.id !== id
              );
              setcart(updatedCart);
              setQuantityCart(quantityCart-itemCart.unidades)
          })
          .catch(e=>{
              console.log(e)
          })
    }

    const updateTotal = () => {
        const sum = cart.reduce((a,b)=>{
            return a + (+b.preco * b.unidades)
        }, 0);
        setTotal(sum)
    }
    useEffect(()=>{
        getData()
    },[])

    useEffect(()=>{
        if(cart) {
            updateTotal();
        }
    },[cart])

    if(carregando) return null;

    return <div className={"shoppingCart content"}>

        <UserBanner {...detalhes} />
        <div className="wrapper">
            <SubTitles text={"O meu carrinho"}/>
        </div>


        <div className="wrapper">
            {
                cart.map((i) => {
                    return (
                      <>
                          <UserItems
                            increment={() => handleIncrement(i)}
                            decrement={() => handleDecrement(i)}
                            remove={()=> handleRemove(i)}
                            {...i}/>
                          <UserLine/>
                      </>
                    )
                })
            }

           <div className={"total"}>
               <div className={"text"}>Total</div>
               <div className={"price"}>{total.toFixed(2)}€</div>
           </div>

            {/* BOTÃO */}
            <Link to={"/checkout"}>
                <div className={"btn-box"}>
                    <button className={"button-ver-mais"}>Check Out</button>
                </div>
            </Link>

        </div>

        <div className={"space"}></div>

        <Footer/>

    </div>

}
