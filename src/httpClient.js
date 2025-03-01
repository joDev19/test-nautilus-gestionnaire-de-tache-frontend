import axios from "axios"
import router from "./router";
// console.log(import.meta.env.BASE_URL)
const httpClient = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        'Accept': 'application/json',
        // 'Referer': 'http://localhost:5173',
        // 'Origin': "http://localhost:5173",
    },
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
})
httpClient.defaults.withCredentials = true;
httpClient.defaults.withXSRFToken = true;
httpClient.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    // alert(error.status)
    if (error.status == 401) {

        router.push({ name: 'login' })
    }
    return Promise.reject(error);
});

export default httpClient