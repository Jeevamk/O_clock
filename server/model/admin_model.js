const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const adminSchema = new mongoose.Schema({
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
        type :Number,
        required : true
    },
    password :{
        type: String,
        required : true
    }
    
});

adminSchema.pre('save' , async function (next) {
    this.password = await bcrypt.hash(this.password , 10);
    next();
})

const adminCollection = new mongoose.model('adminCollection', adminSchema);

module.exports = adminCollection;
