import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSliders, faChevronDown} from "@fortawesome/free-solid-svg-icons";

export default function Filter(props) {
    return <div className={"Filter"}>

        <div className={"filters"}>
            <p className={"filterTitle"}>Filtro</p>
            <FontAwesomeIcon icon={faSliders}/>
        </div>
        <hr/>

        <div className={"filters"}>
            <p className={"filterText"}>{props.text}</p>
            <FontAwesomeIcon icon={faChevronDown}/>
        </div>

    </div>
}