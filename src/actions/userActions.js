// Action Creators

import axios from "axios";
import {history} from '../store'

const setUser = (payload) => ({ type: "SET_USER", payload})

export const logUserOut = () => ({type: "LOG_OUT"})

// Methods

export const fetchUser = (userInfo) => dispatch => {
    fetch(`https://help-spring-api.herokuapp.com/api/users/login`, {
        method: "POST",
        headers: userInfo,
        body: ""
    })
        .then(res => res.json())
        .then(data => {
            console.log(JSON.stringify(data))
            // data sent back will in the format of
            // {
            //     user: {},
            //.    token: "aaaaa.bbbbb.bbbbb"
            // }
            //localStorage.setItem("token", data.accessToken)
            //console.log(data.accessToken)
            dispatch(setUser(data))
            history.push("/profile")
        })
}

export const signUserUp = (userInfo) => dispatch => {
    fetch(`http://localhost:4000/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(userInfo)
    })
        .then(res => res.json())
        .then(data => {
            // data sent back will in the format of
            // {
            //     user: {},
            //.    token: "aaaaa.bbbbb.bbbbb"
            // }
            localStorage.setItem("token", data.token)
            dispatch(setUser(data.user))
        })
}

export const autoLogin = () => dispatch => {
    fetch(`http://localhost:4000/auto_login`, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })
        .then(res => res.json())
        .then(data => {
            // data sent back will in the format of
            // {
            //     user: {},
            //.    token: "aaaaa.bbbbb.bbbbb"
            // }
            localStorage.setItem("token", data.token)
            dispatch(setUser(data.user))
        })
}