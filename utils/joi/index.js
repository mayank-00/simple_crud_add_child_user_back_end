const Joi = require('joi')

const { nameRegex } = require("utils/regex")

exports.id = Joi.number().integer().required().min(1)

exports.name = Joi.string().regex(nameRegex).required()
exports.email = Joi.string().email().required()

exports.offset = Joi.number().integer().min(0)
exports.limit = Joi.number().integer().min(1)

exports.checkString = Joi.string().required()