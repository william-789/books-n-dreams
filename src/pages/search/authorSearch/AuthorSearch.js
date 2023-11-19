import {useEffect, useState} from "react";
import axiosBooks, {baseImageLink} from "../../../util/axiosBooks";
import Filter from "../../../components/filter/Filter";
import SearchInput from "../../../components/searchInput/SearchInput";
import Bookshop from "../../../components/bookshop/Bookshop";
import Pagination from "../../../components/shared/pagination/Pagination";
import Author from "../../../components/author/Author";
import AuthorList from "../../../components/authorList/AuthorList";

export default function AuthorSearch(props) {
    const [author, setAuthor] = useState(null);
    const [page, setPage] = useState(1);

    useEffect(() => {
        axiosBooks.get(`/author/all`, {params: {per_page: 6, page: page}})
            .then(r => setAuthor(r.data.authors))
            .catch(e => console.log("Error", e))
    }, [page])

    if (!author) {
        return null
    }
    console.log("author", author)

    return <div className={"AuthorSearch content"}>

        <div className={"contentDisplay"}>
            <Filter/>

            <div className={"search"}>
                <div className={"container"}>

                    <h1>Pesquisa por Autor</h1>

                    <SearchInput text={"Autores"}/>

                    <div className={"authorList"}>
                        <AuthorList list={author}/>
                    </div>

                    <Pagination setPage={setPage} page={page} totalPages={100}/>
                </div>
            </div>
        </div>
    </div>
}