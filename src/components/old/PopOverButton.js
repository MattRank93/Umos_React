import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import {useDispatch} from "react-redux";
import {logout} from "../../actions/auth";
import {Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
    },
    name: {
        padding: theme.spacing(2),
        paddingTop: 2,
        fontSize: 35
    },
    email: {
        padding: theme.spacing(2),
        paddingTop: 0,
        fontSize: 15,
    },
    hr: {
        paddingLeft: 50,
        paddingRight: 50
    },
    buttonRow: {
        width: 200,
        paddingBottom: 5
    },
    button: {
        width: 200,
    }
}));

export default function PopOverButton(props) {
    const dispatch = useDispatch();
    const user = props.user

    const logOut = () => {
        dispatch(logout());
    };

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const [openModal, setOpen] = React.useState(false);

    const handleOpenModel = () => {
        setOpen(true);
    };

    const handleCloseModal = () => {
        setOpen(false);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            <Dialog
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Logout"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to logout?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal} color="primary" autoFocus>
                        No
                    </Button>
                    <Button onClick={logOut} color="primary" >
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>


            <IconButton onClick={handleClick}>
                <AccountCircle />
            </IconButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Grid alignItems={'center'} direction={'column'} container>
                    <Grid item>
                        <Typography className={classes.name}>{user.firstname} {user.lastname}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography className={classes.email}>{user.email}</Typography>
                    </Grid>

                    <hr className={classes.hr}/>

                    <Grid item className={classes.buttonRow}>
                        <Button className={classes.button} variant="contained">Change Email</Button>
                    </Grid>
                    <Grid item className={classes.buttonRow}>
                        <Button className={classes.button} variant="contained">Change Password</Button>
                    </Grid>
                    <Grid item className={classes.buttonRow}>
                        <Button className={classes.button} variant="contained" onClick={handleOpenModel}>Logout</Button>
                    </Grid>


                </Grid>
            </Popover>
        </div>
    );
}
