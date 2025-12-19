import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  user: "prathamsingh",
  host: "localhost",
  database: "growth_db",
  port: 5432,
});