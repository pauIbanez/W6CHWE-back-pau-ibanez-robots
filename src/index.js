require("dotenv").config();
const debug = require("debug")("app:server");

const chalk = require("chalk");
const startServer = require("./server");

(async () => {
  try {
    await startServer(3000);
  } catch (error) {
    debug(chalk.redBright(`Error while setting up server: ${error.message}`));
  }
})();
