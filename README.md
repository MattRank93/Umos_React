[comment]: <> (# Highway Emergency Location Platform )
<div align="center" spacing="5">
<a href="https://imgur.com/o56PeaZ"><img src="https://i.imgur.com/o56PeaZ.png" title="source: imgur.com" /></a>
</div>
<div align="center">
Highway Emergency Location Platform

</div>
<div align="center">

<br>

<div align="center">
  <sub>Built with ❤︎ by <a href="https://github.com/kayleqb">Quincy Kayle</a> and <a href="https://github.com/MattRank93">Matthew Rank</a>
</div>

## Getting started


To get the frontend running locally:

- Clone this repo
- `npm install` to install all req'd dependencies
- `npm start` to start the local server (this project uses create-react-app)

Local web server will use port 8080 instead of standard React's port 3000 to prevent conflicts with some backends. You can configure port in scripts section of `package.json`

Alternatively, you can add `.env` file in the root folder of project to set environment variables (use PORT to change webserver's port). This file will be ignored by git, so it is suitable for API keys and other sensitive stuff. Refer to [dotenv](https://github.com/motdotla/dotenv) and [React](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-development-environment-variables-in-env) documentation for more details. Also, please remove setting variable via script section of `package.json` - `dotenv` never override variables if they are already set.

### Making requests to the backend API

You can view the various api requests with examples at the following link

<p align="center">
	<a href="https://documenter.getpostman.com/view/13688383/TVmLCyby#61200d8c-9d42-4cb3-9dc7-b96fa7dca8c2"><strong>Explore the Postman example docs »</strong></a>
	<br />
	<br />
</p>

If you want to change the API URL to a local server, simply edit `.env` 

## Functionality overview

This application holds the registration process and login for both Law enforcement and Tow truck admins. From there these admins can create supbordinate users and
the law enforecment users can then login and use the portal to retrieve a tow truck. The application does all of this while displaying
as little information about the list of tow trucks(and thier drivers) as possible to reduce the implicit bias that may seep through. 

**General functionality:**

- Authenticate users via JWT (login/signup pages + logout button on settings page)
- CRUD users
- GET and display lists of users (supbordinates for admins and tow truck users in proximity for the law enforecment users) !!semifunctioning!!


**The general page breakdown looks like this:**

- Home page (URL: /#/ )
    - Three paths to choose: tow admin, police admin, police user
    - bypasses if already logged in
- Sign in/Sign up pages (URL: /#/tc, /#/pd, /#/pdu)
    - Use JWT (store the token in localStorage)
    - Can start registration from here for each admin, not user. user must be added by an admin on the admin view
- forgot page (URL: /#/tc/forgot )
- Home page to create/edit Users (URL: /#/tc/home, /#/pd/home )
- User home page (URL: /#/pd/userhome )
    - This page is largely under construction
    - Connects to stomp websocket successfully
    - curretnly working on p2p websocket implementation
    - should eventually display a very simple button as per the client. 

<br />
