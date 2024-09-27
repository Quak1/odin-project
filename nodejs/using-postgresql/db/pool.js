const { Pool } = require("pg");

// using default environment variables
// https://node-postgres.com/features/connecting#environment-variables
module.exports = new Pool();
