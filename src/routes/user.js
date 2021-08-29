const express = require('express')
const userController = require('../controllers/user')

const userRouter = express.Router()

userRouter.route('/registrar').post(userController.registrar)

userRouter.route('/login').post(userController.login)

module.exports = userRouter