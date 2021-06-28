const router = require('express').Router();
const validator = require('express-joi-validation').createValidator({})

const controller = require("controllers/users")
const { editChildSchema, createChildSchema } = require("./validations")

const authMiddleware = require("utils/middlewares/auth")
const { isParentAccessingChild } = require("./middlewares")

const Joi = require("joi")
const { id: idJoi } = require("utils/joi")


router.get('/', authMiddleware, controller.getAllUsers)

router.get('/own_data', authMiddleware, controller.getUserByToken)

router.patch('/child', authMiddleware, validator.body(editChildSchema), isParentAccessingChild, controller.editChild)

router.delete('/child/:id', authMiddleware, validator.params(Joi.object({ id: idJoi })), isParentAccessingChild, controller.deleteChild)

router.post('/child', authMiddleware, validator.body(createChildSchema), controller.createChild)

module.exports = router