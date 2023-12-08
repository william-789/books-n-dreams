import Filter from "../../../components/filter/Filter";
import SearchInput from "../../../components/searchInput/SearchInput";
import Pagination from "../../../components/shared/pagination/Pagination";
import {useEffect, useState} from "react";
import axiosBooks from "../../../util/axiosBooks";
import MerchList from "../../../components/merchList/MerchList";
import Merch from "../../../components/merch/Merch";
import WrapList from "../../../components/bookList/wrapList";

export default function MerchSearch(props) {
    const [page, setPage] = useState(1);
    const [filteredMerch, setFilteredMerch] = useState(null);
    const [filter, setFilter] = useState("")
    const [bookstoreList, setBookstoreList] = useState(null);
    const [typeList, setTypeList] = useState(null);
    const [bookstore, setBookstore] = useState(null);
    const [type, setType] = useState(null);
    const [finalPage, setFinalPage] = useState(1);
    const [suggestionType, setSuggestionType] = useState(null);
    const [suggestionBookstore, setSuggestionBookstore] = useState(null);

    const filterOptions = [
        {
            text: "Tipo",
            style: "dropdown",
            list: typeList?.map(b => {
                return {
                    ...b, name: "type", id: b.id, page: setPage, method: (id) => {
                        setType(id)
                    }
                }
            }),
            clear: setType,
            clearFilter: null,
            var: type,
            method: () => {
            }
        },
        {
            text: "Livraria",
            style: "dropdown",
            class: "bookstore",
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
        axiosBooks.get(`/store/all`, {
            params: {per_page: 99999999}
        })
            .then(r => setBookstoreList(r.data.bookstores))
            .catch(e => console.log("Error", e))

        axiosBooks.get(`/item/itemType/all`, {
            params: {per_page: 99999999}
        })
            .then(r => setTypeList(r.data.types))
            .catch(e => console.log("Error", e))
    }, [])

    useEffect(() => {
        axiosBooks.get(`/item/merch/all`, {
            params:
                {
                    per_page: 6,
                    page: page,
                    nome: filter,
                    livraria: bookstore,
                    tipo: type
                }
        })
            .then(r => {
                setFilteredMerch(r.data.merch)
                setFinalPage(r.data.total_pages)

                if (r.data.merch.length === 0) {

                    if (type) {
                        axiosBooks.get('/item/merch/all', {
                            params: {
                                per_page: 4,
                                page: page,
                                nome: filter,
                                tipo: type
                            }
                        }).then(r => {
                            setSuggestionType(r.data.merch)
                        })
                    }

                    if (bookstore) {
                        axiosBooks.get('/item/merch/all', {
                            params: {
                                per_page: 4,
                                page: page,
                                nome: filter,
                                livraria: bookstore
                            }
                        }).then(r => {
                            setSuggestionBookstore(r.data.merch)
                        })
                    }
                } else {
                    setSuggestionType(null)
                    setSuggestionBookstore(null)
                }
            })
            .catch(e => console.log("Error", e))

    }, [page, filter, bookstore, type])

    if (!filteredMerch || !bookstoreList || !typeList) {
        return null
    }

    function search(input) {
        setFilter(input)
    }

    return <div className={"MerchSearch content"}>

        <div className={"contentDisplay"}>
            <Filter list={filterOptions}/>

            <div className={"search"}>
                <div className={"container"}>

                    <h1>Pesquisa por Merchandising</h1>

                    <SearchInput text={"Merchandising"} func={search} page={setPage}/>

                    <div className={"merchList"}>
                        {
                            filteredMerch.length > 0 ? <MerchList list={filteredMerch}/> :
                                <div className={"noResults"}>
                                    <p className={"information"}>Pesquisa sem resultados</p>
                                    <hr className={"separator"}/>
                                </div>
                        }
                    </div>

                    {suggestionType && suggestionType.length > 0 ?
                        <div className={"suggestions"}>
                            <p>Porque procurou por {typeList.find((t) => t.id === type)?.nome}</p>
                            <MerchList list={suggestionType}/>
                        </div>
                        : <div></div>}

                    {suggestionBookstore && suggestionBookstore.length > 0 ?
                        <div className={"suggestions"}>
                            <p>Porque procurou por {bookstoreList.find((b) => b.id === bookstore)?.nome}</p>
                            <MerchList list={suggestionBookstore}/>
                        </div>
                        : <div></div>}

                    {filteredMerch.length > 0 ? <Pagination setPage={setPage} page={page} totalPages={finalPage}/> :
                        <div/>}
                </div>
            </div>
        </div>
    </div>
}