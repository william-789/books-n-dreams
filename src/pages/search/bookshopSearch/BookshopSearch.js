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
    const [finalPage, setFinalPage] = useState(1);

    const filterOptions = [
        {
            text: "Perto de Si",
            style: "checkbox",
            filter: "",
            method: () => {
                setOrder(null)
                getUserDistrict()
                setPage(1)
            }
        },
        {
            text: "Ordem Alfabética",
            style: "checkbox",
            filter: "nome",
            method: (filter) => {
                setOrder(filter)
                setUserDistrict(null)
                setPage(1)
            }
        },
        {
            text: "Adesão Mais Antiga",
            style: "checkbox",
            filter: "data-asc",
            method: (filter) => {
                setOrder(filter)
                setUserDistrict(null)
                setPage(1)
            }
        },
        {
            text: "Adesão Mais Recente",
            style: "checkbox",
            filter: "data-desc",
            method: (filter) => {
                setOrder(filter)
                setUserDistrict(null)
                setPage(1)
            }
        }
    ];

    useEffect(() => {
        axiosBooks.get(`/store/all`, {
            params:
                {
                    per_page: 5,
                    page: page,
                    nome: filter,
                    distrito: userDistrict,
                    ordem: order
                }
        })
            .then(r => {
                setFilteredBookstore(r.data.bookstores)
                setFinalPage(r.data.total_pages)
            })
            .catch(e => console.log("Error", e))
    }, [page, filter, order, userDistrict])

    if (!filteredBookstore) {
        return null
    }

    function search(input) {
        setFilter(input)
    }

    function getUserDistrict() {
        if (isLogged()) {
            axiosBooks.get(`/user/${user.id}`)
                .then(r => setUserDistrict(r.data.user.distrito))
                .catch(e => console.log("Error", e))
        } else {
            openModal()
        }
    }

    return <div className={"BookshopSearch content"}>

        <div className={"contentDisplay"}>
            <Filter list={isLogged() ? filterOptions : filterOptions.slice(1)}/>

            <div className={"search"}>
                <div className={"container"}>

                    <h1>Pesquisa por Livraria</h1>
                    <SearchInput text={"Livrarias"} func={search} page={setPage}/>

                    <div className={"bookshopList"}>
                        {filteredBookstore.length > 0 ?
                            filteredBookstore.map(b => <Bookshop
                                key={b.id}
                                id={b.id}
                                name={b.nome}
                                address={b.morada}
                                postalCode={b.codigo_postal}
                                local={b.localidade}
                                image={baseImageLink + b.capa}/>)
                        : <p className={"noResult"}>Pesquisa sem resultados</p>}
                    </div>

                    {filteredBookstore.length > 0 ? <Pagination setPage={setPage} page={page} totalPages={finalPage}/> : <div/>}
                </div>
            </div>
        </div>
    </div>
}