const mongoose = require('mongoose')
const bcrypt = require ('bcrypt')

const userSchema = new mongoose.Schema({
    name : {
        type:String,
        required : true
    },
    email : {
        type :String,
        unique : true,
        required : true
    },
    phone : {
        type :String,
        required : true
    },
    password :{
        type: String,
        required : true
    },
    status:{
        type: String,
        required : true
    },
    token :{
        type :String,
        default :''
    },
      
});

userSchema.pre('save' , async function (next) {
    this.password = await bcrypt.hash(this.password , 10);
    next();
    
})

const userCollection = new mongoose.model('userCollection', userSchema);

module.exports = userCollection;
