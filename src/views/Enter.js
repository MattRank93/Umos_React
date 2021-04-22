import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Card, CssBaseline, Grid} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Navigation from "../components/tc/Navigation";
import Container from "@material-ui/core/Container";
import logo from "../assets/HELPLOGO.png";

const useStyles = makeStyles((theme) => ({
    media: {
        objectFit: "cover",
        textAlign: "center",
        width: "100%",
        display: "block",
        padding: 0,
    },
    infoBoxSm: {
        borderRadius: 15,
        padding: 25,
        boxShadow: "0px 0px 20px rgb(0, 0, 0, 0.2)",
    },
    div: {
        flexGrow: 1,
        position: 'absolute',
        left: '50%',
        width: 400,
        top: '50%',
        transform: 'translate(-50%, -50%)'
    }
}));

const Enter = (props) => {
    const classes = useStyles();


    return (
        <React.Fragment>
            <CssBaseline/>
            <main>
                <div className={classes.div}>
                    <Container>
                        <Card className={classes.infoBoxSm}>
                            <Grid container justify={'center'} direction={'column'}
                                  spacing={2}>
                                <Grid item align="center">
                                    <img src={logo} alt="Logo" height={40}/>
                                </Grid>
                                <Grid item align="center">
                                    <Button href={'/tc'}>
                                        Tow Company Admin
                                    </Button>
                                </Grid>
                                <Grid item align="center">
                                    <Button href={'/pd'}>
                                        Police Department Admin
                                    </Button>
                                </Grid>
                                <Grid item align="center">
                                    <Button href={'/pdu'}>
                                        Police Department User
                                    </Button>
                                </Grid>
                            </Grid>
                        </Card>
                    </Container>
                </div>
            </main>
        </React.Fragment>
    )
}

export default Enter;

