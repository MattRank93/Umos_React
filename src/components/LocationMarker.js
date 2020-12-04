import React from 'react';
import {Grid, Button, Paper} from "@material-ui/core";

export default function LocationMarker(props) {
    let location = props.location
    let show = props.show

    const markerStyle = {
        border: '1px solid white',
        borderRadius: '50%',
        height: 20,
        width: 20,
        backgroundColor: show ? 'black' : 'green',
        cursor: 'pointer',
        zIndex: 10,
    };



    return(
        <div>
            <div style={markerStyle} />
        </div>
    );

}