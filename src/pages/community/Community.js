import {useEffect, useState} from "react";
import axiosBooks from "../../util/axiosBooks";
import {useParams} from "react-router-dom";
import Post from "../../components/post/post";
import "./Community.scss"
import {useUser} from "../../context/userContext";
import UserPost from "../../components/userPost/userPost";

export default function Community(props) {
    const {id = 1} = useParams();
    const {user} = useUser()
    const [posts, setPosts] = useState([]);
    const [utilizador, setUtilizador] = useState(null);

    const getData = async () => {
        try {
            await Promise.all([
                axiosBooks.get(`/item/post/${id}`).then((r) => {
                    console.log(r.data.posts);
                    setPosts(r.data.posts);
                }),

                axiosBooks.get(`/user/${user.id}`).then((r) => {
                    console.log(r.data.user);
                    setUtilizador(r.data.user);
                }),
            ])
        } catch (error) {
            console.log("Error fetching data, ", error)
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className={"Community"}>
            <h1>Bem Vindo!</h1>

            {utilizador && (
                <UserPost foto={utilizador.foto}/>
            )}

            <Post key={posts.id}
                  imagem={posts.imagem}
                  nome={posts.nome}
                  foto={posts.foto}
                  texto={posts.texto}/>
        </div>
    );
}
