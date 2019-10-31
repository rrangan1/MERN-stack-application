import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextFieldInputGroup from '../common/TextFieldInputGroup';
import { loginUser } from '../../actions/authActions';
import {Link} from "react-router-dom";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      error:{}
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/');
    }

    if (nextProps.error) {
      this.setState({ error: nextProps.error });
    }
  }


  onChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  };
  onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email:this.state.email,
      password:this.state.password
    };
    this.props.loginUser(userData);
  };
  render() {
    const {error} = this.state ;
    return (
        <div className="login">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Log In</h1>
                <p className="lead text-center">
                  Sign in to your  account
                </p>
                <form onSubmit={this.onSubmit}>
                  <TextFieldInputGroup type="text" placeholder="email" id="email" onChange={this.onChange} error={error.email}/>
                  <TextFieldInputGroup type="password" placeholder="password" id="password" onChange={this.onChange} error={error.password}/>
                  <div className="input-field">
                    <button className="btn btn-link">Sign In</button>
                  </div>
                  <div>
                    <Link className="btn btn-link" to="/register">Register</Link>
                  </div>
                </form>

              </div>
            </div>
          </div>
        </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error
});

export default connect(mapStateToProps, { loginUser })(Login);








