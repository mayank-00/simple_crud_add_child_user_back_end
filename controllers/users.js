const bcrypt = require('bcrypt');

const { internalServerError } = require("constants/errorMessages")

module.exports = {
  getAllUsers: async (req, res) => {
    let db = req.app.get('db')

    try {

      let users = await db.Users.findAll({
        attributes: ["id", "first_name", "last_name", "email", "parent_id"]
      })

      return res.formatter.ok({ users })

    } catch (error) {
      return res.formatter.serverError(internalServerError)
    }

  },
  editChild: async (req, res) => {
    let db = req.app.get('db')

    try {

      let body = req.body, updatingData = {}

      if (typeof body.first_name === "string" && body.first_name != "") {
        updatingData.first_name = body.first_name
      }

      if (typeof body.last_name === "string" && body.last_name != "") {
        updatingData.last_name = body.last_name
      }

      if (typeof body.email === "string" && body.email != "") {
        updatingData.email = body.email
      }

      await db.Users.update(
        updatingData,
        {
          where: {
            id: body.id
          }
        }
      )

      return res.formatter.ok(null)

    } catch (error) {
      return res.formatter.serverError(internalServerError)
    }
  },
  deleteChild: async (req, res) => {
    let db = req.app.get('db')

    try {

      await db.Users.destroy({
        where: {
          id: req.params.id
        }
      })

      process.nextTick(() => {
        db.Accounts.destroy({
          where: {
            id: req.params.id
          }
        })
      })

      return res.formatter.ok(null)

    } catch (error) {
      return res.formatter.serverError(internalServerError)

    }
  },
  createChild: async (req, res) => {

    let db = req.app.get('db')

    try {

      let body = req.body, data = {
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        parent_id: res.locals.user.id
      }

      let user = await db.Users.create(data)

      process.nextTick(async () => {

        let hashed_password = await bcrypt.hash(body.password, 10);

        db.Accounts.create({
          user_id: user.id,
          hashed_password
        })
      })

      return res.formatter.ok({ user })

    } catch (error) {

      return res.formatter.serverError(internalServerError)
    }
  },
  getUserByToken: async (req, res) => {
    let db = req.app.get('db')

    try {

      let user = await db.Users.findByPk(res.locals.user.id)

      return res.formatter.ok({ user: user.dataValues })

    } catch (error) {
      return res.formatter.serverError(internalServerError)
    }
  }
}