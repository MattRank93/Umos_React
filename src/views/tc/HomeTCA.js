import {makeStyles} from "@material-ui/core/styles";
import Navigation from "../../components/tc/Navigation";
import React, {useState} from "react";
import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    CircularProgress,
    CssBaseline,
    Divider,
    Paper
} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import clsx from "clsx";
import TableTCA from "./TableTCA";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import RegUserTCA from "./RegUserTCA";
import Dialogs from "./Dialogs";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        padding: theme.spacing(2),
    },
    fixedHeight2: {
        height: 400,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    picture: {
        width: theme.spacing(20),
        height: theme.spacing(20),
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 90,
        backgroundColor: '#303030',
    },
    loadingCircle: {
        width: theme.spacing(20),
        height: theme.spacing(20),
        marginTop: 120,
        marginLeft: 'auto',
        marginRight: 'auto',
    }
}));

const HomeTCA = (props) => {
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem("user"));
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight2);
    const [loading, setLoading] = useState(false)
    const [selection, setSelection] = useState()
    const [selectPicture, setSelectPicture] = useState()
    const [message, setMessage] = useState(null)
    const [dialog, setDialog] = useState(null)
    const [ok, setOk] = useState(false)
    const [yesNo, setYesNo] = useState(false)
    const [openModal, setOpen] = React.useState(false);
    const selectionJSON = selection
    const dispatch = useDispatch();

    const {isLoggedIn} = useSelector(state => state.auth);

    React.useEffect(() => {
        if (!isLoggedIn) {
            return <Redirect to="/tc"/>; //
        }


    }, [isLoggedIn])

    const handleRegisterResponse = () => {
        setYesNo(false);
        setOpen(true);
        setDialog("User has been created.")
        setMessage("  ")
    }

    const deleteUser = () => {
        setYesNo(true);
        setOpen(true);
        setDialog("Are you sure you want to delete this user?")
    }

    const editUser = () => {
        setYesNo(false);
        setOpen(true);
        setDialog('User has been modified.')
    }

    return (
        <React.Fragment>
            <CssBaseline/>
            <Navigation popover user={user}/>
            <Dialogs ok={ok} yesNo={yesNo} setOk={setOk} setYesNo={setYesNo} open={openModal} setOpen={setOpen}
                     message={message} setMessage={setMessage} dialog={dialog} selection={selectionJSON}/>
            <main className={classes.content}>
                <div/>
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        {/* Recent Depos its */}
                        <Grid item xs={12} md={4} lg={3}>

                            <Card className={fixedHeightPaper}>
                                {loading ? <CircularProgress className={classes.loadingCircle}/> :
                                    <CardMedia className={classes.picture}
                                               image={selectPicture}>
                                    </CardMedia>
                                }
                                <CardContent>
                                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                                        {selectionJSON !== undefined ? `Name: ${selectionJSON.firstname} ${selectionJSON.lastname}` : ""}
                                    </Typography>
                                    <Typography className={classes.pos} color="textSecondary">
                                        {selectionJSON !== undefined ? `Email: ${selectionJSON.email}` : ""}
                                    </Typography>
                                    <Typography className={classes.pos} color="textSecondary">
                                        {selectionJSON !== undefined ? `Phone: ${selectionJSON.phone}` : ""}
                                    </Typography>
                                    <Typography className={classes.pos} color="textSecondary">
                                        {selectionJSON !== undefined ? `Role: ${selectionJSON.role}` : ""}
                                    </Typography>
                                </CardContent>
                                <Divider light/>
                                <CardActions>
                                    <Grid container spacing={2} justify="center" alignContent={"center"}>
                                        <Grid item>
                                            <Button size="small" onClick={editUser} disabled={!!!selection}
                                            >Edit User</Button>
                                        </Grid>
                                        <Grid item>
                                            <Button size="small" onClick={deleteUser} disabled={!!!selection}
                                            >Delete User</Button>
                                        </Grid>
                                    </Grid>
                                </CardActions>
                            </Card>

                        </Grid>
                        {/* Chart */}
                        <Grid item xs={12} md={8} lg={9}>
                            <Paper>
                                <TableTCA message={message} setSelection={setSelection}
                                          setSelectPicture={setSelectPicture} setLoading={setLoading}/>
                            </Paper>
                        </Grid>
                        {/* Recent Orders */}
                        <Grid item xs={12} md={6} lg={4}>
                            <Paper className={classes.fixedHeight}>
                                <Typography variant={'h5'} style={{paddingBottom: 15}}>
                                    Create Tow User
                                </Typography>
                                <RegUserTCA setMessage={setMessage} response={handleRegisterResponse}/>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={6} lg={8}>
                            <Paper className={classes.paper}>

                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </React.Fragment>
    );
}

export default HomeTCA;