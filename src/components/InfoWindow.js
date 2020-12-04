import React from 'react';
import {Grid, Button, Paper} from "@material-ui/core";
import Slider from "@material-ui/core/Slider";

export default function InfoWindow(props) {
    const loc  = props.location;

    const infoWindowStyle = {
        position: 'static',
        bottom: 100,
        left: '-35px',
        backgroundColor: 'white',
        boxShadow: '0 2px 7px 1px rgba(0, 0, 0, 0.3)',
        padding: 10,
        fontSize: 14,
        zIndex: 9999,
        cursor: 'pointer',
    };

    function valuetext(value) {
        console.log(value)
        return `${value}`;
    }

    return (
        <div style={infoWindowStyle}>
            <Grid alignItems={'center'} direction={'row'} container>
                <Grid item style={{paddingRight: 20}}>
                    <strong>Selected Location</strong>
                </Grid>
                <Grid item style={{paddingRight: 20}}>
                    Lat: {loc.latitude}
                </Grid>
                <Grid item style={{paddingRight: 20}}>
                    Long: {loc.longitude}
                </Grid>
                <Grid item style={{paddingRight: 20, width: 100}}>
                    Radius:
                    <Slider
                        defaultValue={0}
                        getAriaValueText={valuetext}
                        aria-labelledby="discrete-slider-small-steps"
                        step={10}
                        marks
                        min={0}
                        max={40}
                        valueLabelDisplay="auto"
                    />
                </Grid>
                <Grid item style={{paddingRight: 20}}>
                    <Button variant="contained">
                        Find Drivers
                    </Button>
                </Grid>
            </Grid>




        </div>
    );
};

