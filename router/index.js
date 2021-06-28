const router = require('express').Router();

const config = require("configuration").getConfig();

router.use('/users', require('./users'));

router.use('/accounts', require('./accounts'))

router.use(config.BASE_PATH, router);

module.exports = router