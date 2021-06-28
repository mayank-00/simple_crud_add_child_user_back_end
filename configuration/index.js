const path = require("path");
require("dotenv").config();

module.exports = {
    getConfig: () => {
        return require(path.resolve(`./configuration/config.${process.env.NODE_ENV}.json`));
    },
    database: () => ({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        db: process.env.DATABASE_DB,
        dialect: process.env.DATABASE_DIALECT,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    })
}