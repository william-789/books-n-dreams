import {useEffect, useState} from "react";
import axiosBooks, {baseImageLink} from "../../../util/axiosBooks";
import Filter from "../../../components/filter/Filter";
import SearchInput from "../../../components/searchInput/SearchInput";
import Bookshop from "../../../components/bookshop/Bookshop";
import Pagination from "../../../components/shared/pagination/Pagination";
import Author from "../../../components/author/Author";
import AuthorList from "../../../components/authorList/AuthorList";

export default function AuthorSearch(props) {
    const [page, setPage] = useState(1);
    const [filteredAuthor, setFilteredAuthor] = useState(null);
    const [filter, setFilter] = useState("")
    const [nationality, setNationality] = useState(null)

    const filterOptions = [
        {text: "Nacionalidade", style: "dropdown", list: nationality},
        {text: "Ordem Alfabética", style: "checkbox"},
    ];

    useEffect(() => {
        axiosBooks.get(`/author/all`, {params: {per_page: 6, page: page, nome: filter}})
            .then(r => setFilteredAuthor(r.data.authors))
            .catch(e => console.log("Error", e))

        axiosBooks.get(`/author/nationalities/all`,)
            .then(r => setNationality(r.data.nationalities))
            .catch(e => console.log("Error", e))
    }, [page, filter])

    if (!filteredAuthor || !nationality) {
        return null
    }

    function search(input) {
        setFilter(input)
    }

    return <div className={"AuthorSearch content"}>

        <div className={"contentDisplay"}>
            <Filter list={filterOptions}/>

            <div className={"search"}>
                <div className={"container"}>

                    <h1>Pesquisa por Autor</h1>

                    <SearchInput text={"Autores"} func={search}/>

                    <div className={"authorList"}>
                        <AuthorList list={filteredAuthor}/>
                    </div>

                    <Pagination setPage={setPage} page={page} totalPages={100}/>
                </div>
            </div>
        </div>
    </div>
}