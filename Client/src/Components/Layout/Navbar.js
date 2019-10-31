import React, {Component} from 'react';
import M from "materialize-css";
import logo from "../../images/Logo.png";
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';


class Navbar extends Component {
    onLogoutClick(e) {
        e.preventDefault();
        this.props.logoutUser();

    }

    componentDidMount() {
        let elems = document.querySelectorAll('.sidenav');
        let instances = M.Sidenav.init(elems);
    }

    render() {
        const { isAuthenticated, user } = this.props.auth;
        const authMlinks = (
            <ul className="sidenav" id="mobile-links">
                <li><Link className="black-text" to="/">Home</Link></li>
                <li><Link className="black-text" to="/about">About</Link></li>
                <li><Link className="black-text" to="/contact"> Contact</Link></li>
                <li><a href="" onClick={this.onLogoutClick.bind(this)} className="black-text">Logout</a></li>
            </ul>
        );
        const authLinks = (
            <ul className="right hide-on-med-and-down">
                <li>
                    <a
                        href=""
                        onClick={this.onLogoutClick.bind(this)}
                        className="black-text"
                    >
                        <img
                            className="rounded-circle"
                            src={user.avatar}
                            alt={user.name}
                            style={{ width: '25px', marginRight: '5px' }}
                            title="You must have a Gravatar connected to your email to display an image"
                        />{' '}
                        Logout
                    </a>
                </li>
                <li>
                    <form>
                        <div className="input-field">
                            <input id="search" type="search" required/>
                            <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                            <i className="material-icons">close</i>
                        </div>
                        
                    </form>
                </li>

            </ul>
        );
        const guestMlinks = (
            <ul className="sidenav" id="mobile-links">
                <li><Link className="black-text" to="/">Home</Link></li>
                <li><Link className="black-text" to="/about">About</Link></li>
                <li><Link className="black-text" to="/contact"> Contact</Link></li>
                <li><Link className="black-text" to="/login">Login </Link></li>
            </ul>

        );
    const guestLinks = (
        <ul className="right hide-on-med-and-down">
            <li><Link className="black-text" to="/">Home</Link></li>
            <li><Link className="black-text" to="/about">About</Link></li>
            <li><Link className="black-text" to="/contact"> Contact</Link></li>
            <li><Link className="black-text" to="/login">Login </Link></li>
            <li>
                <form>
                    <div className="input-field">
                        <input id="search" type="search" required/>
                        <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                        <i className="material-icons">close</i>
                    </div>
                </form>
               
            </li>
        </ul>
            );
        return (
            <div>

            <nav className="nav-wrapper teal lighten-2 z-depth-1">
              <div className="container">
                  <img src={logo} alt="Logo" className="hide-on-med-and-down brand-logo left" style={{height:64}}/>

                  <a href="#" className="sidenav-trigger" data-target="mobile-links">
                      <i className="material-icons">menu</i>
                  </a>

                  <ul className="left hide-on-large-only">
                      <li>
                          <form>
                              <div className="input-field">
                                  <input id="search" type="search" required/>
                                  <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                                  <i className="material-icons">close</i>
                              </div>
                             
                          </form>
                      </li>
                  </ul>
                  {isAuthenticated ? authLinks:guestLinks}
              </div>
              </nav>
                {isAuthenticated ? authMlinks:guestMlinks}
            </div>
        );
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
