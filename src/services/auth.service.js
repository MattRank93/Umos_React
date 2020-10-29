import axios from "axios";

const API_URL = "https://help-spring-api.herokuapp.com/api/users/";

const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

const login = (email, password) => {
  const user = {
    email: email,
    password: password
  }
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

export default {
  register,
  login,
  logout,
};
