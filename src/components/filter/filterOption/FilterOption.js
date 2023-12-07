import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";

export default function FilterOption(props) {
    let icon
    let dropdown
    let list = props.list || [];

    const [dropdownVisible, setDropdownVisible] = useState(false);
    const toggleDropdown = () => setDropdownVisible(!dropdownVisible);

    if (props.style === "dropdown") {
        icon = <FontAwesomeIcon icon={faChevronDown}/>
    } else {
        icon =
            <div className={"radioButton"}>
                <input type="radio" name="radioButton" className={"checkbox"} onChange={() => {
                    props.func(props.filter)
                }}></input>
            </div>
    }

    if (props.style === "dropdown") {
        dropdown =
            <div className={"dropdown"} style={{maxHeight: dropdownVisible ? "170px" : "0"}}>

                <div className={"optionDisplay"}>
                    <p><b>Todos</b></p>
                    <div className={"radioButton"}>
                        <input type="radio" name={list[0]?.name} checked={!props.var} className={"checkboxSmaller"} onChange={() => props.clear(props.clearFilter)}></input>
                    </div>
                </div>

                {list.map(l =>
                    <div key={l.id} className={"optionDisplay"}>
                        <p>{l.nome}</p>
                        <div className={"radioButton"}>
                        <input type="radio" name={l.name} className={"checkboxSmaller"} onChange={() => {
                            l.method(l.id)
                            l.page(1)}}
                        ></input>
                        </div>
                    </div>)}

            </div>
    } else {
        dropdown = <div></div>
    }

    return <div className={"FilterOption"}>
        <div className={"filterDisplay"} onClick={toggleDropdown}>
            <p className={`filterText ${props.class}`}>{props.text}</p>
            {icon}
        </div>
        {dropdown}
    </div>
}