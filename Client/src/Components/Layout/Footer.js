import React from 'react';

const Footer = () => {
    const style_ul ={
        display: 'inline',
        verticalAlign:'top',
        height:'100'
};
    return (

            <footer className="page-footer teal darken-4">
                <div className="container">
                    <div className="row">
                        <div className="col l6 s12">
                            <h5 className="white-text">About</h5>
                            <p className="grey-text text-lighten-4">The PlasmaCorp provides all kind of pharmaceutical items and products at your finger tips
                            .Just login or register to find out.</p>
                        </div>
                        <div className="col l4 offset-l2 s12">
                            <h5 className="white-text">Quick links</h5>
                            <ul>
                                <li><a className="grey-text text-lighten-3" href="#!">Home</a></li>
                                <li><a className="grey-text text-lighten-3" href="#!">About Us</a></li>
                                <li><a className="grey-text text-lighten-3" href="#!">Contact Us</a></li>
                                <li><a className="grey-text text-lighten-3" href="#!">Privacy policy</a></li>
                            </ul>
                        </div>
                        <div className="col l4  s12">
                            <h5 className="white-text">Follow Us On</h5>
                            <ul className="social icons">
                                <li><a href="" className="social-icon"> <i className="fa fa-facebook"></i></a></li>
                                <li><a href="" className="social-icon"> <i className="fa fa-twitter"></i></a></li>
                                <li><a href="" className="social-icon"> <i className="fa fa-rss"></i></a></li>
                                <li><a href="" className="social-icon"> <i className="fa fa-youtube"></i></a></li>
                                <li><a href="" className="social-icon"> <i className="fa fa-linkedin"></i></a></li>
                                <li><a href="" className="social-icon"> <i className="fa fa-google-plus"></i></a></li>
                            </ul>
                    </div>
                </div>
                <div className="footer-copyright">
                    <div className="container">
                        &copy; {(new Date().getFullYear())} Copyright All rights reserved by PlasmaCorp
                    </div>
                        </div>

                </div>
            </footer>


    );
};
 export default Footer

