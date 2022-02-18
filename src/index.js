require("dotenv").config();
const debug = require("debug")("app:server");
const chalk = require("chalk");

const connectToDB = require("./database");
const startServer = require("./server");

const port = process.env.PORT || 8080;
const connectionString = process.env.CONN_STRING || "";

(async () => {
  try {
    await startServer(port);
    await connectToDB(connectionString);
  } catch (error) {
    debug(chalk.redBright(`Error while setting up server: ${error.message}`));
  }
})();
