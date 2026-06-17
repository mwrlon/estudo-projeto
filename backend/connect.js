const knex = require('knex')
const db = knex({
  client: 'mysql2',
  connection: {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'weddingpass',
  },
});

module.exports = db