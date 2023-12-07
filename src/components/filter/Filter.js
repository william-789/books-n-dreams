import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSliders} from "@fortawesome/free-solid-svg-icons";
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
                <div key={l.id}>
                    <FilterOption text={l.text}
                                  style={l.style}
                                  func={l.method}
                                  filter={l.filter}
                                  list={l.list}
                                  clear={l.clear}
                                  clearFilter={l.clearFilter}
                                  page={l.page}
                                  var={l.var}
                    />
                    <hr className={"separator"}/>
                </div>)}
        </div>

    </div>
}