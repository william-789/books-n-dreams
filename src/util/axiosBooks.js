import axios from "axios";

const axiosBooks = axios.create({
    baseURL: "http://localhost:9000",
})

const baseImageLink = "http://localhost:9000/public"

export default axiosBooks;
export {baseImageLink};