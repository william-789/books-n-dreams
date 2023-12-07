import {useUser} from "../../../../../context/userContext";
import React, {useEffect, useState} from "react";
import axiosBooks, {baseImageLink} from "../../../../../util/axiosBooks";
import UserInfoEdit from "../../../../../components/userInfoEdit/UserInfoEdit";
import {useForm} from "react-hook-form";
import Input from "../../../../../components/shared/Input/Input";
import {useHistory} from "react-router-dom";

export default function EditPaymentInfo(props) {
    const {user, isLogged, openModal} = useUser();
    const [userInfo, setUserInfo] = useState(null);
    const {register, control, handleSubmit, formState: {errors}, watch} = useForm();
    const history = useHistory();
    const [displayMessage, setDisplayMessage] = useState(<div id={"displayMessage"}/>)

    async function getData() {
        await axiosBooks.get(`/user/${user.id}`)
            .then(r => setUserInfo(r.data.user))
            .catch(e => console.log("Error", e))
    }

    useEffect(() => {
        getData()
    }, [])

    if (!userInfo) {
        return null
    }

    console.log(userInfo)

    async function onSubmit(data) {
        let isAllNull = true;
        const processedData = {...data};

        Object.keys(processedData).forEach((key) => {
            if (processedData[key] === '' || processedData[key] === undefined) {
                processedData[key] = null;
            } else {
                isAllNull = false;
            }
        });

        await axiosBooks.put(`/user/edit-info`, data)
            .then(() => {
                getData()
                if (isAllNull) {
                    throw new Error()
                }
                setDisplayMessage(
                    <div className={"success"} id={"displayMessage"}>
                        <small>Informações alteradas com sucesso</small>
                        <button onClick={() => setDisplayMessage(null)}>
                            X
                        </button>
                    </div>
                )
                document.getElementById('displayMessage').scrollIntoView({behavior: 'smooth'})
            }).catch(() => {
                setDisplayMessage(
                    <div className={"error"} id={"displayMessage"}>
                        <small>Não foi possível alterar as suas informações</small>
                        <button onClick={() => setDisplayMessage(null)}>
                            X
                        </button>
                    </div>
                )
                document.getElementById('displayMessage').scrollIntoView({behavior: 'smooth'})
            })
    }

    return <div className={"EditPaymentInfo content"}>
        {displayMessage}

        <div className={"userInfo"}>
            <div className={"banner"} style={{backgroundImage: `url(${baseImageLink + userInfo.capa})`}}/>
            <div className={"wrapper-Info container"}>

                <div className={"imageText"}>
                    <div className={"userImage"} style={{backgroundImage: `url(${baseImageLink + userInfo.foto})`}}/>
                    <div className={"userText"}>
                        <h1>{userInfo.nome}</h1>
                    </div>
                </div>
            </div>

            <div className={"textInfo"}>
                <div className={"changes"}>
                    <div className={"editOptions"}>
                        <UserInfoEdit/>
                    </div>

                    <div className={"form"}>
                        <form className="changeInfo-form" onSubmit={handleSubmit(onSubmit)}>

                            <Input
                                label="Alterar o número do cartão"
                                type="text"
                                name="cartao"
                                placeholder="Escreve aqui o teu número do cartão"
                                control={control}
                                rules={{
                                    pattern: {
                                        value: /^\d{16}$/,
                                        message: 'Insira um cartão válido',
                                    }
                                }}/>
                            {errors.cartao && <div className="error">{errors.cartao.message}</div>}

                            <div className={"buttons"}>
                                <button className={"save"} type={"submit"}>
                                    Guardar Alterações
                                </button>
                                <button className={"back"} type={"reset"} onClick={history.goBack}>
                                    Cancelar
                                </button>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
