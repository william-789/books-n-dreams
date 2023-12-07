import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import {useState} from "react";

export default function SearchInput(props) {
    const [filter, setFilter] = useState("")

    function handleKeyPress(e) {
        if(e.code === "Enter") {
            props.func(filter)
            props.page(1)
        }
    }

    return <div className={"SearchInput"}>
        <div className={"contentDisplay"}>
            <div className={"search"}>
                <div className={"input"}>
                    <input id={"inputField"} placeholder={`Pesquisar`} type={"text"}
                           value={filter} onChange={e => setFilter(e.target.value)}
                           onKeyDown={handleKeyPress}/>
                </div>
                <FontAwesomeIcon icon={faMagnifyingGlass} onClick={() => {
                    props.func(filter)
                    props.page(1)
                }}/>
            </div>
            <p>{props.text}</p>
        </div>
    </div>
}