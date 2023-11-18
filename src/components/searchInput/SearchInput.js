import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'

export default function SearchInput(props) {
    return <div className={"SearchInput"}>
        <div className={"input"}>
            <FontAwesomeIcon icon={faMagnifyingGlass}/>
            <input id={"inputField"} placeholder={"Pesquisar"} type={"text"}/>
        </div>
        <p>{props.text}</p>
    </div>
}