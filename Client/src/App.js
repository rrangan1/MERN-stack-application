import React,{Component} from 'react';
import './App.css';
import 'materialize-css/dist/css/materialize.min.css';
import Navbar from './Components/Layout/Navbar';
import Slider from './Components/Layout/Slider';
import CardComponent from './Components/Layout/Card';
import Footer from './Components/Layout/Footer';
import {BrowserRouter as Router,Route} from "react-router-dom";
import Register from "./Components/auth/register";
import Login from "./Components/auth/Login";
import About from "./Components/Navcomponents/About";
import Contact from "./Components/Navcomponents/contact";
import {Provider} from 'react-redux';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

import store from './CreateStore';
// Check for token
if (localStorage.jwtToken) {
    // Set auth token header auth
    setAuthToken(localStorage.jwtToken);
    // Decode token and get user info and exp
    const decoded = jwt_decode(localStorage.jwtToken);
    // Set user and isAuthenticated in REDUX store
    store.dispatch(setCurrentUser(decoded));
    // Check for expired token
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        // Logout user
        store.dispatch(logoutUser());
        // TODO: Clear current Profile

        // Redirect to login
        window.location.href = '/login';
    }
}





    class App extends Component {

  componentDidMount()
  {

  };

  render() {
    return (
<Provider store={store}>
        <Router>
        <div className="App">
        <Navbar/>
            <Route exact path="/" component={Slider}/>
            <div className="container">
                <Route exact path="/register" component={Register}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/about" component={About}/>
                <Route exact path="/contact" component={Contact}/>
            </div>
            <Route exact path="/" component={CardComponent}/>
            <Footer/>
        </div>
        </Router>
</Provider>
    );
  }
}
export default App;
