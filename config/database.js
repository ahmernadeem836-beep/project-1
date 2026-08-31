const sql = require("mssql/msnodesqlv8");

const databaseConfig = {
  server: "localhost",
  database: "todo_db",
  driver: "ODBC Driver 18 for SQL Server",
  options: {
    instanceName: "SQLEXPRESS",
    trustedConnection: true,
    trustServerCertificate: true
  }
};

async function connectToDatabase() {
  await sql.connect(databaseConfig);
  console.log("SQL Server connected successfully");
}

module.exports = { sql, connectToDatabase };