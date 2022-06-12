const Knex = require('knex');
const knexFile = require('./knexfile');

module.exports = Knex(knexFile.development);