const mariadb = require('mariadb');
const config = {
     host: 'localhost', 
     user:'root', 
     password: '',
     database: 'sso_database',
     port: 3307,

};



const pool = new mariadb.createPool(config);


module.exports = {
  pool
}