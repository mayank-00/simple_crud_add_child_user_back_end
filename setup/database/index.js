const mysql = require('mysql2/promise');

const db = require("./db")

const config = require("configuration").database();

async function main() {

    const connection = await mysql.createConnection({
        host: config.host,
        user: config.user,
        database: config.db,
        password: config.password
    });

    db.mysqlConn = connection

    await db.sequelize.sync();

}

main()

module.exports = db