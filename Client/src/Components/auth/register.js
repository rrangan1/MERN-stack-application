import React, {Component} from 'react';
import {connect} from "react-redux";
import {registeruser} from '../../actions/authActions';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import TextFieldInputGroup from '../common/TextFieldInputGroup';

class Register extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            firstName: '',
            lastName: '',
            address_1:'',
            address_2:'',
            city:'',
            state:'',
            zipCode:'',
            county:'',
            usertype:'',
            password:'',
            password2:'',
            error : {}
        };
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.error){
            this.setState({
                error:nextProps.error
            })
        }
    };

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }


    onChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    };
    onSubmit = (e) => {
        e.preventDefault();
        const newUser ={
            email:this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address_1:this.state.address_1,
            address_2:this.state.address_2,
            city:this.state.city,
            state:this.state.state,
            zipCode:this.state.zipCode,
            county:this.state.county,
            usertype:this.state.usertype,
            password:this.state.password,
            password2:this.state.password2

        };


        this.props.registeruser(newUser,this.props.history);
    };
    render() {
        const {error} = this.state ;

        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">
                                Create your Account
                            </p>
                            <form noValidate onSubmit={this.onSubmit}>

                                <TextFieldInputGroup onChange={this.onChange} type="email" id="email" placeholder="email" error={error.email} info="This site uses Gravatar so if you want a profile image, use a Gravatar email"/>
                                <TextFieldInputGroup onChange={this.onChange} type="text" id="firstName" placeholder="FirstName" error={error.firstName}/>
                                <TextFieldInputGroup onChange={this.onChange} type="text" id="lastName" placeholder="LastName" error={error.lastName}/>
                                <TextFieldInputGroup onChange={this.onChange} type="text" id="address_1" placeholder="Address" error={error.address_1}/>
                                <TextFieldInputGroup onChange={this.onChange} type="text" id="address_2" placeholder="Address" error={error.address_2}/>
                                <TextFieldInputGroup onChange={this.onChange} type="text" id="city" placeholder="City" error={error.city}/>
                                <TextFieldInputGroup onChange={this.onChange} type="text" id="state" placeholder="State" error={error.state}/>
                                <TextFieldInputGroup onChange={this.onChange} type="text" id="zipCode" placeholder="ZipCode" error={error.zipCode}/>
                                <TextFieldInputGroup onChange={this.onChange} type="text" id="county" placeholder="County" error={error.county}/>
                                <div className="form-group">
                                    <select

                                        className={classnames('form-control form-control-lg browser-default', {
                                            'is-invalid': error.usertype
                                        })}
                                        placeholder="UserType"
                                        id="usertype"
                                        value={this.state.usertype}
                                        onChange={this.onChange}>
                                        <option value="choose your option">Choose your option</option>
                                        <option value="customer">Customer</option>
                                        <option value="manager">Manager</option>
                                    </select>

                                    {error.usertype && (
                                        <div className="invalid-feedback">{error.usertype}</div>
                                    )}
                                </div>
                                <TextFieldInputGroup onChange={this.onChange} type="password" id="password" placeholder="Password" error={error.password}/>
                                <TextFieldInputGroup onChange={this.onChange} type="password" id="password2" placeholder="Confirm Password" error={error.password2}/>



                                <input type="submit" value="Register"  className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        error:state.error
    }};
Register.propTypes = {
    registeruser:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
    error:PropTypes.object.isRequired
};
export default connect(mapStateToProps,{registeruser})(withRouter(Register));

