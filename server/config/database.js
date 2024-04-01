// we will need to tell the CLI how to connect to the database
// by providing db credentials here

module.exports = {
  development: {
    username: process.env.USERNAME,
    password: null,
    database: process.env.DATABASE,
    host: process.env.HOST,
    dialect: process.env.DIALECT,
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

console.log("production config lol", {
  username: process.env.PROD_DB_USERNAME,
  password: process.env.PROD_DB_PASSWORD,
  // database name
  database: process.env.PROD_DB_NAME,
  // database url
  host: process.env.PROD_DB_HOSTNAME,
  dialect: process.env.PROD_DB_DIALECT || "postgres",
  logging: true, // Enable logging
});
