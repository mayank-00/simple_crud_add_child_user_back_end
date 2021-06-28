const jwt = require('jsonwebtoken');
const { unauthorizedError, invalidRequestError } = require("constants/errorMessages")

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];

        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

        let db = req.app.get('db')

        let user = await db.Users.findByPk(decodedToken.id)

        if (user == null) {
            return res.formatter.unauthorized(unauthorizedError)
        }

        res.locals.user = user.dataValues

        next();
    } catch (err) {
        res.formatter.unauthorized(invalidRequestError)
    }
};