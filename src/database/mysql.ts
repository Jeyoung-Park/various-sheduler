const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_DATABASE
});

connection.connect();

connection.query('SELECT * from Users', (error: any, rows: any, fields: any) => {
  if (error) throw error;
  console.log('User info is: ', rows);
});

connection.end();