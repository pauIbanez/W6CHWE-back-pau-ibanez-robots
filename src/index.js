require("dotenv").config();
const debug = require("debug")("app:server");

const chalk = require("chalk");
const startServer = require("./server");

const port = process.env.PORT || 8080;

(async () => {
  try {
    await startServer(port);
  } catch (error) {
    debug(chalk.redBright(`Error while setting up server: ${error.message}`));
  }
})();
