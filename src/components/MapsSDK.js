import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import axios from 'axios'
import Marker from './Marker'

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
        this.intervalId = setInterval(this.updateMarkers.bind(this), 5000)
    }

    componentWillUnmount() {
        clearInterval(this.intervalId)
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
            <div style={{ height: '93vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key:"AIzaSyBKekm05H0Dxmt8ZboPyNgKqZKyYJ3Zfy8"}}
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