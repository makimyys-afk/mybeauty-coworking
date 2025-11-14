import mysql from 'mysql2/promise';

const connection = await mysql.createConnection(process.env.DATABASE_URL);

try {
  const [rows] = await connection.execute('SELECT id, name, type FROM workspaces ORDER BY id');
  console.log('Workspaces in database:');
  console.table(rows);
} finally {
  await connection.end();
}
