import { URL_BACKEND } from "./environments";
import axios from "axios"
export const postLogin = async (login) => {
    const rpta = await axios.post(`${URL_BACKEND}/login`, JSON.stringify(login),{
        headers:{"Content-type" : "application/json"}
    });
    return rpta
}