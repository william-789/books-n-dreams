import "./BookPrice.scss";
import ThirdButton from "../buttons/ThirdButton/ThirdButton";
import { Link, useParams } from "react-router-dom";
import { baseImageLink } from "../../util/axiosBooks";

export default function BookPrice(props) {
    const { id } = useParams();
    const showLastUnits = props.disponiveis && props.disponiveis < 5;

    return (
        <div className={"BookPrice"}>
            <Link to={`/book/${props.id}`} className={"link"}>
                <div className={"image"}>
                    <img src={baseImageLink + props.foto} alt={props.nome} />
                </div>

                {showLastUnits && <p className={"lastUnits"}>Últimas unidades</p>}

                <div className={"info"}>
                    <h3>{props.nome}</h3>
                    <h4>{props.autor}</h4>


                    <ThirdButton text={"Desde " + props.text + "€"} />
                </div>
            </Link>
        </div>
    );
}
