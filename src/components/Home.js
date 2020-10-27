import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import logo from '../logo.svg';

class Home extends Component {
    render() {

        return (
            <div>
                <Card className="shit">
                    <Typography type="headline" component="h2" className="shit">
                        Welcome to the MERN APP
                    </Typography>
                    <CardMedia
                        className="shit"
                        image={logo}
                        title="Auth with MERN"
                    />
                    <CardContent>
                        <Typography type="body1" component="p">
                            This is a demo application that uses a Node + MongoDB API for user
                            authentication. Built With React + Material UI.
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        );
    }
}

export default Home;