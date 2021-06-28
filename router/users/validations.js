const Joi = require("joi")

const { id, name, email, checkString } = require("utils/joi")
const { name: nameUnReq, email: emailUnReq } = require("utils/joi/notRequired")

module.exports = {
  editChildSchema: Joi.object({
    id: id,
    first_name: nameUnReq,
    last_name: nameUnReq,
    email: emailUnReq
  }),
  createChildSchema: Joi.object({
    first_name: name,
    last_name: name,
    email: email,
    password: checkString,
  }),
}