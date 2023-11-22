import Filter from "../../../components/filter/Filter";
import SearchInput from "../../../components/searchInput/SearchInput";
import Pagination from "../../../components/shared/pagination/Pagination";
import {useEffect, useState} from "react";
import axiosBooks from "../../../util/axiosBooks";
import MerchList from "../../../components/merchList/MerchList";

export default function MerchSearch(props) {
    const [page, setPage] = useState(1);
    const [filteredMerch, setFilteredMerch] = useState(null);
    const [filter, setFilter] = useState("")
    const [bookstore, setBookstore] = useState(null);
    const [type, setType] = useState(null);

    const filterOptions = [
        {text: "Tipo", style: "dropdown", list: type},
        {text: "Livraria", style: "dropdown", class: "bookstore", list: bookstore}
    ];


    useEffect(() => {
        axiosBooks.get(`/item/merch/all`, {params: {per_page: 6, page: page, nome: filter}})
            .then(r => setFilteredMerch(r.data.merch))
            .catch(e => console.log("Error", e))

        axiosBooks.get(`/store/all`, {params: {per_page: 20}})
            .then(r => setBookstore(r.data.bookstores))
            .catch(e => console.log("Error", e))

        axiosBooks.get(`/item/itemType/all`)
            .then(r => setType(r.data.types))
            .catch(e => console.log("Error", e))
    }, [page, filter])

    if (!filteredMerch || !bookstore || !type) {
        return null
    }

    console.log(type, "type")
    function search(input) {
        setFilter(input)
    }

    return <div className={"MerchSearch content"}>

        <div className={"contentDisplay"}>
            <Filter list={filterOptions}/>

            <div className={"search"}>
                <div className={"container"}>

                    <h1>Pesquisa por Merchandising</h1>

                    <SearchInput text={"Merchandising"} func={search}/>

                    <div className={"merchList"}>
                        <MerchList list={filteredMerch}/>
                    </div>

                    <Pagination setPage={setPage} page={page} totalPages={100}/>
                </div>
            </div>
        </div>

    </div>
}