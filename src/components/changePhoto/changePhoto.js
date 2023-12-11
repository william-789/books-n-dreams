import { useForm } from "react-hook-form";
import React, { useState } from 'react';
import Subtitle from "../subtitle/subtitle";
import InputFile from "../shared/Input/InputFile";
import axiosBooks, {baseImageLink} from "../../util/axiosBooks";
const ChangePhoto = (props) => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileInputChange = async (event) => {
        const file = event.target.files[0];
        let formData = new FormData();
        if (file) {
            formData.append('foto', file);
        }
        console.log("formData", formData)
        const token = localStorage.getItem("token");
        await axiosBooks.put('/user/edit-photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'token-header': token
            }
        }).then((r) => {
            props.reload && props.reload();
        })
            .catch(e => {
                console.log(e)
            })
    };

    const handleButtonClick = () => {
        document.getElementById('fileInput').click();
    };

    return (
        <form className={"ChangePhoto"}>
            <img src={baseImageLink+props.foto+ `?timestamp=${new Date().getTime()}`} alt={''}/>
            <div>
                <Subtitle text={'Alterar imagem'}/>
                <InputFile
                    name="fileInput"
                    onChange={(event) => handleFileInputChange(event)}
                    register={register}
                    errors={errors}
                    style={{ display: 'none' }}/>
                <button type={'button'} onClick={handleButtonClick}>Carregar nova imagem</button>
                <button type={'submit'} id={'submitImage'} style={{ display: 'none' }}></button>
            </div>
        </form>
    );
};

export default ChangePhoto;
