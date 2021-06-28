const config = require("configuration").database();

const Sequelize = require("sequelize");

const sequelize = new Sequelize(config.db, config.user, config.password, {
    host: config.host,
    dialect: config.dialect,
    pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle
    },
    define: {
        underscored: true
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// initialize models
db.Users = require("models/users")(sequelize, Sequelize)
db.Accounts = require("models/accounts")(sequelize, Sequelize)

// Relations

// creates user_id in accounts
// one to one 
db.users_has_one_account = db.Users.hasOne(db.Accounts, { foreignKey: "user_id" })
db.Account_belongs_to_users = db.Accounts.belongsTo(db.Users, { foreignKey: "user_id" })


module.exports = db