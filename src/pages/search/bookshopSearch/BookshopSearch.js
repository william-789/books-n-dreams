import {useEffect, useState} from "react";
import axiosBooks, {baseImageLink} from "../../../util/axiosBooks";
import Filter from "../../../components/filter/Filter";
import SearchInput from "../../../components/searchInput/SearchInput";
import Pagination from "../../../components/shared/pagination/Pagination";
import Bookshop from "../../../components/bookshop/Bookshop";

export default function BookshopSearch() {
    const [page, setPage] = useState(1);
    const [filteredBookstore, setFilteredBookstore] = useState(null)
    const [filter, setFilter] = useState("")

    const filterOptions = [
        {text: "Perto de Si", style: "checkbox", class: "nearBy"},
        {
            text: "Ordem Alfabética",
            style: "checkbox",
            class: "alphabetical",
            method: () => setFilteredBookstore(filteredBookstore.sort())
        },
        {text: "Mais Antiga", style: "checkbox", class: "older"},
        {text: "Mais Recente", style: "checkbox", class: "newer"}
    ];

    useEffect(() => {
        axiosBooks.get(`/store/all`, {params: {per_page: 5, page: page, nome: filter}})
            .then(r => setFilteredBookstore(r.data.bookstores))
            .catch(e => console.log("Error", e))
    }, [page, filter])

    if (!filteredBookstore) {
        return null
    }

    function search(input) {
        setFilter(input)
    }

    return <div className={"BookSearch content"}>

        <div className={"contentDisplay"}>
            <Filter list={filterOptions}/>

            <div className={"search"}>
                <div className={"container"}>

                    <h1>Pesquisa por Livraria</h1>

                    <SearchInput text={"Livrarias"} func={search}/>

                    <div className={"bookshopList"}>
                        {filteredBookstore.map(b => <Bookshop id={b.id} name={b.nome} image={baseImageLink + b.capa}/>)}
                    </div>

                    <Pagination setPage={setPage} page={page} totalPages={100}/>
                </div>
            </div>
        </div>
    </div>
}