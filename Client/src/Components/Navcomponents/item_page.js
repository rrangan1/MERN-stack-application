import React, {Component} from 'react';
import image1 from '../../images/image1.jpg';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
    },
    input: {
      display: 'none',
    },
  }));
  
class item_page extends Component {
    
    render() {
        return (
           
              <div className="container">
                  
               <h1>Item information</h1>
          
                <div className="row">
                <div className="col s4">
                <img src={image1} alt=""/>
                </div>
                
                <div className="col s8">
                <h4 className="text-center">Nature's Bounty Niacin Flush Free 500mg - 50 Capsules</h4>
                <h6 className="text-center">More From: Nature's Bounty</h6>
                <Divider />
                <h4 className="text-center">$9.12   </h4>
                <div className="col s4">
                <h6> Shipping:</h6>
                </div>
                <div className="col s8"><h6>Usually Ships in 1 Business Day</h6>
                </div>
                <div className="col s4">
                <h6> Current Stock:</h6>
                </div>
                <div className="col s8"><h6>3</h6>
                </div>
                <div className="col s4">
                <h6> Quantity:</h6>
                </div>
                <div className="col s2"><form className="container"noValidate autoComplete="off">
                            <TextField
                                id="outlined-number"                           
                                type="number"                                
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                
                                variant="outlined"
                            />
                            </form>
                </div>
                </div>
                
                                   
                                
                                
                            </div>
                            <div className="row">
                            <div  className="col s4">
                                    <a href="#" className="waves-effect waves-light btn-small blue lighten-2 text-center"><i className="material-icons right">shopping</i>Buy Now</a>
                                </div>
                                <div  className="col s4">
                                <a href="#" className="waves-effect waves-light btn-small blue lighten-2 text-center"><i class="material-icons right">
add_shopping_cart</i>Add to Cart</a>
                                </div></div>
                </div>
              
                  
        );
    }
}

export default item_page ;