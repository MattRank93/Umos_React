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
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        width: 200
    },
    title3: {
        flexGrow: 1,
        width: 150,
        paddingTop: 5
    },
    button: {
        textTransform: "none",
        paddingLeft: 30,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 30,
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
                <Toolbar style={{backgroundColor: "#1c1c1c"}}>
                    <Container className={classes.title} maxWidth={"xl"}>
                        <img src={logo} alt="Logo" className={classes.title3}/>
                    </Container>
                    {login && (
                        <div>
                            <Button className={classes.button} href={'/tc/register'}>
                                Register
                            </Button>
                        </div>
                    )}
                    {register && (
                        <div>
                            <Button className={classes.button} href={'/tc'}>
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