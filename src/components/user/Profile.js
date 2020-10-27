import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import auth from '../auth/auth-helper';
import { findUserProfile } from '../../utils/api-user.js';
import { Redirect, Link } from 'react-router-dom';

import DeleteUser from './DeleteUser';
import List from "@material-ui/core/List";

class Profile extends Component {
    constructor({ match }) {
        super();
        this.state = {
            user: '',
            redirectToSignin: false
        };
        this.match = match;
    }
    init = userId => {
        const jwt = auth.isAuthenticated();
        findUserProfile(
            {
                userId: userId
            },
            { t: jwt.token }
        ).then(data => {
            if (data.error) {
                this.setState({ redirectToSignin: true });
            } else {
                this.setState({ user: data });
            }
        });
    };
    componentWillReceiveProps = props => {
        this.init(props.match.params.userId);
    };
    componentDidMount = () => {
        this.init(this.match.params.userId);
    };
    render() {
        const redirectToSignin = this.state.redirectToSignin;
        if (redirectToSignin) {
            return <Redirect to="/signin" />;
        }
        return (
            <Paper elevation={4}>
                <Typography type="title" className="shit">
                    Profile
                </Typography>
                <List>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={this.state.user.name}
                            secondary={this.state.user.email}
                        /> {auth.isAuthenticated().user &&
                    auth.isAuthenticated().user._id === this.state.user._id && (
                        <ListItemSecondaryAction>
                            <DeleteUser userId={this.state.user._id} />
                        </ListItemSecondaryAction>
                    )}
                    </ListItem>
                    <Divider />
                </List>
            </Paper>
        );
    }
}

export default Profile;