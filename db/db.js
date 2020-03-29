//connect to postgres
const Pool = require('pg').Pool;

const pool = new Pool({  
        host: 'localhost',  
        user: 'postgres',  
        database: 'postgres',  
        password: 'admin',
        port: 5432,
        ssl: true
    });  

module.exports = pool;
