import { URL_BACKEND } from "./environments";
import axios from "axios"
export const postLogin = async (login) => {
    const rpta = await axios.post(`${URL_BACKEND}/login`, JSON.stringify(login), {
        headers: { "Content-type": "application/json" }
    });
    return rpta
}

// Estos son servicios externos

export const guardarJobs = async (jobs) => {
    const rpta = await axios.post(`https://reqres.in/api/register`, JSON.stringify(jobs), {
        headers: { "Content-type": "application/json" }
    })
    return rpta
}


export const postCreateData = async (data) => {
    const rpta = await axios.post(`${URL_BACKEND}/troubleshooting/create`,
        JSON.stringify(data),
        { headers: { 'Content-Type': 'application/json' } })
    return rpta
}

export const postCrearImagen = async (data) => {
    const rpta = await axios.post(`${URL_BACKEND}/attachment/create`,
        `{
            "attachments": [
                ${JSON.stringify(data)}
            ]
        }`,
        { headers: { 'Content-Type': 'application/json' } })
    return rpta
}