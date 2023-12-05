const mongoose = require('mongoose')

const orderSchema = mongoose.Schema ({
    userId : {
        type :mongoose.Schema.Types.ObjectId,
        ref :'userCollection',
       
    },
    addressId: {
        type :mongoose.Schema.Types.ObjectId,
        ref :'checkoutCollection',
       
    },
    orderDate : {
        type : Date,
        default:Date.now,
    },
    expireDate : {
        type : Date,
        default: function () {
            const DateExpire = new Date(this.orderDate);
            DateExpire.setDate(DateExpire.getDate() + 4);
            return DateExpire;
          },
    },
    paymentMethod : {
        type : String,
        required : true,
    },
    orderStatus : {
        type : String,
        required : true
    },
})

const orderCollection = new mongoose.model( 'orderCollection', orderSchema )

module.exports = orderCollection ;