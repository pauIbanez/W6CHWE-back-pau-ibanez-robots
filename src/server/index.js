const chalk = require("chalk");
const express = require("express");
const errorHandler = require("./middlewares/errorHandlers");
const {
  resourceNotFound,
} = require("./middlewares/errorHandlers/errorHandlers");
const debug = require("debug")("app:server");

const app = express();

const startServer = (port) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(chalk.yellowBright(`Server is up at http://localhost:${port}`));
      resolve();
    });

    server.on("error", (err) => {
      const message =
        err.code === "EADDRINUSE"
          ? `Port ${port} is already ocuppied`
          : err.message;

      reject(new Error(message));
    });
  });

app.use(resourceNotFound);
app.use(errorHandler);

module.exports = startServer;
