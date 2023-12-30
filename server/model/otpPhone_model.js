const mongoose = require('mongoose')

const otpSchema = mongoose.Schema( {
    name: {
        type: String,
      },
      email: {
        type: String,
        unique: true,
        required: true,
      },
      phone: {
        type: String,
      },
      password: {
        type: String,
      },
      status: {
        type: String,
        required: true,
      },
      otp: {
        type: Number,
      },
})

const otpCollection = new mongoose.model('otpCollection', otpSchema);

module.exports = otpCollection;

