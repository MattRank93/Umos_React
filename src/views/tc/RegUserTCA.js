import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import RegUserFormTCA from "../../components/tc/register/RegUserFormTCA";
import axios from "axios";

const useStyles = makeStyles((theme) => ({}));

const RegUserTCA = (props) => {

    const API_URL = "https://help-spring-api.herokuapp.com/api/";
    const token = JSON.parse(localStorage.getItem("user")).token

    const [submit, setSubmit] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        phone: '',
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setSubmit(user => ({...user, [name]: value}));
    }

    const handleRegister = (e) => {
        e.preventDefault();

        axios.post(API_URL + "tcusers", submit, {headers: {Authorization: token}})
            .then((response) => {
                    console.log(response)
                    props.setMessage('User Registered');
                    props.response()
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                    console.log(resMessage)
                    props.setMessage("Error")
                    props.response()
                })
    };


    return (
        <form onSubmit={handleRegister}>
            <RegUserFormTCA
                firstname={submit.firstname}
                lastname={submit.lastname}
                email={submit.email}
                password={submit.password}
                phone={submit.phone}
                handleChange={handleChange}
            />
        </form>
    )
}

export default RegUserTCA;