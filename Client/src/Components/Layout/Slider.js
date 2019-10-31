import React, {Component} from 'react';
import M from 'materialize-css';
import img1 from '../../images/capsules-1.jpg'
import img2 from '../../images/capsules-2.jpg'
import img3 from '../../images/capsules-3.jpg'
import img4 from '../../images/capsules-4.jpg'
class Slider extends Component {
    componentDidMount() {
        let elms = document.querySelector('.slider');
        let instances = M.Slider.init(elms);
    }

    render() {
        return (

            <div className="slider">
                <ul className="slides">
                    <li>
                        <img src={img1}/>
                            <div className="caption center-align">
                                <h3>We help others in need</h3>
                                <h5 className="light grey-text text-lighten-3">Ordering Pharmaceutical items is just a click away!!</h5>
                            </div>
                    </li>
                    <li>
                        <img src={img2}/>
                            <div className="caption left-align">
                                <h3>We help others in need</h3>
                                <h5 className="light grey-text text-lighten-3">Ordering Pharmaceutical items is just a click away!!</h5>
                            </div>
                    </li>
                    <li>
                        <img src={img3}/>
                            <div className="caption right-align">
                                <h3>We help others in need</h3>
                                <h5 className="light grey-text text-lighten-3">Ordering Pharmaceutical items is just a click away!!</h5>
                            </div>
                    </li>
                    <li>
                        <img src={img4}/>
                            <div className="caption center-align">
                                <h3>We help others in need</h3>
                                <h5 className="light grey-text text-lighten-3">Ordering Pharmaceutical items is just a click away!!</h5>
                            </div>
                    </li>
                </ul>
            </div>


    );
    }
}

export default Slider;