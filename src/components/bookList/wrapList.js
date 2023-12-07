import React from "react";
import BookPrice from "../bookPrice/bookPrice";
import "./wrapList.scss";

export default function WrapList(props) {
    const list = props.list || [];

    return (
        <div className={"WrapList"}>
            {list.map((item) => (
                <BookPrice
                    key={props.id}
                    id={item.id}
                    nome={item.nome}
                    autor={item.autor}
                    foto={item.foto}
                    text={item.desde}
                    disponiveis={item.disponiveis}
                />

            ))}
        </div>
    );
}
