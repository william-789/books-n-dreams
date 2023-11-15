import './LoginForm.scss'
import Input from "../../shared/Input/Input";
import { useUser } from "../../../context/userContext";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import axiosBooks from "../../../../../../copies/src/util/axiosBooks";

function LoginForm() {
  const history = useHistory();
  const { control, handleSubmit, formState: { errors } } = useForm();

  const getFav = async(email) => {

  }

  const onSubmit = (data) => {
  };

  return (
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
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
          type={"text"}
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
