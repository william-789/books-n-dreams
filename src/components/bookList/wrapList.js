import React, { useEffect, useState } from "react";
import BookPrice from "../bookPrice/bookPrice";
import "./wrapList.scss"

export default function WrapList(props) {

    return (
        <div className={"WrapList"}>
            {props.list.map((book) => (
                <BookPrice
                    key={book.id}
                    nome={book.nome}
                    autor={book.autor}
                    foto={book.foto}
                    text={book.desde}
                />
            ))}
        </div>
    );
}
