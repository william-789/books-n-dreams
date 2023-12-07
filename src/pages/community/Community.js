import { useEffect, useState } from "react";
import axiosBooks from "../../util/axiosBooks";
import { useParams } from "react-router-dom";
import Post from "../../components/post/post";
import "./Community.scss";
import { useUser } from "../../context/userContext";
import UserPost from "../../components/userPost/userPost";

export default function Community(props) {
    const { id = 1 } = useParams();
    const { user } = useUser();
    const [post, setPost] = useState(null);
    const [utilizador, setUtilizador] = useState(null);

    const getData = async () => {
        try {
            const response = await axiosBooks.get(`/item/post/${id}`);
            setPost(response.data.post[0]); // Ajuste aqui, diretamente pegando o primeiro post do array

            const userResponse = await axiosBooks.get(`/user/${user.id}`);
            setUtilizador(userResponse.data.user);
        } catch (error) {
            console.log("Error fetching data, ", error);
        }
    };

    useEffect(() => {
        getData();
    }, [id]);

    return (
        <div className={"Community"}>
            <h1>Bem Vindo!</h1>

            {utilizador && <UserPost foto={utilizador.foto} />}

            {post && (
                <Post
                    key={post.id}
                    imagem={post.imagem}
                    nome={post.nome}
                    foto={post.foto}
                    texto={post.texto}
                    utilizador={utilizador && utilizador.foto}
                />
            )}
        </div>
    );
}
