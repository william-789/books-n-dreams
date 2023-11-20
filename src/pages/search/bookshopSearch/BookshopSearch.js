import {useEffect, useState} from "react";
import axiosBooks, {baseImageLink} from "../../../util/axiosBooks";
import Filter from "../../../components/filter/Filter";
import SearchInput from "../../../components/searchInput/SearchInput";
import loginForm from "../../../components/forms/login/LoginForm";
import WrapList from "../../../components/bookList/wrapList";
import Pagination from "../../../components/shared/pagination/Pagination";
import Bookshop from "../../../components/bookshop/Bookshop";

export default function BookshopSearch() {
    const [bookstore, setBookstore] = useState(null);
    const [page, setPage] = useState(1);

    useEffect(() => {
        axiosBooks.get(`/store/all`, {params: {per_page: 5, page: page}})
            .then(r => setBookstore(r.data.bookstores))
            .catch(e => console.log("Error", e))
    }, [page])

    if (!bookstore) {
        return null
    }

    return <div className={"BookSearch content"}>

        <div className={"contentDisplay"}>
            <Filter/>

            <div className={"search"}>
                <div className={"container"}>

                    <h1>Pesquisa por Livraria</h1>

                    <SearchInput text={"Livrarias Parceiras"}/>

                    <div className={"bookshopList"}>
                        {bookstore.map(b => <Bookshop id={b.id} name={b.nome} image={baseImageLink + b.capa}/>)}
                    </div>

                    <Pagination setPage={setPage} page={page} totalPages={100}/>
                </div>
            </div>
        </div>
    </div>
}