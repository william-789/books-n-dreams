import React, {useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import Input from '../../shared/Input/Input';
import Dropdown from '../../shared/Dropdown/Dropdown';
import Pagination from "../../shared/pagination/Pagination";

const RegisterForm = () => {
  const { control, handleSubmit, formState: { errors }, watch } = useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const password = watch('password');
  const accountType = watch("accountType");
  console.log("type",accountType)

  const onSubmit = (data) => {
    console.log(data);
  };
  const getPageCount = (type) => {
    console.log("type on get page",type)
    switch (type) {
      case 1: // Reader
        return 2;
      case 2: // Bookstore
        return 4;
      default:
        return 1;
    }
  };

  useEffect(() => {
    // Update totalPages whenever accountType changes
    setTotalPages(getPageCount(accountType));
  }, [accountType]);
  console.log("total", totalPages)

  return (
    <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
      {/*page 1*/}
      { currentPage === 1 && (
        <>
          <Dropdown
            label={"Tipo de Conta"}
            name={"accountType"}
            control={control}
            options={[
              { value: '', label: 'Escolha o tipo da tua conta' },
              { value: 1, label: 'Leitor' },
              { value: 2, label: 'Livraria' },
            ]}
            rules={{ required: "Tipo de conta é obrigatório" }}
          />
          {errors.accountType && <div className="error">{errors.accountType.message}</div>}
          {accountType === '' && "aaaaaaaa"}

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

          <Input
            label={"Confirmar Palavra-passe"}
            type={"password"}
            name={"passwordConfirmation"}
            control={control}
            placeholder={"Confirma a tua palavra-passe"}
            rules={{
              required: "Escreva novamente a palavra-passe",
              validate: (value) => value === password || "As palavras-passe não coincidem",
            }}
          />
          {errors.passwordConfirmation && <div className="error">{errors.passwordConfirmation.message}</div>}
        </>)
      }
      { currentPage === 2 &&
        <>Página 2</>
      }
      < Pagination page={currentPage} totalPages={totalPages} setPage={setCurrentPage}/>
      <div className={"button-container"}>
        <button className={"submit"} type={"submit"}>
          Submeter
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
