const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
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
  token: {
    type: String,
    default: "",
  },
  googleId: {
    type: String,
  },
  displayName: {
    type: String,
  },
});

userSchema.pre("save", async function (next) {
    console.log("grfe",this.googleId);
  if (this.googleId) {
    next();
  } else {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  }
});


const userCollection = new mongoose.model("userCollection", userSchema);

module.exports = userCollection;
