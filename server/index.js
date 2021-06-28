const http = require("http");
require('module-alias/register')

// const config = require("configuration").getConfig()

const db = require("../setup/database")
const app = require("../setup/expressApp")(db)

const server = http.createServer(app);
server.listen(process.env.PORT || 4004, () => {
  console.log("Server running on " + process.env.PORT);
});
