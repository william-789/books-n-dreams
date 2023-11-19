import Author from "../author/Author";
import {baseImageLink} from "../../util/axiosBooks";
import BookPrice from "../bookPrice/bookPrice";
import React from "react";

export default function AuthorList(props) {
    const authorList = props.list || [];

    return (<div className={"AuthorList"}>
            {authorList.map((a) => (
                <Author
                    key={a.id}
                    id={a.id}
                    name={a.nome}
                    image={baseImageLink + a.foto}
                />
            ))}
        </div>
    );
}