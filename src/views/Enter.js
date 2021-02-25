import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Grid} from "@material-ui/core";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({}));

const Enter = (props) => {
    const classes = useStyles();


    return (
        <div style={{backgroundColor: 'black'}}>
            <Grid container>
                <Grid item>
                    <Button href={'/tc'}>
                        Tow Company
                    </Button>
                </Grid>
                <Grid item>
                    <Button href={'/pd'}>
                        Police Department
                    </Button>
                </Grid>
            </Grid>

        </div>
    )
}

export default Enter;

