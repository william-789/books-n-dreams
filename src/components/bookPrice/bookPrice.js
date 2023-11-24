import "./BookPrice.scss";
import ThirdButton from "../buttons/ThirdButton/ThirdButton";
import { Link, useParams } from "react-router-dom";
import { baseImageLink } from "../../util/axiosBooks";

export default function BookPrice(props) {
    const { id } = useParams();
    const showLastUnits = props.disponiveis && props.disponiveis < 3; //TODO: Mudar número de disponivéis

    return (
        <div className={"BookPrice"}>
            <Link to={`/book/${props.id}`} className={"Link"}>
                <div className={"ImageContainer"}>
                    <div className={"Image"} style={{ backgroundImage: `url(${baseImageLink + props.foto})` }} />
                </div>


                <div className={"Info"}>
                    <h3>{props.nome}</h3>
                    <h4>{props.autor}</h4>

                    <ThirdButton text={"Desde " + props.text + "€"} />
                </div>

                {showLastUnits && <p className={"LastUnits"}>Últimas unidades</p>}

            </Link>

        </div>
);
}
