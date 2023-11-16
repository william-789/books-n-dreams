import "./BookPrice.scss"
import ThirdButton from "../buttons/ThirdButton/ThirdButton";
import {Link} from "react-router-dom";
import { baseImageLink } from "../../util/axiosBooks";

export default function BookPrice(props) {
    return <div className={"BookPrice"}>
        <Link to={`/book/${props.key}`} className={"link"}>
        <div className={"image"}>
            <img src={baseImageLink+props.foto} alt={props.nome} />
        </div>

        <div className={"info"}>
            <h3>{props.nome}</h3>
            <h3>{props.autor}</h3>

            <ThirdButton text={"Desde " + props.text+"€"}/>
        </div>
        </Link>

    </div>
}