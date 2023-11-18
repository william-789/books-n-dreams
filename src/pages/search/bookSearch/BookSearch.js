import {useEffect, useState} from "react";
import axiosBooks from "../../../util/axiosBooks";
import WrapList from "../../../components/bookList/wrapList";
import Filter from "../../../components/filter/Filter";
import SearchInput from "../../../components/searchInput/SearchInput";
import Pagination from "../../../components/shared/pagination/Pagination";

export default function BookSearch(props) {
    const [books, setBooks] = useState(null);
    const [page, setPage] = useState(1);

    useEffect(() => {
        axiosBooks.get(`/book/all`, {params: {per_page: 8, page: page}})
            .then(r => setBooks(r.data.books))
            .catch(e => console.log("Error", e))
    }, [page])

    if(!books) {return null}

    return <div className={"BookSearch content"}>

        <div className={"contentDisplay"}>
            <Filter/>

            <div className={"search"}>
                <div className={"container"}>

                    <h1>Pesquisa por Livro</h1>

                    <SearchInput text={"Livros"}/>

                    <div className={"bookList"}>
                        <WrapList list={books}/>
                    </div>

                    <Pagination setPage={setPage} page={page} totalPages={100}/>
                </div>
            </div>
        </div>
        </div>
}