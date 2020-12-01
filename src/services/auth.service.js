import axios from "axios";

const API_URL = "https://help-spring-api.herokuapp.com/api/auth/";

const register = (user) => {
    const dispatcher = {
        firstname: user.firstName,
        lastname: user.lastName,
        email: user.email,
        password: user.password,
        phone: user.phone
    }

    return axios.post(API_URL + "dispatcher", {"body": dispatcher}, {headers: ""})
        .then((response) => {
            return response.data;
        });
};

const login = (user) => {
    const loginRequest = {
        email: user.email,
        password: user.password,
    }

    return axios.post(API_URL + "login", {"body": loginRequest}, {headers: {}})
        .then((response) => {
            if (response.data.accessToken) {
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