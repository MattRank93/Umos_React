import React, {useEffect} from 'react'
import './App.css';
import {useSelector, useDispatch} from 'react-redux'
import LoginComponent from './components/LoginComponent'
import SignUpComponent from './components/SignUpComponent'
import {autoLogin} from './actions/userActions'

const App = () => {
    const userReducer = useSelector(state => state.userReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(autoLogin())
    }, [dispatch])

    return (
        <div className="App">
            {
                !userReducer.loggedIn ? <h1>Sign Up or Login!</h1> : <h1>Welcome, {userReducer.user.username}</h1>
            }
            <SignUpComponent/>
            <LoginComponent/>

        </div>
    )
}

export default App