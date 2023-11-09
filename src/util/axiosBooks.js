import axios from "axios";

const axiosBooks = axios.create({
    baseURL: "http://localhost:9000",
})

export default axiosBooks;