// we will need to tell the CLI how to connect to the database
// by providing db credentials here

require("dotenv").config({ path: __dirname + "/../.env" });

console.log("development config", {
  username: process.env.USERNAME,
  password: null,
  database: process.env.DATABASE,
  host: process.env.HOST,
  dialect: process.env.DIALECT || "postgres",
  logging: false,
});

module.exports = {
  development: {
    username: process.env.USERNAME,
    password: null,
    database: process.env.DATABASE,
    host: process.env.HOST,
    dialect: process.env.DIALECT || "postgres",
    logging: false,
  },
  production: {
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    // database name
    database: process.env.PROD_DB_NAME,
    // database url
    host: process.env.PROD_DB_HOSTNAME,
    dialect: process.env.PROD_DB_DIALECT || "postgres",
    logging: true, // Enable logging
  },
};
