import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons/faBook";

export default function Empty (props) {
  return (
    <div className={"Empty"}>
      <p>{props.text}</p>
      <FontAwesomeIcon icon={faBook} fontSize={50} />
    </div>
  )
}
