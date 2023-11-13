import "./BookPrice.scss"
import ThirdButton from "../buttons/ThirdButton/ThirdButton";

export default function BookPrice(props) {
    return <div className={"BookPrice"}>
        <div className={"image"}>
            <img src={props.foto} alt={props.nome} />
        </div>

        <div className={"info"}>
            <h3>{props.nome}</h3>
            <h3>{props.autor}</h3>

            <ThirdButton text={"Desde 15,50€"}/>
        </div>

    </div>
}