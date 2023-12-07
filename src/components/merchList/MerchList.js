import React from "react";
import Merch from "../merch/Merch";

export default function MerchList(props) {
    const { list, details } = props;
    const serieFilter = details ? item => item.serie === details.serie : () => true;
    const filteredList = list.filter(serieFilter);

    return (
        <div className={"MerchList"}>
            {filteredList.map((m) => (
                <Merch
                    key={m.id}
                    id={m.id}
                    nome={m.nome}
                    autor={m.autor}
                    foto={m.foto}
                    text={m.desde}
                    disponiveis={m.disponiveis}
                />
            ))}
        </div>
    );
}
