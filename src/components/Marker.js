import React from 'react';
import {Grid} from "@material-ui/core";

const InfoWindow = (props) => {
    const driver  = props.driver;
    const infoWindowStyle = {
        position: 'relative',
        bottom: 100,
        left: '-35px',
        width: 220,
        backgroundColor: 'white',
        boxShadow: '0 2px 7px 1px rgba(0, 0, 0, 0.3)',
        padding: 10,
        fontSize: 14,
        zIndex: 100,
    };

    return (
        <div style={infoWindowStyle}>
            <Grid alignItems={'center'} direction={'column'} container>
                <Grid item>
                    {driver.firstname} {driver.lastname}
                </Grid>
                <Grid item>
                    Lat: {driver.latitude}
                </Grid>
                <Grid item>
                    Long: {driver.longitude}
                </Grid>
            </Grid>


        </div>
    );
};


export default function Marker(props) {
    let driver = props.driver
    let show = props.show

    const markerStyle = {
        border: '1px solid white',
        borderRadius: '50%',
        height: 20,
        width: 20,
        backgroundColor: show ? 'red' : 'blue',
        cursor: 'pointer',
        zIndex: 10,
    };



    return(
        <div>
            <div style={markerStyle} />
            {show && <InfoWindow driver={driver} />}
        </div>
    );

}