const mongoose = require('mongoose')

const bannerSchema = mongoose.Schema( {
    name : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    bannerImg:{
        type : String,
    },
    status : {
        type : String
    },
    createdDate : {
        type  : Date,
        default:Date.now
    },
    expireDate : {
        type : Date,
        default: function () {
            const DateExpire = new Date(this.createdDate);
            DateExpire.setDate(DateExpire.getDate() + 4);
            return DateExpire;
          },
    }
})

const bannerCollection = new mongoose.model('bannerCollection',bannerSchema);

module.exports = bannerCollection;
