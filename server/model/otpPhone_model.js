const mongoose = require('mongoose')

const otpSchema = mongoose.Schema( {
    otp : {
        type: String
    },
    createdDate :{
        type: Date
    },
    expireDate : {
        type : Date
    }
})

const otpCollection = new mongoose.model('otpCollection', otpSchema);

module.exports = otpCollection;

