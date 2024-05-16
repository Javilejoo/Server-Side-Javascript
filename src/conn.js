import mysql from 'mysql2/promise'

const pool = mysql.createPool({
  host: 'sql5.freesqldatabase.com',
  user: 'sql5706790',
  database: 'sql5706790',
  password: '1y6vBZdVHl',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

export default pool;
