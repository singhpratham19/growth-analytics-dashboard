import express from "express";
import pkg from "pg";
import cors from "cors";

const { Pool } = pkg;

// 1️⃣ Initialize app FIRST
const app = express();
app.use(cors());
app.use(express.json());

// 2️⃣ Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgresql://localhost/growth_db",
});

// 3️⃣ Test route
app.get("/", (req, res) => {
  res.send("API running");
});

// 4️⃣ KPI route
app.get("/api/kpis", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        COUNT(DISTINCT user_id) AS total_users,
        COUNT(*) AS total_orders,
        ROUND(SUM(amount), 2) AS total_revenue
      FROM orders;
    `);

    res.json(result.rows[0]);
  } catch (err) {
    console.error("KPI error:", err);
    res.status(500).json({ error: "Failed to fetch KPIs" });
  }
});

// 5️⃣ Monthly revenue route (THIS WAS FAILING BEFORE)
app.get("/api/monthly-revenue", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        DATE_TRUNC('month', order_date) AS month,
        ROUND(SUM(amount), 2) AS revenue
      FROM orders
      GROUP BY month
      ORDER BY month;
    `);

    res.json(result.rows);
  } catch (err) {
    console.error("Monthly revenue error:", err);
    res.status(500).json({ error: "Failed to fetch monthly revenue" });
  }
});

// 6️⃣ Month-over-Month (MoM) growth route
app.get("/api/mom-growth", async (req, res) => {
  try {
    const result = await pool.query(`
      WITH monthly_revenue AS (
        SELECT
          DATE_TRUNC('month', order_date) AS month,
          SUM(amount) AS revenue
        FROM orders
        GROUP BY month
      )
      SELECT
        month,
        ROUND(
          100 * (revenue - LAG(revenue) OVER (ORDER BY month))
          / LAG(revenue) OVER (ORDER BY month),
          2
        ) AS mom_growth
      FROM monthly_revenue
      ORDER BY month;
    `);

    res.json(result.rows);
  } catch (err) {
    console.error("MoM growth error:", err);
    res.status(500).json({ error: "Failed to fetch MoM growth" });
  }
});
// 🌍 Revenue by Country

app.get("/api/revenue-by-country", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        u.country,
        ROUND(SUM(o.amount), 2) AS revenue
      FROM orders o
      JOIN users u ON o.user_id = u.id
      GROUP BY u.country
      ORDER BY revenue DESC
      LIMIT 10;
    `);

    res.json(result.rows);
  } catch (err) {
    console.error("Revenue by country error:", err);
    res.status(500).json({ error: err.message });
  }
});
// 🧠 Top Customers (Pareto Analysis)
app.get("/api/top-customers", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        o.user_id,
        ROUND(SUM(o.amount), 2) AS lifetime_value
      FROM orders o
      GROUP BY o.user_id
      ORDER BY lifetime_value DESC
      LIMIT 10;
    `);

    res.json(result.rows);
  } catch (err) {
    console.error("Top customers error:", err);
    res.status(500).json({ error: "Failed to fetch top customers" });
  }
});
// 6️⃣ Start server LAST
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});