import React, { useEffect, useState } from "react";
import BookPrice from "../bookPrice/bookPrice";
import "./bookList.scss"
const BookList = () => {
    const [books, setBooks] = useState([]);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

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

        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className={"BookList"}>
            {books.slice(0, isMobile ? 2 : 4).map((book, index) => (
                <BookPrice
                    key={index}
                    nome={book.nome}
                    autor={book.autor}
                    foto={book.foto}
                />
            ))}
        </div>
    );
};

export default BookList;