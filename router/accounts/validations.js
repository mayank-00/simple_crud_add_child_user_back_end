const Joi = require("joi")

const { name, email, checkString } = require("utils/joi")

module.exports = {
  loginSchema: Joi.object({
    email: email,
    password: checkString
  }),
  registerSchema: Joi.object({
    first_name: name,
    last_name: name,
    email: email,
    password: checkString,
  }),
}