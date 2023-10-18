const express = require('express')
const route = express.Router()
const brandCollection= require('../model/brand_model')
const authenticateJWT = require ('../middleware/auth')
const adminCollection = require('../model/admin_model')

route.use(express.json());









module.exports = route