import {baseImageLink} from "../../util/axiosBooks";
import React from "react";
import Merch from "../merch/Merch";

export default function MerchList(props) {
    const merchList = props.list || [];

    return (<div className={"MerchList"}>
            {merchList.map((m) => (
                <Merch
                    key={m.id}
                    id={m.id}
                    name={m.nome}
                    image={m.foto}
                    text={m.desde}
                />
            ))}
        </div>
    );
}