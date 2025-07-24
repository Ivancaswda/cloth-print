import axios from "axios";

export const axiosClient = axios.create({
    baseURL: 'https://tasteful-car-ac493b6d8a.strapiapp.com/api',
    headers: {
        Authorization: 'Bearer ' + process.env.STRAPI_API_TOKEN
    }
})