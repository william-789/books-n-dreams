import './LoginForm.scss'
import Input from "../../shared/Input/Input";
import { useUser } from "../../../context/userContext";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axiosBooks from "../../../util/axiosBooks";

function LoginForm() {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const { authUser ,closeModal, getWishlist, getFav } = useUser()
  const [error, setError] = useState('');

  const onSubmit = async (data) => {
    await axiosBooks.post('/user/login', data)
      .then(r=> {
        const token = r.data.token
        authUser(r.data.token)
        setError('')
        getWishlist(token)
        getFav(token)
      })
      .then(()=> {
        closeModal()
      })
      .catch(e => {
        if(e.response.status === 400) setError('E-mail ou palavra-passe incorretos')
        else setError('Um erro ocorreu. Tente novamente mais tarde.')
      })
  };

  return (
    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
      {error && <div className="error">{error}</div>}
      <Input
        label={"E-mail"}
        type={"email"}
        name={"email"}
        control={control}
        placeholder={"Escreve aqui o teu e-mail"}
        rules={{ required: "E-mail é obrigatório", pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "E-mail inválido" } }}
      />
      {errors.email && <div className="error">{errors.email.message}</div>}
      <Input
        label={"Palavra-passe"}
        type={"password"}
        name={"password"}
        control={control}
        placeholder={"Escreve aqui a tua palavra-passe"}
        rules={{ required: "Palavra-passe é obrigatória" }}
      />
      {errors.password && <div className="error">{errors.password.message}</div>}
      <div className={"button-container"}>
        <button className={"submit"} type={"submit"}>
          Submeter
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
