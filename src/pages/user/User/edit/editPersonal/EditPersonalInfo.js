import {useUser} from "../../../../../context/userContext";
import React, {useEffect, useState} from "react";
import axiosBooks, {baseImageLink} from "../../../../../util/axiosBooks";
import UserInfoEdit from "../../../../../components/userInfoEdit/UserInfoEdit";
import {useForm} from "react-hook-form";
import Input from "../../../../../components/shared/Input/Input";
import Dropdown from "../../../../../components/shared/Dropdown/Dropdown";
import Footer from "../../../../../components/footer/Footer";
import {useHistory} from "react-router-dom";
import ChangePhoto from "../../../../../components/changePhoto/changePhoto";

export default function EditPersonalInfo(props) {
    const {user, isLogged, openModal} = useUser();
    const [userInfo, setUserInfo] = useState(null)
    const {register, control, handleSubmit, formState: {errors}, watch} = useForm();
    const token = localStorage.getItem("token");
    const history = useHistory();

    const password = watch('password');
    const [selectedImage, setSelectedImage] = useState(null); // test
    const [displayMessage, setDisplayMessage] = useState(<div id={"displayMessage"}/>)

    const setPhoto = (event) => { // test
        console.log("set photo", event.target?.files)
        const file = event.target.files[0];
        setSelectedImage(file);
    };

    const distritos = [
        {value: 'Aveiro', label: 'Aveiro'},
        {value: 'Beja', label: 'Beja'},
        {value: 'Braga', label: 'Braga'},
        {value: 'Bragança', label: 'Bragança'},
        {value: 'Castelo Branco', label: 'Castelo Branco'},
        {value: 'Coimbra', label: 'Coimbra'},
        {value: 'Évora', label: 'Évora'},
        {value: 'Faro', label: 'Faro'},
        {value: 'Guarda', label: 'Guarda'},
        {value: 'Leiria', label: 'Leiria'},
        {value: 'Lisboa', label: 'Lisboa'},
        {value: 'Portalegre', label: 'Portalegre'},
        {value: 'Porto', label: 'Porto'},
        {value: 'Santarém', label: 'Santarém'},
        {value: 'Setúbal', label: 'Setúbal'},
        {value: 'Viana do Castelo', label: 'Viana do Castelo'},
        {value: 'Vila Real', label: 'Vila Real'}
    ];

    async function getData() {
        await axiosBooks.get(`/user/${user.id}`)
            .then(r => setUserInfo(r.data.user))
    }

    useEffect(() => {
        getData()
    }, [])

    if (!userInfo) {
        return null
    }

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

        await axiosBooks.put(`/user/edit-info`, processedData, {
            headers: {"token-header": token}
        }).then(() => {
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

    return <div className={"EditPersonalInfo content"}>
        {displayMessage}

        <div className={"userInfo"}>
            <div className={"banner"} style={{backgroundImage: `url(${baseImageLink + userInfo.capa})`}}/>
            <div className={"wrapper-Info container"}>

                <div className={"imageText"}>
                    <div className={"userImage"}
                         style={{backgroundImage: `url(${baseImageLink + (userInfo.foto || '/users/userIcon.png')}`}}/>
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
                                label={"Alterar o nome"}
                                type={"text"}
                                name={"nome"}
                                placeholder="Escreve aqui o teu nome"
                                control={control}/>
                            {errors.nome && <div className="error">{errors.nome.message}</div>}

                            <Input
                                label={"Alterar o e-mail"}
                                type={"email"}
                                name={"email"}
                                control={control}
                                placeholder={"Escreve aqui o teu e-mail"}
                                rules={{
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: "E-mail inválido"
                                    }
                                }}/>
                            {errors.email && <div className="error">{errors.email.message}</div>}

                            <Input
                                label={"Alterar a palavra-passe"}
                                type={"password"}
                                name={"password"}
                                control={control}
                                placeholder={"Escreve aqui a tua palavra-passe"}/>
                            {errors.password && <div className="error">{errors.password.message}</div>}

                            <Input
                                label={"Confirmar nova palavra-passe"}
                                type={"password"}
                                name={"passwordConfirmation"}
                                control={control}
                                placeholder={"Confirma a tua palavra-passe"}
                                rules={{
                                    required: password ? "Escreva novamente a palavra-passe" : false,
                                    validate: (value) => value === password || "As palavras-passe não coincidem"
                                }}/>
                            {errors.passwordConfirmation &&
                                <div className="error">{errors.passwordConfirmation.message}</div>}

                            <Input
                                label={"Palavra-passe atual"}
                                type={"password"}
                                name={"currentPassword"}
                                control={control}
                                placeholder={"Confirma a tua palavra-passe"}
                                rules={{
                                    required: password ? "Escreva a palavra-passe atual" : false
                                }}/>
                            {errors.currentPassword && <div className="error">{errors.currentPassword.message}</div>}

                            <Input
                                label={"Alterar Morada"}
                                type={"text"}
                                name={"morada"}
                                placeholder={"Escreve aqui a tua morada"}
                                control={control}
                                rules={{
                                    maxLength: {
                                        value: 145,
                                        message: 'Máximo de 145 caracteres',
                                    }
                                }}/>
                            {errors.morada && <div className="error">{errors.morada.message}</div>}

                            <div className={"displayInput"}>

                                <div className={"specialInput"}>
                                    <Input
                                        label={"Alterar Código Postal"}
                                        type={"text"}
                                        name={"codigo_postal"}
                                        placeholder={"Escreve aqui o teu código postal"}
                                        control={control}
                                        rules={{
                                            pattern: {
                                                value: /^\d{5}-\d{3}$/,
                                                message: 'Insira um código postal válido (99999-999)',
                                            }
                                        }}/>
                                    {errors.codigo_postal &&
                                        <div className="error">{errors.codigo_postal.message}</div>}
                                </div>

                                <div className={"specialInput"}>
                                    <Input
                                        label="Alterar Localidade"
                                        type="text"
                                        name="localidade"
                                        placeholder="Escreve aqui a tua localidade"
                                        control={control}/>
                                    {errors.localidade && <div className="error">{errors.localidade.message}</div>}
                                </div>

                            </div>

                            <Dropdown
                                label={"Alterar distrito"}
                                name={"distrito"}
                                control={control}
                                options={[
                                    {value: "", label: 'Escolha o distrito'},
                                    ...distritos]}
                                standard={'Escolhe o teu distrito'}
                            />
                            {errors.distrito && <div className="error">{errors.distrito.message}</div>}

                            <Input
                                label="Alterar contacto telefónico"
                                type="text"
                                name="contacto"
                                placeholder="Escreve aqui o teu contacto telefónico"
                                control={control}
                                rules={{
                                    pattern: {
                                        value: /^\d{9}$/,
                                        message: 'Insira um número válido',
                                    }
                                }}/>
                            {errors.contacto && <div className="error">{errors.contacto.message}</div>}

                            <Input
                                label="Alterar data de nascimento"
                                type="date"
                                name="data_nascimento"
                                placeholder="YYYY-MM-DD"
                                control={control}/>
                            {errors.data_nascimento && <div className="error">{errors.data_nascimento.message}</div>}

                            {/*
                            <InputFile
                                label="Alterar fotografia"
                                name="fileInput"
                                onChange={(event) => setPhoto(event)}
                                register={register}
                                errors={errors}/>
                            {errors.fileInput && <div className="error">{errors.fileInput.message}</div>}
                            */}

                            <div className={"buttons"}>
                                <button className={"save"} type={"submit"}>
                                    Guardar Alterações
                                </button>
                                <button className={"back"} type={"reset"} onClick={history.goBack}>
                                    Cancelar
                                </button>
                            </div>

                        </form>
                        <ChangePhoto reload={() => getData()} foto={userInfo.foto}/>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    </div>
}