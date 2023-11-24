import {useEffect, useState} from "react";
import axiosBooks, {baseImageLink} from "../../../util/axiosBooks";
import Filter from "../../../components/filter/Filter";
import SearchInput from "../../../components/searchInput/SearchInput";
import Pagination from "../../../components/shared/pagination/Pagination";
import Bookshop from "../../../components/bookshop/Bookshop";
import {useUser} from "../../../context/userContext";

export default function BookshopSearch() {
    const [page, setPage] = useState(1);
    const [filteredBookstore, setFilteredBookstore] = useState(null);
    const [filter, setFilter] = useState("");
    const [order, setOrder] = useState(null);
    const [userDistrict, setUserDistrict] = useState(null);
    const {user, isLogged, openModal} = useUser();

    const filterOptions = [
        {
            text: "Perto de Si",
            style: "checkbox",
            filter: "",
            method: setOrder
        },
        {
            text: "Ordem Alfabética",
            style: "checkbox",
            filter: "nome",
            method: setOrder
        },
        {
            text: "Adesão Mais Antiga",
            style: "checkbox",
            filter: "data-asc",
            method: setOrder
        },
        {
            text: "Adesão Mais Recente",
            style: "checkbox",
            filter: "data-desc",
            method: setOrder
        },
        {
            text: "Limpar",
            style: "checkbox",
            filter: "",
            method: setOrder
        }
    ];

    console.log("ordem", order);

    useEffect(() => {
        axiosBooks.get(`/store/all`, {
            params:
                {
                    per_page: 5, page: page,
                    nome: filter,
                    ordem: order
                }
        })
            .then(r => setFilteredBookstore(r.data.bookstores))
            .catch(e => console.log("Error", e))
    }, [page, filter, order])

    if (!filteredBookstore) {
        return null
    }

    console.log(filteredBookstore);

    function search(input) {
        setFilter(input)
    }

    return <div className={"BookSearch content"}>

        <div className={"contentDisplay"}>
            <Filter list={filterOptions}/>

            <div className={"search"}>
                <div className={"container"}>

                    <h1>Pesquisa por Livraria</h1>
                    <SearchInput text={"Livrarias"} func={search}/>

                    <div className={"bookshopList"}>
                        {filteredBookstore.map(b => <Bookshop key={b.id} id={b.id} name={b.nome} image={baseImageLink + b.capa}/>)}
                    </div>

                    <Pagination setPage={setPage} page={page} totalPages={100}/>
                </div>
            </div>
        </div>
    </div>
}