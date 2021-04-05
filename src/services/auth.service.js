import axios from "axios";

const API_URL = "http://localhost:3008/api/";

const register = (registerRequest) => {
    return axios.post(API_URL + "tcadmins", registerRequest, {headers: ""})
        .then((response) => {
            return response.status;
        });
};

const login = (loginRequest) => {
    return axios.post(API_URL + "auth/login", loginRequest, {headers: {}})
        .then((response) => {
            if (response.data.token) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem("user");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

export default {
    register,
    login,
    logout,
    getCurrentUser,
};
