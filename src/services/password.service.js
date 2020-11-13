import axios from "axios";

const API_URL = "https://help-spring-api.herokuapp.com/api/password/";

const forgot = (email) => {
    return axios.post(
        API_URL + "forgot",
        {"body": ""},
        {headers: email}
    )
        .then((response) => {
            return response.data;
        });
};

const verify = (email, token) => {
    return axios.post(
        API_URL + "verify",
        {"body": ""},
        {headers: email, token}
    )
        .then((response) => {
            return response.data;
        });
};

const reset = (email, token, password) => {
    return axios.post(
        API_URL + "reset",
        {"body": ""},
        {headers: email, token, password}
    )
        .then((response) => {
            return response.data;
        });
};

export default {
    forgot,
    verify,
    reset
};