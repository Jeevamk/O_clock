const mongoose = require ("mongoose");

const couponSchema= mongoose.Schema ({
    promoCode : {
        type : String,
        requires :true
    },
    profit : {
        type : Number,
    },
    couponType : {
        type : String,
    },
    startDate : {
        type :Date
    },
    expDate: {
        type : Date
    },
})

const couponCollection = new mongoose.model('couponCollection', couponSchema);

module.exports = couponCollection;