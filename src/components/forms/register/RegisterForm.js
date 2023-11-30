import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../../shared/Input/Input';
import Dropdown from '../../shared/Dropdown/Dropdown';
import Pagination from "../../shared/pagination/Pagination";
import axiosBooks from "../../../util/axiosBooks";
import InputFile from "../../shared/Input/InputFile";

const distritos = [
  { value: 'Aveiro', label: 'Aveiro' },
  { value: 'Beja', label: 'Beja' },
  { value: 'Braga', label: 'Braga' },
  { value: 'Bragança', label: 'Bragança' },
  { value: 'Castelo Branco', label: 'Castelo Branco' },
  { value: 'Coimbra', label: 'Coimbra' },
  { value: 'Évora', label: 'Évora' },
  { value: 'Faro', label: 'Faro' },
  { value: 'Guarda', label: 'Guarda' },
  { value: 'Leiria', label: 'Leiria' },
  { value: 'Lisboa', label: 'Lisboa' },
  { value: 'Portalegre', label: 'Portalegre' },
  { value: 'Porto', label: 'Porto' },
  { value: 'Santarém', label: 'Santarém' },
  { value: 'Setúbal', label: 'Setúbal' },
  { value: 'Viana do Castelo', label: 'Viana do Castelo' },
  { value: 'Vila Real', label: 'Vila Real' }
];

const RegisterForm = () => {
  const { register, control, handleSubmit, formState: { errors }, watch } = useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [message, setMessage] = useState(null);

  const setPhoto = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const password = watch('password');
  const accountType = watch("accountType");



  const onSubmit = async (data) => {
    let formData = new FormData();

    formData.append('accountType', data.accountType);
    formData.append('nome', data.name);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('morada', data.morada);
    formData.append('localidade', data.localidade);
    formData.append('codigo_postal', data.codigo_postal);
    formData.append('contacto', data.contacto);
    formData.append('data_nascimento', data.data_nascimento);
    formData.append('description', data.description);
    formData.append('distrito', data.distrito);
    formData.append('NIPC', data.NIPC);
    formData.append('horario', data.horario);

    if (selectedImage) {
      formData.append('capa', selectedImage);
    }

    await axiosBooks.post('/user/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(() => {
      setMessage({type: 'success', text: 'Registo feito com sucesso. Faz login para acessar a conta.'})
    })
      .catch(e => {
        if(e.response.status === 401) setMessage({type: 'error', text: 'Este e-mail já está em uso. Faz login para acessar a conta.'})
        else setMessage({type: 'error', text: 'Um erro ocorreu. Tente novamente mais tarde.'})

      })
  };
  const getPageCount = (type) => {
    switch (+type) {
      case 1: // Reader
        return 2;
      case 2: // Bookstore
        return 3;
      default:
        return 1;
    }
  };

  useEffect(() => {
    // Update totalPages based on accountType
    setTotalPages(getPageCount(accountType));
  }, [accountType]);

  return (
    <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
      {message && <div className={'message '+message.type}>{message.text}</div>}
      <div className={`page ${currentPage === 1 ? '' : 'hidden'}`}>
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
            standard={'Escolha o tipo da tua conta'}
          />
          {errors.accountType && <div className="error">{errors.accountType.message}</div>}
          <Input
            label="Nome"
            type="text"
            name="name"
            placeholder="Escreve aqui o teu nome"
            control={control}
            rules={{
              required: 'Nome é obrigatório',
            }}
          />
          {errors.name && <div className="error">{errors.name.message}</div>}

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
        </div>
      <div className={`page ${currentPage === 2 ? '' : 'hidden'}`}>
        <div className={"group"}>
          <div className={"left flex-1"}>
            <Input
              label="Morada"
              type="text"
              name="morada"
              placeholder="Escreve aqui a tua morada"
              control={control}
              rules={{
                required: 'Morada é obrigatória',
                maxLength: {
                  value: 145,
                  message: 'Máximo de 145 caracteres',
                },
              }}
            />
            {errors.morada && <div className="error">{errors.morada.message}</div>}
          </div>
          <div className={"c-45"}>
            <Input
              label="Código Postal"
              type="text"
              name="codigo_postal"
              placeholder="Escreve aqui o teu código postal"
              control={control}
              rules={{
                required: 'Código postal é obrigatório',
                pattern: {
                  value: /^\d{5}-\d{3}$/,
                  message: 'Insira um código postal válido (99999-999)',
                },
              }}
            />
            {errors.codigo_postal && <div className="error">{errors.codigo_postal.message}</div>}
          </div>
        </div>
        <div className={"group"}>
          <div className={"c-45 left"}>
            <Input
              label="Localidade"
              type="text"
              name="localidade"
              placeholder="Escreve aqui a tua localidade"
              control={control}
              rules={{
                required: 'Localidade é obrigatória',
              }}
            />
            {errors.localidade && <div className="error">{errors.localidade.message}</div>}
          </div>
          <div className={"flex-1"}>
            <Dropdown
              label={"Distrito"}
              name={"distrito"}
              control={control}
              options={[
                { value: '', label: 'Escolha o distrito' },
                ...distritos
              ]}
              rules={{ required: "Distrito é obrigatório" }}
              standard={'Escolha o distrito'}
            />
            {errors.distrito && <div className="error">{errors.distrito.message}</div>}
          </div>
        </div>
        <Input
          label="Contacto Telefónico"
          type="text"
          name="contacto"
          placeholder="Escreve aqui o teu contacto telefónico"
          control={control}
          rules={{
            required: +accountType === 2 ? 'Obrigatório' : false,
            pattern: {
              value: /^\d{9}$/,
              message: 'Insira um número válido',
            },
          }}
        />
        {errors.contacto && <div className="error">{errors.contacto.message}</div>}
        {+accountType === 2 &&
          <>
            <Input
              label="NIPC"
              type="text"
              name="NIPC"
              placeholder="Enter your fiscal number (e.g., 123456789)"
              control={control}
              rules={{
                required: 'NIPC é obrigatório',
                pattern: {
                  value: /^\d{9}$/,
                  message: 'Insira um NIPC válido (123456789)',
                },
              }}
            />
            {errors.NIPC && <div className="error">{errors.NIPC.message}</div>}
          </>}
        {+accountType === 1 &&
          <>
            <Input
              label="Data de Nascimento"
              type="date"
              name="data_nascimento"
              placeholder="YYYY-MM-DD"
              control={control}
              rules={{
                required: 'Obrigatório.'
              }}/>
            {errors.data_nascimento && <div className="error">{errors.data_nascimento.message}</div>}
          </>}
      </div>
      {+accountType === 2 &&
      <>
        <div className={`page ${currentPage === 3 ? '' : 'hidden'}`}>
          <Input
            big={true}
            label="Descrição"
            type="text"
            name="description"
            placeholder="Apresenta a livraria para os leitores"
            control={control}
            rules={{
              required: 'Descrição é obrigatória',
              maxLength: {
                value: 700,
                message: 'Máximo de 700 caracteres',
              },
            }}
          />
          {errors.description && <div className="error">{errors.description.message}</div>}
          <InputFile
            label="Fotografia"
            name="fileInput"
            onChange={(event) => setPhoto(event)}
            register={register}
            errors={errors}
            rules={{
              required: 'Escolha uma foto bonita para os leitores :)',
            }}
          />
          {errors.fileInput && <div className="error">{errors.fileInput.message}</div>}
          <Input
            label="Horário de funcionamento"
            type="text"
            name="horario"
            placeholder="Escreve aqui teu horário de funcionamento"
            control={control}
            rules={{
              required: 'Horário de funcionamento é obrigatório',
            }}
          />
          {errors.horario && <div className="error">{errors.horario.message}</div>}
        </div>
      </>}
      {totalPages > 1 && < Pagination page={currentPage} totalPages={totalPages} setPage={setCurrentPage}/>}
      <div className={"button-container"}>
        <button className={"submit"} type={"submit"}>
          Submeter
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
