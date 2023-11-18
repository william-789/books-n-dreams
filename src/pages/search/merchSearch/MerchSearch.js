import Filter from "../../../components/filter/Filter";
import SearchInput from "../../../components/searchInput/SearchInput";
import Pagination from "../../../components/shared/pagination/Pagination";
import {useState} from "react";

export default function MerchSearch(props) {
    const [page, setPage] = useState(1);

    return <div className={"MerchSearch content"}>

        <div className={"contentDisplay"}>
            <Filter/>

            <div className={"search"}>
                <div className={"container"}>

                    <h1>Pesquisa por Merchandising</h1>

                    <SearchInput text={"Merchandising"}/>

                    <div className={"merchList"}>
                    </div>

                    <Pagination setPage={setPage} page={page} totalPages={100}/>
                </div>
            </div>
        </div>

    </div>
}