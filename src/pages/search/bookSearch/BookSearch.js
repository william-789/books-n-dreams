import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDownWideShort, faChevronDown, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import {useEffect, useState} from "react";
import axiosBooks from "../../../util/axiosBooks";
import WrapList from "../../../components/bookList/wrapList";
import Filter from "../../../components/filter/Filter";

export default function BookSearch(props) {
    const [books, setBooks] = useState(null);

    useEffect(() => {
        axiosBooks.get(`/book/all`)
            .then(r => setBooks(r.data.books))
            .catch(e => console.log("Error", e))
    }, [])

    if(!books) {return null}

    console.log(books)

    return <div className={"BookSearch content"}>

        <div className={"contentDisplay"}>
            <Filter/>

            <div className={"search"}>
                <div className={"container"}>

                    <h1>Pesquisa por Livro</h1>

                    <div className={"input"}>
                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
                        <input/>
                    </div>

                    <p>Livros</p>

                    <div className={"bookList"}>
                        <WrapList list={books}/>
                    </div>
                </div>
            </div>
        </div>
    </div>
}