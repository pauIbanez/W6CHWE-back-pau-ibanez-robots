const { program } = require("commander");

program.option("-d, --dev-database");

program.parse();

module.exports = program.opts();
