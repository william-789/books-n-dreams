import {useEffect, useState} from "react";
import axiosBooks from "../../../util/axiosBooks";
import WrapList from "../../../components/bookList/wrapList";
import Filter from "../../../components/filter/Filter";
import SearchInput from "../../../components/searchInput/SearchInput";
import Pagination from "../../../components/shared/pagination/Pagination";

export default function BookSearch(props) {
    const [page, setPage] = useState(1);
    const [finalPage, setFinalPage] = useState(1);
    const [filteredBooks, setFilteredBooks] = useState(null);
    const [filter, setFilter] = useState("");
    const [genre, setGenre] = useState(null);
    const [bookstore, setBookstore] = useState(null);
    const [author, setAuthor] = useState(null);

    const filterOptions = [
        {text: "Género", style: "dropdown", class: "genre", list: genre},
        {text: "Autor", style: "dropdown", class: "author", list: author},
        {text: "Livraria", style: "dropdown", class: "bookstore", list: bookstore}
    ];

    useEffect(() => {
        axiosBooks.get(`/book/all`, {params: {per_page: 9, page: page, nome: filter}})
            .then(r => setFilteredBooks(r.data.books))
            .catch(e => console.log("Error", e))

        axiosBooks.get(`/genre/all`, {params: {per_page: 15}})
            .then(r => setGenre(r.data.genres))
            .catch(e => console.log("Error", e))

        axiosBooks.get(`/store/all`, {params: {per_page: 20}})
            .then(r => setBookstore(r.data.bookstores))
            .catch(e => console.log("Error", e))

        axiosBooks.get(`/author/all`, {params: {per_page: 20}})
            .then(r => setAuthor(r.data.authors))
            .catch(e => console.log("Error", e))
    }, [page, filter])

    if (!filteredBooks || !genre || !bookstore) {
        return null
    }

    console.log("genre", genre)

    function search(input) {
        setFilter(input)
    }

    return <div className={"BookSearch content"}>

        <div className={"contentDisplay"}>
            <Filter list={filterOptions}/>

            <div className={"search"}>
                <div className={"container"}>

                    <h1>Pesquisa por Livro</h1>

                    <SearchInput text={"Livros"} func={search}/>

                    <div className={"bookList"}>
                        <WrapList list={filteredBooks}/>
                    </div>

                    <Pagination setPage={setPage} page={page} totalPages={100}/>
                </div>
            </div>
        </div>
    </div>
}