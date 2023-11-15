import "./BookPrice.scss"
import ThirdButton from "../buttons/ThirdButton/ThirdButton";
import {Link} from "react-router-dom";

export default function BookPrice(props) {
    return <div className={"BookPrice"}>
        <Link to={`/book/${props.key}`} className={"link"}>
        <div className={"image"}>
            <img src={props.foto} alt={props.nome} />
        </div>

        <div className={"info"}>
            <h3>{props.nome}</h3>
            <h3>{props.autor}</h3>

            <ThirdButton text={props.text}/>
        </div>
        </Link>

    </div>
}