import React, { useEffect, useState } from "react";
import BookPrice from "../bookPrice/bookPrice";
import "./wrapList.scss"

export default function WrapList(props) {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = [
                {
                    nome: "OS ESQUECIDOS DE DOMINGO",
                    autor: "Irene Vallejo",
                    foto: "url_da_imagem_1",
                },
                {
                    nome: "OS ESQUECIDOS DE DOMINGO",
                    autor: "Irene Vallejo",
                    foto: "url_da_imagem_2",
                },
                {
                    nome: "OS ESQUECIDOS DE DOMINGO",
                    autor: "Irene Vallejo",
                    foto: "url_da_imagem_3",
                },
                {
                    nome: "OS ESQUECIDOS DE DOMINGO",
                    autor: "Irene Vallejo",
                    foto: "url_da_imagem_4",
                },
            ];

            setBooks(data);
        };

        fetchData();
    }, []);

    return (
        <div className={"WrapList"}>
            {books.map((book, index) => (
                <BookPrice
                    key={index}
                    nome={book.nome}
                    autor={book.autor}
                    foto={book.foto}
                />
            ))}
        </div>
    );
}
