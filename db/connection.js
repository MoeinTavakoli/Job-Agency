const { Client } = require('pg');

const dbConfig = require("../config").databse

const client = new Client(dbConfig);

client.connect()

module.exports = client