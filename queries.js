const Pool = require('pg').Pool;
const dbConfig = require('./dbconfig');

const pool = new Pool(
  dbConfig.pgConfig
);


const getCustomersQuery = `
  SELECT 
    c.first_name || ' ' || c.last_name as full_name,
    a.address,
    ci.city,
    co.country
  FROM 
    customer c
  INNER JOIN 
    address a on c.address_id = a.address_id
  INNER JOIN
    city ci on a.city_id = ci.city_id
  INNER JOIN 
    country co on ci.country_id = co.country_id
  WHERE 
    c.first_name LIKE $1;
`;

const getCustomers = (request, response) => {
    let requestQuery = `%${request.query.firstNameContains}%`;
    
    pool.query(getCustomersQuery, [requestQuery], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

module.exports = {
    getCustomers
}