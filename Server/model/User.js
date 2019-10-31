const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creating user schema
const userSchema = new Schema ({
    user_id:{type: String,required:true},
    firstName:{type:String,required: true},
    lastName:{type:String,required: true},
    email_address:{type:String,required: true},
    address_1:{type:String,required: true},
    address_2:{type:String,required: true},
    city:{type:String,required: true},
    state:{type:String,required: true},
    zipCode:{type:String,required: true},
    county:{type:String,required: true},
    password:{type:String,required: true},
    usertype:{type:String,required:true},
    avatar:{type:String},
    Date:{type:Date,default:Date.now},
    salt:{type:String,required:true}
});

const userModel= mongoose.model('users',userSchema,'user');

module.exports = userModel;