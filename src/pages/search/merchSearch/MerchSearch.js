import Filter from "../../../components/filter/Filter";
import SearchInput from "../../../components/searchInput/SearchInput";
import Pagination from "../../../components/shared/pagination/Pagination";
import {useEffect, useState} from "react";
import axiosBooks from "../../../util/axiosBooks";
import MerchList from "../../../components/merchList/MerchList";

export default function MerchSearch(props) {
    const [merch, setMerch] = useState(null);
    const [page, setPage] = useState(1);

    useEffect(() => {
        axiosBooks.get(`/item/merch/all`, {params: {per_page: 6, page: page}})
            .then(r => setMerch(r.data.merch))
            .catch(e => console.log("Error", e))
    }, [page])

    if (!merch) {
        return null
    }

    console.log(merch)

    return <div className={"MerchSearch content"}>

        <div className={"contentDisplay"}>
            <Filter/>

            <div className={"search"}>
                <div className={"container"}>

                    <h1>Pesquisa por Merchandising</h1>

                    <SearchInput text={"Merchandising"}/>

                    <div className={"merchList"}>
                        <MerchList list={merch}/>
                    </div>

                    <Pagination setPage={setPage} page={page} totalPages={100}/>
                </div>
            </div>
        </div>

    </div>
}