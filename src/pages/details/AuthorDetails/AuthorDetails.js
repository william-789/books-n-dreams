import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "../../../components/footer/Footer";
import Subtitle from "../../../components/subtitle/subtitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons/faBook";
import axiosBooks, { baseImageLink } from "../../../util/axiosBooks";
import WrapList from "../../../components/bookList/wrapList";

export default function AuthorDetails() {
    const { id } = useParams();
    const [ details, setDetails ] = useState(null);
    const [books, setBooks] = useState(null);
    const [highlight, setHighlight] = useState(null);
    const [loading, setLoading] = useState(true);

    const getData = async() => {
        try {
            let [details, books] = await Promise.all([
                axiosBooks.get(`/author/${id}`).then(r=>r.data.author ),//setDetails(r.data.author)),
                axiosBooks.get('/book/all', {params: {autor: id}}).then(r=>r.data.books )//.then(r=>setBooks(r.data.books))
            ]);

            setBooks(books);
            setDetails(details);

            const idBook = books[0].id;
            // get Book details
            await axiosBooks.get(`/book/${idBook}`).then(r => setHighlight(r.data.book));

            // All requests are completed, setLoading to false
            setLoading(false);
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(()=>{
        getData();
    },[]);

    if(loading) return (
      <div className={"AuthorDetails content"}>
          <div className={"loading"}>
              <FontAwesomeIcon icon={faBook} spin />
          </div>
          <Footer />
      </div>
    )

    return (
      <div className={"AuthorDetails content"}>
          <div className={"container"}>
              <div className={"author"}>
                  <div className={"img"}>
                      <img src={baseImageLink+details.foto} alt={"foto do autor"}/>
                  </div>
                  <div className={"description"}>
                      <span>Autor &gt; </span>
                      <h1>{details.nome}</h1>
                      <Subtitle text={"Biografia"}/>
                      <p>{details.biografia}</p>
                  </div>
              </div>
              <Subtitle text={"O mais vendido"} />
              <div className={"highlight"}>
                  <Link  to={`/book/${highlight.id}`}>
                  <div className={"img"}>
                      <img src={baseImageLink+highlight.foto} alt={"Livro mais vendido"}/>
                  </div>
                  </Link>
                  <div className={"description"}>
                      <p>{highlight.sinopse}</p>
                  </div>
              </div>
              <Subtitle text={`Mais livros de ${details.nome}`} />
              <WrapList list={books} />
          </div>
          <Footer />
      </div>
    )
}
