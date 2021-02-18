import axios from "axios";

const API_URL = "http://helpapp.ddns.net:3007/api/auth/";

const register = (user) => {
    const pdAdmin = {
        firstname: user.firstName,
        lastname: user.lastName,
        email: user.email,
        password: user.password,
        phone: user.phone
    }

    return axios.post(API_URL + "pdadmin", pdAdmin, {headers: ""})
        .then((response) => {
            return response.data;
        });
};
// PdAdmin
const login = (user) => { //
    const loginRequest = {
        email: user.email,
        password: user.password,
        role: "ROLE_PDADMIN"
    }

    return axios.post(API_URL + "login" , loginRequest, {headers: {}})
        .then((response) => {
            if (response.data.token) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
};

// const PdAdminlogin = (user) => { //
//     const loginRequest = {
//         email: user.email,
//         password: user.password,
//     }
//
//     return axios.post(API_URL + "pdadmin" , loginRequest, {headers: {}})
//         .then((response) => {
//             if (response.data.token) {
//                 localStorage.setItem("user", JSON.stringify(response.data));
//             }
//
//             return response.data;
//         });
// };


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
    // PdAdminlogin,
};