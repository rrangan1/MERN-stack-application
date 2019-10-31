import React, {Component} from 'react';
import img1 from '../../images/pills-1.jpg';
import img2 from '../../images/pills-2.jpg';
import img3 from '../../images/pills-3.jpg';

class Card extends Component {
    componentDidMount() {

    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col s12">
                        <h2 className="text-center">Our Top picks</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, amet consequatur dolor, dolore ex in incidunt itaque libero maiores minima molestiae mollitia neque nihil nobis, quas quibusdam sint voluptate voluptatibus!</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col m4 l4 s12 cards-container">
                        <div className="card sticky-action">
                            <div className="card-image">
                                <img src={img1} alt=""/>
                                <a className="btn red btn-floating halfway-fab pulse activator">+</a>
                            </div>
                            <div className="card-content">
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis deleniti ducimus excepturi maxime nesciun</p>
                            </div>
                            <div className="card-reveal">
                                <span className="card-title">Medicine<i className="right">x</i></span>
                            </div>
                            <div className="card-action center-align">
                                <div>
                                <a href="#" className="waves-effect waves-light btn-small green lighten-2 text-center"><i className="material-icons right">shopping</i>Buy Now</a>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="col m4 l4 s12 cards-container">
                        <div className="card sticky-action">
                            <div className="card-image">
                                <img src={img2} alt=""/>
                                <a className="btn red btn-floating halfway-fab pulse activator">+</a>
                            </div>
                            <div className="card-content">
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis deleniti ducimus excepturi maxime nesciun</p>
                            </div>
                            <div className="card-reveal">
                                <span className="card-title">Medicine<i className="right">x</i></span>
                            </div>
                            <div className="card-action center-align">
                                <div>
                                    <a href="#" className="waves-effect waves-light btn-small green lighten-2 text-center"><i className="material-icons right">shopping</i>Buy Now</a>
                                </div>
                            </div>
                        </div>
                    </div>
                        <div className="col m4 l4 s12 cards-container">
                            <div className="card sticky-action">
                                <div className="card-image">
                                    <img src={img3} alt=""/>
                                    <a className="btn red btn-floating halfway-fab pulse activator">+</a>
                                </div>
                                <div className="card-content">
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis deleniti ducimus excepturi maxime nesciun</p>
                                </div>
                                <div className="card-reveal">
                                    <span className="card-title">Medicine<i className="right">x</i></span>
                                </div>
                                <div className="card-action center-align">
                                    <div>
                                        <a href="#" className="waves-effect waves-light btn-small green lighten-2 text-center"><i className="material-icons right">shopping</i>Buy Now</a>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>




        );
    }
}

export default Card;