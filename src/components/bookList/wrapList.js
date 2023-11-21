import React from "react";
import BookPrice from "../bookPrice/bookPrice";
import "./wrapList.scss";

export default function WrapList(props) {
    const bookList = props.list || [];

    return (<div className={"WrapList"}>
            {bookList.map((book) => (
                <BookPrice
                    key={book.id}
                    id={book.id}
                    nome={book.nome}
                    autor={book.autor}
                    foto={book.foto}
                    text={book.desde}
                    disponiveis={book.disponiveis}
                />
            ))}
        </div>
    );
}
