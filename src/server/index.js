const chalk = require("chalk");
const express = require("express");
const debug = require("debug")("app:server");
const morgan = require("morgan");
const cors = require("cors");

const errorHandler = require("./middlewares/errorHandlers");
const {
  resourceNotFound,
} = require("./middlewares/errorHandlers/errorHandlers");
const methodChecker = require("./middlewares/methodChecker");
const { getToken } = require("./middlewares/tokens");
const robotsRouter = require("./routers/robotsRouter");

const app = express();

const startServer = (port) => {
  debug(chalk.whiteBright("Starting server..."));

  return new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(chalk.greenBright(`Server is up at http://localhost:${port}`));
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
};
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/token", methodChecker("GET"), getToken);
app.use("/robots", robotsRouter);

app.use(resourceNotFound);
app.use(errorHandler);

module.exports = startServer;
