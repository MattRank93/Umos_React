import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import axios from 'axios'
import Marker from './Marker'



class GoogleMapSDK extends Component {
    state = {
        drivers: [],
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

        console.log(this.props.token)

        //Get markers from API
        axios.patch("https://help-spring-api.herokuapp.com/api/locations/driver-locations", call , { headers: {
                "Authorization": this.props.token
            }})
            .then(res => {
                const drivers = res.data
                drivers.forEach((driver) => {
                    driver.show = false;
                })
                console.log(drivers)
                this.setState({drivers: drivers})
            })
    }

    onChildClickCallback = (key, driver) => {
        this.setState((state) => {
            const index = state.drivers.findIndex((e) => e.id === driver.driver.id);
            state.drivers[index].show = !state.drivers[index].show; // eslint-disable-line no-param-reassign
            return { drivers: state.drivers };
        });
    };

    componentDidMount() {
        this.intervalId = setInterval(this.updateMarkers.bind(this), 5000)
    }

    componentWillUnmount() {
        clearInterval(this.intervalId)
    }


    render() {
        const Markers = this.state.drivers.map((driver, index) => (
            <Marker
                lat={driver.latitude}
                lng={driver.longitude}
                driver={driver}
                show={driver.show}
            />
        ));



        return (
            // Important! Always set the container height explicitly
            <div style={{ height: '93vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key:"AIzaSyBKekm05H0Dxmt8ZboPyNgKqZKyYJ3Zfy8"}}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                    onChildClick={this.onChildClickCallback}
                    options={{
                        styles: [
                            { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
                            { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
                            { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
                            {
                                featureType: "administrative.locality",
                                elementType: "labels.text.fill",
                                stylers: [{ color: "#d59563" }]
                            },
                            {
                                featureType: "poi",
                                elementType: "labels.text.fill",
                                stylers: [{ color: "#d59563" }]
                            },
                            {
                                featureType: "poi.park",
                                elementType: "geometry",
                                stylers: [{ color: "#263c3f" }]
                            },
                            {
                                featureType: "poi.park",
                                elementType: "labels.text.fill",
                                stylers: [{ color: "#6b9a76" }]
                            },
                            {
                                featureType: "road",
                                elementType: "geometry",
                                stylers: [{ color: "#38414e" }]
                            },
                            {
                                featureType: "road",
                                elementType: "geometry.stroke",
                                stylers: [{ color: "#212a37" }]
                            },
                            {
                                featureType: "road",
                                elementType: "labels.text.fill",
                                stylers: [{ color: "#9ca5b3" }]
                            },
                            {
                                featureType: "road.highway",
                                elementType: "geometry",
                                stylers: [{ color: "#746855" }]
                            },
                            {
                                featureType: "road.highway",
                                elementType: "geometry.stroke",
                                stylers: [{ color: "#1f2835" }]
                            },
                            {
                                featureType: "road.highway",
                                elementType: "labels.text.fill",
                                stylers: [{ color: "#f3d19c" }]
                            },
                            {
                                featureType: "transit",
                                elementType: "geometry",
                                stylers: [{ color: "#2f3948" }]
                            },
                            {
                                featureType: "transit.station",
                                elementType: "labels.text.fill",
                                stylers: [{ color: "#d59563" }]
                            },
                            {
                                featureType: "water",
                                elementType: "geometry",
                                stylers: [{ color: "#17263c" }]
                            },
                            {
                                featureType: "water",
                                elementType: "labels.text.fill",
                                stylers: [{ color: "#515c6d" }]
                            },
                            {
                                featureType: "water",
                                elementType: "labels.text.stroke",
                                stylers: [{ color: "#17263c" }]
                            }
                        ]
                    }}
                >
                    {Markers}
                </GoogleMapReact>
            </div>
        );
    }
}

export default GoogleMapSDK;