import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import logo from "../../assets/HELPLOGO.png";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    button: {
        textTransform: "none",
        paddingLeft: 30,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 30,
        boxShadow: "0px 0px 20px rgb(0, 0, 0, 0.05)",
        backgroundColor: theme.palette.secondary.main,
    },
}));

const Navigation = (props) => {
    const classes = useStyles();
    // const [auth, setAuth] = React.useState(true);
    const login = props.login;
    const register = props.register;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    // const handleChange = (event) => {
    //     setAuth(event.target.checked);
    // };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={classes.root}>
            {/*<FormGroup>*/}
            {/*    <FormControlLabel*/}
            {/*        control={<Switch checked={auth} onChange={handleChange} aria-label="login switch" />}*/}
            {/*        label={auth ? 'Logout' : 'LoginTCA'}*/}
            {/*    />*/}
            {/*</FormGroup>*/}
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Tow Company Dashboard
                    </Typography>
                    {login && (
                        <div>
                            <Button className={classes.button} href={'/register'}>
                                Register
                            </Button>
                        </div>
                    )}
                    {register && (
                        <div>
                            <Button className={classes.button} href={'/'}>
                                Sign In
                            </Button>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Navigation