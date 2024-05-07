import mysql from 'mysql2/promise'

const pool = mysql.createPool({
  host: 'sql5.freesqldatabase.com',
  user: 'sql5704570',
  database: 'sql5704570',
  password: 'VFYH3JThxf',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
