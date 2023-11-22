import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";

export default function FilterOption(props) {
    let icon
    let dropdown
    let list = props.list || [];

    const [dropdownVisible, setDropdownVisible] = useState(false);
    const toggleDrowpdown = () => setDropdownVisible(!dropdownVisible);

    if (props.style === "dropdown") {
        icon = <FontAwesomeIcon icon={faChevronDown}/>
    } else {
        icon =
            <div className={"radioButton"}>
                <input type="radio" name="radioButton" className={"checkbox"} onClick={props.func}></input>
            </div>
    }

    if (props.style === "dropdown") {
        dropdown =
            <div className={"dropdown"} style={{display: dropdownVisible ? "block" : "none"}}>
                {list.map(l =>
                    <div className={"optionDisplay"}>
                        <p>{l.nome}</p>
                        <div className={"radioButton"}>
                        <input type="radio" name="radioButton" className={"checkboxSmaller"} onClick={props.func}></input>
                        </div>
                    </div>)}
            </div>
    } else {
        dropdown = <div></div>
    }

    return <div className={"FilterOption"}>
        <div className={"filterDisplay"} onClick={toggleDrowpdown}>
            <p className={`filterText ${props.class}`}>{props.text}</p>
            {icon}
        </div>
        {dropdown}
    </div>
}