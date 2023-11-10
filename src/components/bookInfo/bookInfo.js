import "./BookInfo.scss"
import ThirdButton from "../buttons/ThirdButton/ThirdButton";

export default function BookInfo(props) {
    return <div className={"BookInfo"}>
        <div className={"image"}>
            <img>{props.foto}</img>
        </div>

        <div className={"info"}>
            <h3>{props.nome}</h3>
            <h3>{props.autor}</h3>

            <ThirdButton text={"Desde 15,50€"}/>
        </div>

    </div>
}