import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../actions/auth";
import {Button, Card, TextField} from "@material-ui/core";
import {Redirect} from "react-router-dom";
import Container from "@material-ui/core/Container";
import axios from "axios";
import sockJs from "sockjs-client";
import Stomp from 'stompjs';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
    infoBoxSm: {
        borderRadius: 15,
        maxWidth: 600,
        padding: 25,
        boxShadow: "0px 0px 20px rgb(0, 0, 0, 0.2)",
    },
    div: {
        flexGrow: 1,
        position: 'absolute',
        left: '50%',
        width: 500,
        top: '50%',
        transform: 'translate(-50%, -50%)'
    },
}));

const HomeTCA = (props) => {
    const classes = useStyles();
    const link = "http://localhost:3007/api"

    const [selectedFiles, setSelectedFiles] = useState(undefined);
    const [currentFile, setCurrentFile] = useState(undefined);
    const [imageMessage, setImageMessage] = useState(null);
    const [image, setImage] = useState("");
    const [message, setMessage] = useState("");
    const [fileInfos, setFileInfos] = useState([]);
    const {isLoggedIn} = useSelector(state => state.auth);

    const dispatch = useDispatch();

    React.useEffect(() => {
        if (!isLoggedIn) {
            return <Redirect to="/tc"/>; //
        }
    }, [isLoggedIn])

    const logOut = () => {
        dispatch(logout());
    };

    const handleImage = (event) => {
        setSelectedFiles(event.target.files[0]);
    }

    const handleClick = async () => {
        uploadImage(selectedFiles)
    }

    const handleClick2 = async () => {

        let token = JSON.parse(localStorage.getItem("user")).token

        axios.get('http://localhost:3007/api/images', {
            headers: {
                'Authorization': token
            }
        })
            .then((response) => {
                setImage("data:" + response.data.type + ";base64, " + response.data.data);
            })
            .catch((err) => {
                return new Error(err.message);
            })
    }

    const uploadImage = (image) => {
        const formData = new FormData();
        formData.append('file', image)

        let token = JSON.parse(localStorage.getItem("user")).token

        axios.post('http://localhost:3007/api/images', {formData}, {
            headers: {
                'Authorization': "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI4YWRhOGFmMC02YjQ3LTQ4YWEtOGM3Ny02Nzk2YmRiMGE1YWMiLCJpYXQiOjE2MTQ5MDYxNzIsImV4cCI6MTYxNTUxMDk3Mn0.CiWIGORFIfuDm-i0543JEQFjnFuZWTnddSaWGN6hsPg",
            }
        })
            .then((response) => {
                setImageMessage("Photo Uploaded")
            })
            .catch((err) => {
                setImageMessage("Image Failed")
            })
    }

    //token:"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2ODAxMDIyYy0zMDU2LTRhYWMtOTI5MC01ODM4YzRkZjFmNWQiLCJpYXQiOjE2MTQ5MDM4OTQsImV4cCI6MTYxNTUwODY5NH0.WmSaBF0eubzsXPlR-Z0Mpjhbj4AVsBjOpl2Kqt37oGM"

    const [connectRes, setConnectRes] = useState(null)
    const [updateRes, setUpdateRes] = useState(null)
    const [joinRes, setJoinRes] = useState(null)
    const [errorRes, setErrorRes] = useState(null)

    const socket = sockJs('http://localhost:3007/api/help/')
    const client = Stomp.over(socket)
    const token = JSON.parse(localStorage.getItem("user")).token

    const stompConnect = async () => {
        const socket = sockJs('http://localhost:3007/api/help/')
        const client = Stomp.over(socket)

        client.connect({"Authorization": token}, function (frame) {
            console.log(frame + "")
            client.subscribe(
                "/topic/guestnames",
                function (frame2) {
                    setConnectRes(frame)
                    console.log(frame2 + "")
                },
                {"Authorization": token})
        }, (err) => {
            console.log(err)
        })
    }

    const sender = async () => {
        client.send(
            "/app/guestjoin",
            {},
            {message: 'hello'},
        )
    };

    const update = async () => {
        client.connect({"Authorization": token}, function (frame) {
            console.log("Connected: " + frame.body);
        }, (err) => {
            console.log(err)
        })
    }

    const join = async () => {
        client.connect({"Authorization": token}, function (frame) {
            console.log("Connected: " + frame.body);
            client.subscribe("/queue", function (body) {
                console.log(body.body)
            })
        }, (err) => {
            console.log(err)
        })
    }

    const error = async () => {
        client.connect({"Authorization": token}, function (frame) {
            console.log("Connected: " + frame.body);
            client.subscribe("/queue", function (body) {
                console.log(body.body)
            })
        }, (err) => {
            console.log(err)
        })
    }

    const [send, setSend] = useState({
        connect: '',
        update: '',
        join: '',
        error: ''
    });

    function handleChange(e) {
        const {name, value} = e.target;
        setSend(user => ({...user, [name]: value}));
    }

    return (
        <div>
            <div style={{marginTop: 30, marginBottom: 30}}>
                <div>
                    <Container>
                        <Card className={classes.infoBoxSm}>
                            <Typography variant={'h5'} style={{paddingBottom: 15}}>
                                STOMP Tester
                            </Typography>
                            <Grid container spacing={3} direction={'column'}>
                                <Grid item>
                                    <Button variant="contained" color="primary" component="span" onClick={stompConnect}>
                                        STOMP
                                    </Button>
                                    <TextField variant="filled" style={{flex: 1, paddingLeft: 10, paddingRight: 10}}>
                                    </TextField>
                                </Grid>
                                <Grid item>
                                    <Typography variant={'h5'}>
                                        Connect
                                    </Typography>
                                </Grid>
                                <Grid item align="center">
                                    <TextField
                                        fullWidth
                                        id="connect"
                                        name="connect"
                                        type="text"
                                        label="Connect"
                                        variant="outlined"
                                        value={send.connect}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" color="primary" component="span">
                                        CONNECT
                                    </Button>
                                    <Typography>
                                        {connectRes ? connectRes : ''}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant={'h5'}>
                                        Update
                                    </Typography>
                                </Grid>
                                <Grid item align="center">
                                    <TextField
                                        fullWidth
                                        id="update"
                                        name="update"
                                        type="text"
                                        label="Update"
                                        variant="outlined"
                                        value={send.update}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" color="primary" component="span" onClick={sender}>
                                        sender
                                    </Button>
                                    <TextField variant="filled" style={{flex: 1, paddingLeft: 10, paddingRight: 10}}>
                                    </TextField>
                                </Grid>
                                <Grid item>
                                    <Typography variant={'h5'}>
                                        Join
                                    </Typography>
                                </Grid>
                                <Grid item align="center">
                                    <TextField
                                        fullWidth
                                        id="join"
                                        name="join"
                                        type="text"
                                        label="Join"
                                        variant="outlined"
                                        value={send.join}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" color="primary" component="span" onClick={join}>
                                        JOIN
                                    </Button>
                                    <TextField variant="filled" style={{flex: 1, paddingLeft: 10, paddingRight: 10}}>
                                    </TextField>
                                </Grid>
                                <Grid item>
                                    <Typography variant={'h5'}>
                                        Error
                                    </Typography>
                                </Grid>
                                <Grid item align="center">
                                    <TextField
                                        fullWidth
                                        id="error"
                                        name="error"
                                        type="text"
                                        label="Error"
                                        variant="outlined"
                                        value={send.error}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" color="primary" component="span" onClick={error}>
                                        ERROR
                                    </Button>
                                    <TextField variant="filled" style={{flex: 1, paddingLeft: 10, paddingRight: 10}}>
                                    </TextField>
                                </Grid>
                            </Grid>
                        </Card>
                    </Container>
                </div>
            </div>
            <Button variant="contained" color="primary" onClick={logOut}>
                Logout
            </Button>
            <Container maxWidth="lg" style={{marginBottom: 30, marginTop: 30}}>
                <input
                    style={{display: "none"}}
                    id="contained-button-file"
                    type="file"
                    onChange={handleImage}
                />
                <label htmlFor="contained-button-file">
                    <Button variant="contained" color="primary" component="span">
                        Upload
                    </Button>
                </label>
                <Button variant="contained" color="primary" component="span" onClick={handleClick}
                        style={{padding: 10}}>
                    send
                </Button>
                <Button variant="contained" color="primary" component="span" onClick={handleClick2}
                        style={{padding: 10}}>
                    get
                </Button>
                <embed src={image} width="200px" height="200px"/>
            </Container>
        </div>
    )
}

export default HomeTCA;

