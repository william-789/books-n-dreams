import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

function Pagination({setPage, page, totalPages}) {
  return (
    <div className={"Pagination"}>
      <div onClick={() => setPage(page - 1)} className={page === 1 ? 'unactive' : ''}>
        <FontAwesomeIcon icon={faPlay} rotation={180}/>
      </div>
      <p>Página {page} / {totalPages}</p>
      <div onClick={() => setPage(page + 1)} className={page === totalPages ? 'unactive' : ''}>
        <FontAwesomeIcon icon={faPlay}/>
      </div>
    </div>
  )
}

export default Pagination;
