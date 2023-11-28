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
    const [nationalityList, setNationalityList] = useState(null)
    const [nationality, setNationality] = useState(null);
    const [order, setOrder] = useState(null);

    const filterOptions = [
        {
            text: "Nacionalidade",
            style: "dropdown",
            list: nationalityList?.map(n => {
                return {
                    ...n, name: "genre", id: n.id, method: (id) => {
                        setNationality(id)
                    }
                }
            }),
            clear: setNationality,
            clearFilter: null,
            method: () => {
            }
        },
        {
            text: "Ordem Alfabética",
            style: "checkbox",
            filter: "nome",
            method: setOrder
        },
        {
            text: "Limpar",
            style: "checkbox",
            filter: "",
            method: () => {
                setOrder(null)
            }
        }
    ];

    useEffect(() => {
        axiosBooks.get(`/author/all`, {
            params:
                {
                    per_page: 6,
                    page: page,
                    nome: filter,
                    ordem: order,
                    nacionalidade: nationality
                }
        })
            .then(r => setFilteredAuthor(r.data.authors))
            .catch(e => console.log("Error", e))

        axiosBooks.get(`/author/nationalities/all`,)
            .then(r => setNationalityList(r.data.nationalities))
            .catch(e => console.log("Error", e))
    }, [page, filter, nationality, order])

    if (!filteredAuthor || !nationalityList) {
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
                        {filteredAuthor.length > 0 ? <AuthorList list={filteredAuthor}/> : <p className={"noResult"}>Pesquisa sem resultados</p>}
                    </div>

                    <Pagination setPage={setPage} page={page} totalPages={10}/>
                </div>
            </div>
        </div>
    </div>
}