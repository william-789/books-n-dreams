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
    const [author, setAuthor] = useState(null);
    const [bookstore, setBookstore] = useState(null);
    const [genre, setGenre] = useState(null);
    const [finalPage, setFinalPage] = useState(1);
    const [suggestionGenre, setSuggestionGenre] = useState(null);
    const [suggestionAuthor, setSuggestionAuthor] = useState(null);
    const [suggestionBookstore, setSuggestionBookstore] = useState(null);

    const filterOptions = [
        {
            text: "Género",
            style: "dropdown",
            list: genreList?.map(g => {
                return {
                    ...g, name: "genre", id: g.id, page: setPage, method: (id) => {
                        setGenre(id)
                    }
                }
            }),
            clear: setGenre,
            clearFilter: null,
            var: genre,
            method: () => {
            }
        },
        {
            text: "Autor",
            style: "dropdown",
            list: authorList?.map(a => {
                return {
                    ...a, name: "author", id: a.id, page: setPage, method: (id) => {
                        setAuthor(id)
                    }
                }
            }),
            clear: setAuthor,
            clearFilter: null,
            var: author,
            method: () => {
            }
        },
        {
            text: "Livraria",
            style: "dropdown",
            list: bookstoreList?.map(b => {
                return {
                    ...b, name: "bookstore", id: b.id, page: setPage, method: (id) => {
                        setBookstore(id)
                    }
                }
            }),
            clear: setBookstore,
            clearFilter: null,
            var: bookstore,
            method: () => {
            }
        }
    ];

    useEffect(() => {
        axiosBooks.get(`/genre/all`, {
            params: {per_page: 99999999}
        })
            .then(r => setGenreList(r.data.genres))
            .catch(e => console.log("Error", e))

        axiosBooks.get(`/store/all`, {
            params: {per_page: 99999999}
        })
            .then(r => setBookstoreList(r.data.bookstores))
            .catch(e => console.log("Error", e))

        axiosBooks.get(`/author/all`, {
            params: {per_page: 99999999}
        })
            .then(r => setAuthorList(r.data.authors))
            .catch(e => console.log("Error", e))
    }, [])

    useEffect(() => {
        axiosBooks.get(`/book/all`, {
            params:
                {
                    per_page: 12,
                    page: page,
                    nome: filter,
                    genero: genre,
                    autor: author,
                    livraria: bookstore
                }
        })
            .then(r => {
                setFilteredBooks(r.data.books)
                setFinalPage(r.data.total_pages)

                if (r.data.books.length === 0) {

                    if (genre) {
                        axiosBooks.get('/book/all', {
                            params: {
                                per_page: 4,
                                page: page,
                                nome: filter,
                                genero: genre
                            }
                        }).then(r => {
                            setSuggestionGenre(r.data.books)
                        })
                    }

                    if (author) {
                        axiosBooks.get('/book/all', {
                            params: {
                                per_page: 4,
                                page: page,
                                nome: filter,
                                autor: author
                            }
                        }).then(r => {
                            setSuggestionAuthor(r.data.books)
                        })
                    }

                    if (bookstore) {
                        axiosBooks.get('/book/all', {
                            params: {
                                per_page: 4,
                                page: page,
                                nome: filter,
                                livraria: bookstore
                            }
                        }).then(r => {
                            setSuggestionBookstore(r.data.books)
                        })
                    }

                } else {
                    setSuggestionGenre(null)
                    setSuggestionAuthor(null)
                    setSuggestionBookstore(null)
                }
            })
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
                    <SearchInput text={"Livros"} func={search} page={setPage}/>

                    <div className={"bookList"}>
                        {
                            filteredBooks.length > 0 ? <WrapList list={filteredBooks}/> :
                                <div className={"noResults"}>
                                    <p className={"information"}>Pesquisa sem resultados</p>
                                    <hr className={"separator"}/>
                                </div>
                        }
                    </div>

                    {suggestionGenre && suggestionGenre.length > 0 ?
                        <div className={"suggestions"}>
                            <p>Porque procurou por {genreList.find((g) => g.id === genre)?.nome}</p>
                            <WrapList list={suggestionGenre}/>
                        </div>
                        : <div></div>}

                    {suggestionAuthor && suggestionAuthor.length > 0 ?
                        <div className={"suggestions"}>
                            <p>Porque procurou por {authorList.find((a) => a.id === author)?.nome}</p>
                            <WrapList list={suggestionAuthor}/>
                        </div>
                        : <div></div>}

                    {suggestionBookstore && suggestionBookstore.length > 0 ?
                        <div className={"suggestions"}>
                            <p>Porque procurou por {bookstoreList.find((b) => b.id === bookstore)?.nome}</p>
                            <WrapList list={suggestionBookstore}/>
                        </div>
                        : <div></div>}

                    {filteredBooks.length > 0 ? <Pagination setPage={setPage} page={page} totalPages={finalPage}/> :
                        <div/>}
                </div>
            </div>
        </div>
    </div>
}