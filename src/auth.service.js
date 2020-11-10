import axios from "axios";

const API_URL = "https://help-spring-api.herokuapp.com/api/users/";

const register = (user) => {
    const dispatcher = {
        firstname: user.firstName,
        lastname: user.lastName,
        email: user.email,
        password: user.password,
        precinct: user.precinct,
    }
    return axios.post(API_URL + "registerdispatcher", {"body": ""}, {headers: dispatcher})
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("currentUser", JSON.stringify(response.data));
            }

            return response.data;
        });
};

const login = (user) => {
    return axios.post(API_URL + "login", {"body": ""}, {headers: user})
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
