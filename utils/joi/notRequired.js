const Joi = require('joi')

const { nameRegex } = require("utils/regex")

exports.name = Joi.string().regex(nameRegex)
exports.email = Joi.string().email()
