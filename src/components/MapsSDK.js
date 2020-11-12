import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import axios from 'axios'
import Marker from './Marker'
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {logout} from "../actions/auth";

import {useDispatch , connect} from "react-redux";

class GoogleMapSDK extends Component {

    state = {
        markers: [],
        interval: ""
    }

    static defaultProps = {
        center: {
            lat: 42.588081,
            lng: -87.822884
        },
        zoom: 11
    };

    updateMarkers() {
        let call = {
            latitude: 42.64855,
            longitude: -87.822884,
            radius: 30
        }

        //Get markers from API
        axios.get("http://localhost:3007/api/dispatchers/accident", {headers: call})
            .then(res => {
                const markers = res.data
                console.log(markers)
                this.setState({markers})
            })
    }

    componentDidMount() {
        this.intervalId = setInterval(this.updateMarkers.bind(this), 10000)
    }

    render() {
        const Markers = this.state.markers.map((marker, index) => (
            <Marker
                lat={marker.latitude}
                lng={marker.longitude}
                name={marker.firstname}
            />
        ));

        return (
            // Important! Always set the container height explicitly
            <div style={{ height: '90vh', width: '100%' }}>
                <AppBar position="static" >
                    <Toolbar>
                        <Grid
                            justify="space-between" // Add it here :)
                            container
                            spacing={24}
                        >
                            <Button variant="contained" color="secondary">
                                Back
                            </Button>
                            <Typography variant="h6" >HELP Dashboard</Typography>
                        </Grid>
                    </Toolbar>
                </AppBar>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyBKekm05H0Dxmt8ZboPyNgKqZKyYJ3Zfy8"}}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                >
                    {Markers}
                </GoogleMapReact>
            </div>
        );
    }
}

export default GoogleMapSDK;