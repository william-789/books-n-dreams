import {useEffect, useState} from "react";
import axiosBooks from "../../../util/axiosBooks";
import WrapList from "../../../components/bookList/wrapList";
import Filter from "../../../components/filter/Filter";
import SearchInput from "../../../components/searchInput/SearchInput";
import Pagination from "../../../components/shared/pagination/Pagination";

export default function BookSearch(props) {
    const [page, setPage] = useState(1);
    const [filteredBooks, setFilteredBooks] = useState(null);
    const [filter, setFilter] = useState("");
    const [genreList, setGenreList] = useState(null);
    const [bookstoreList, setBookstoreList] = useState(null);
    const [authorList, setAuthorList] = useState(null);
    const [author, setAuthor] = useState(null)
    const [bookstore, setBookstore] = useState(null)
    const [genre, setGenre] = useState(null)

    const filterOptions = [
        {
            text: "Género",
            style: "dropdown",
            list: genreList?.map(g => {
                return {...g, name:"genre", id: g.id, method: (id) => {setGenre(id)}}
            }),
            clear: setGenre,
            clearFilter: null,
            method: () => {}
        },
        {
            text: "Autor",
            style: "dropdown",
            list: authorList?.map(a => {
                return {...a, name:"author", id: a.id, method: (id) => {setAuthor(id)}}
            }),
            clear: setAuthor,
            clearFilter: null,
            method: () => {}
        },
        {
            text: "Livraria",
            style: "dropdown",
            list: bookstoreList?.map(b => {
                return {...b, name:"bookstore", id: b.id, method: (id) => {setBookstore(id)}}
            }),
            clear: setBookstore,
            clearFilter: null,
            method: () => {}
        }
    ];

    useEffect(() => {
        axiosBooks.get(`/book/all`, {
            params:
                {
                    per_page: 6,
                    page: page,
                    nome: filter,
                    genero: genre,
                    autor: author,
                    livraria: bookstore
                }
        })
            .then(r => setFilteredBooks(r.data.books))
            .catch(e => console.log("Error", e))

        axiosBooks.get(`/genre/all`)
            .then(r => setGenreList(r.data.genres))
            .catch(e => console.log("Error", e))

        axiosBooks.get(`/store/all`)
            .then(r => setBookstoreList(r.data.bookstores))
            .catch(e => console.log("Error", e))

        axiosBooks.get(`/author/all`)
            .then(r => setAuthorList(r.data.authors))
            .catch(e => console.log("Error", e))
    }, [page, filter, genre, author, bookstore])

    if (!filteredBooks || !genreList || !bookstoreList) {
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

                    <h1>Pesquisa por Livro</h1>
                    <SearchInput text={"Livros"} func={search}/>

                    <div className={"bookList"}>
                        {filteredBooks.length > 0 ? <WrapList list={filteredBooks}/> : <p className={"noResult"}>Pesquisa sem resultados</p>}
                    </div>

                    <Pagination setPage={setPage} page={page} totalPages={10}/>
                </div>
            </div>
        </div>
    </div>
}