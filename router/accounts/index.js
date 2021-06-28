const router = require('express').Router();
const validator = require('express-joi-validation').createValidator({})

const controller = require("controllers/accounts")
const { loginSchema, registerSchema } = require("./validations")

router.post('/login', validator.body(loginSchema), controller.login)

router.post('/register', validator.body(registerSchema), controller.register)

module.exports = router