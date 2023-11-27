import Filter from "../../../components/filter/Filter";
import SearchInput from "../../../components/searchInput/SearchInput";
import Pagination from "../../../components/shared/pagination/Pagination";
import {useEffect, useState} from "react";
import axiosBooks from "../../../util/axiosBooks";
import MerchList from "../../../components/merchList/MerchList";

export default function MerchSearch(props) {
    const [page, setPage] = useState(1);
    const [filteredMerch, setFilteredMerch] = useState(null);
    const [filter, setFilter] = useState("")
    const [bookstoreList, setBookstoreList] = useState(null);
    const [typeList, setTypeList] = useState(null);
    const [bookstore, setBookstore] = useState(null);
    const [type, setType] = useState(null);

    const filterOptions = [
        {
            text: "Tipo",
            style: "dropdown",
            list: typeList?.map(b => {
                return {...b, name: "type", id: b.id, method: (id) => {setType(id)}}
            }),
            clear: setType,
            clearFilter: null,
            method: () => {
            }
        },
        {
            text: "Livraria",
            style: "dropdown",
            class: "bookstore",
            list: bookstoreList?.map(b => {
                return {...b, name: "bookstore", id: b.id, method: (id) => {setBookstore(id)}}
            }),
            clear: setBookstore,
            clearFilter: null,
            method: () => {
            }
        }
    ];

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
            .then(r => setFilteredMerch(r.data.merch))
            .catch(e => console.log("Error", e))

        axiosBooks.get(`/store/all`)
            .then(r => setBookstoreList(r.data.bookstores))
            .catch(e => console.log("Error", e))

        axiosBooks.get(`/item/itemType/all`)
            .then(r => setTypeList(r.data.types))
            .catch(e => console.log("Error", e))
    }, [page, filter, bookstore, type])

    if (!filteredMerch || !bookstoreList || !typeList) {
        return null
    }

    console.log(filteredMerch)

    function search(input) {
        setFilter(input)
    }

    return <div className={"MerchSearch content"}>

        <div className={"contentDisplay"}>
            <Filter list={filterOptions}/>

            <div className={"search"}>
                <div className={"container"}>

                    <h1>Pesquisa por Merchandising</h1>

                    <SearchInput text={"Merchandising"} func={search}/>

                    <div className={"merchList"}>
                        {filteredMerch.length > 0 ? <MerchList list={filteredMerch}/> : <p className={"noResult"}>Pesquisa sem resultados</p>}
                    </div>

                    <Pagination setPage={setPage} page={page} totalPages={100}/>
                </div>
            </div>
        </div>

    </div>
}