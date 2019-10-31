const Pool = require('pg').Pool;
const dbConfig = require('./dbconfig');

const pool = new Pool(
  dbConfig.pgConfig
);

const getCustomers = (request, response) => {
    let query = request.query.firstNameContains;
    console.log(query);
    pool.query(`SELECT first_name || ' ' || last_name as full_name FROM customer WHERE first_name LIKE '%${query}%' ORDER BY last_name`, (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

module.exports = {
    getCustomers
}