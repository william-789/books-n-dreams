import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSliders, faChevronDown} from "@fortawesome/free-solid-svg-icons";
import FilterOption from "./filterOption/FilterOption";

export default function Filter(props) {
    let list = props.list

    return <div className={"Filter"}>

        <div className={"header"}>
            <p className={"filterTitle"}>Filtro</p>
            <FontAwesomeIcon icon={faSliders}/>

        </div>
        <hr/>

        <div className={"filters"}>
            {list.map(l =>
                <div>
                    <FilterOption text={l.text} style={l.style} class={l.class} func={l.method} list={l.list}/>
                    <hr className={"separator"}/>
                </div>)}
        </div>

    </div>
}