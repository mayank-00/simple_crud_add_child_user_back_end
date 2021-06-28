const app = require('express')()
const { responseEnhancer } = require('express-response-formatter')
const bodyParser = require('body-parser')

module.exports = function (db) {
    app.use(require('helmet')());
    app.use(require('cors')())

    app.use(bodyParser.urlencoded({ extended: false }))

    // parse application/json
    app.use(bodyParser.json())

    app.set('db', db)

    app.use(responseEnhancer())

    app.use(require("router"))

    return app
}