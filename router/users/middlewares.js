const { internalServerError } = require("constants/errorMessages")

module.exports = {
  isParentAccessingChild: async (req, res, next) => {

    let db = req.app.get('db')

    try {

      let resp = await db.Users.findOne({
        where: {
          parent_id: res.locals.user.id,
          id: req.body.id || req.params.id
        }
      })

      if (resp === null) {
        return res.formatter.unauthorizedError("Unauthorized, child doesn't belong to parent")
      }

      next()
    } catch (err) {
      res.formatter.serverError(internalServerError)
    }

  }
}