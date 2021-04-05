import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import axios from "axios";

const useStyles = makeStyles((theme) => ({}));

const Dialogs = (props) => {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const isOpen = props.open;
    const message = props.message;
    const dialog = props.dialog;
    const yesNo = props.yesNo;
    const selection = props.selection;

    const handleCloseModal = () => {
        props.setOpen(false);
    };

    const handleYesDelete = (e) => {
        e.preventDefault();

        const API_URL = "https://help-spring-api.herokuapp.com/api/";
        const token = JSON.parse(localStorage.getItem("user")).token

        axios.delete(API_URL + "users",  {headers: {Authorization: token, email: selection.email}})
            .then((response) => {
                    console.log(response)
                    props.setMessage('User Deleted');
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                    console.log(resMessage)
                    props.setMessage('Error Deleting');
                })
        props.setMessage(" --- ")
        props.setOpen(false);
    };

    return (
        <Dialog
            open={isOpen}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{dialog}</DialogTitle>
            {yesNo ?
                <DialogActions>
                    <Button onClick={handleCloseModal} color="primary">
                        No
                    </Button>
                    <Button onClick={handleYesDelete} color="primary">
                        Yes
                    </Button>
                </DialogActions>
                :
                <DialogActions>
                    <Button onClick={handleCloseModal} color="primary">
                        Ok
                    </Button>
                </DialogActions>}
        </Dialog>
    );
}

export default Dialogs;