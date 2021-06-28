const { internalServerError } = require("constants/errorMessages")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  login: async (req, res) => {

    let db = req.app.get('db')

    let user = {}

    try {
      user = await db.Users.findOne({ where: { email: req.body.email } })
    } catch (error) {
      return res.formatter.serverError(internalServerError)
    }

    if (user == null) {
      return res.formatter.ok(null, { error: "User not found" })
    }

    let account = {}

    try {
      account = await db.Accounts.findByPk(user.id)
    } catch (err) {
      return res.formatter.serverError(internalServerError)
    }

    const match = await bcrypt.compare(req.body.password, account.hashed_password);

    if (!match) {
      return res.formatter.ok(null, { error: "Email or password is incorrect" })
    }

    const jwtData = {
      id: user.id,
    }

    var token = jwt.sign(jwtData, process.env.TOKEN_SECRET, {
      expiresIn: 86400 // expires in 24 hours
    });

    return res.formatter.ok({ token, user })
  },
  register: async (req, res) => {
    let db = req.app.get('db')

    try {
      let user = await db.Users.findOne({
        where: {
          email: req.body.email
        }
      })

      if (user !== null) {
        return res.formatter.ok(null, { error: "Email already exists." })
      }
    } catch (error) {
      return res.formatter.serverError(internalServerError)
    }

    try {

      let body = req.body, data = {
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
      }

      let user = await db.Users.create(data)

      process.nextTick(async () => {

        let hashed_password = await bcrypt.hash(body.password, 10);

        db.Accounts.create({
          user_id: user.id,
          hashed_password
        })
      })

      return res.formatter.ok(null)

    } catch (err) {
      return res.formatter.serverError(internalServerError)
    }
  }
}