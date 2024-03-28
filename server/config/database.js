require("dotenv").config({ path: __dirname + "/../.env" });

module.exports = {
  development: {
    username: process.env.USERNAME,
    password: null,
    database: process.env.DATABASE,
    host: process.env.HOST,
    dialect: process.env.DIALECT,
    logging: false,
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
