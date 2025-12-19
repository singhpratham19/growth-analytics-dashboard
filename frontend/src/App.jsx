import { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

/* ---------- Shared Styles ---------- */
const cardStyle = {
  background: "#ffffff",
  padding: "1.5rem",
  borderRadius: "12px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
};

const metricStyle = {
  fontSize: "2rem",
  fontWeight: "700",
  marginTop: "0.5rem",
};

/* ---------- App ---------- */
function App() {
  const [kpis, setKpis] = useState(null);
  const [momGrowth, setMomGrowth] = useState([]);
  const [revenueByCountry, setRevenueByCountry] = useState([]);
  const [topCustomers, setTopCustomers] = useState([]);

  useEffect(() => {
    axios.get("/api/kpis").then((res) => setKpis(res.data));

    axios
      .get("/api/mom-growth")
      .then((res) => setMomGrowth(res.data))
      .catch((err) => console.error("MoM error:", err));

    axios
      .get("/api/revenue-by-country")
      .then((res) => setRevenueByCountry(res.data))
      .catch((err) => console.error("Country revenue error:", err));

    axios
      .get("/api/top-customers")
      .then((res) => setTopCustomers(res.data))
      .catch((err) => console.error("Top customers error:", err));
  }, []);

  /* ---------- Chart Configs ---------- */

  const momChartData = {
    labels: momGrowth.map((m) =>
      new Date(m.month).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    ),
    datasets: [
      {
        label: "MoM Growth (%)",
        data: momGrowth.map((m) => Number(m.mom_growth)),
        backgroundColor: momGrowth.map((m) =>
          Number(m.mom_growth) >= 0 ? "#16a34a" : "#dc2626"
        ),
      },
    ],
  };

  const countryChartData = {
    labels: revenueByCountry.map((c) => c.country),
    datasets: [
      {
        label: "Revenue (£)",
        data: revenueByCountry.map((c) => Number(c.revenue)),
        backgroundColor: "#2563eb",
      },
    ],
  };

  const topCustomersChartData = {
    labels: topCustomers.map((c) => `User ${c.user_id}`),
    datasets: [
      {
        label: "Lifetime Value (£)",
        data: topCustomers.map((c) => Number(c.lifetime_value)),
        backgroundColor: "#7c3aed",
      },
    ],
  };

  /* ---------- UI ---------- */

  return (
    <div
      style={{
        padding: "2.5rem",
        fontFamily: "Inter, system-ui, sans-serif",
        background: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ marginBottom: "0.5rem" }}>
        📊 Growth Analytics Dashboard
      </h1>
      <p style={{ color: "#64748b", marginBottom: "2.5rem" }}>
        Real-world insights from UK e-commerce data
      </p>

      {/* KPI Cards */}
      {kpis && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.5rem",
            marginBottom: "3rem",
          }}
        >
          <div style={cardStyle}>
            <h3>Total Users</h3>
            <p style={metricStyle}>{kpis.total_users}</p>
          </div>

          <div style={cardStyle}>
            <h3>Total Orders</h3>
            <p style={metricStyle}>{kpis.total_orders}</p>
          </div>

          <div style={cardStyle}>
            <h3>Total Revenue</h3>
            <p style={metricStyle}>£{kpis.total_revenue}</p>
          </div>
        </div>
      )}

      {/* MoM Growth */}
      <div style={{ ...cardStyle, marginBottom: "3rem" }}>
        <h2>📈 Month-over-Month Growth</h2>
        {momGrowth.length > 0 ? (
          <Bar data={momChartData} />
        ) : (
          <p>Loading growth data…</p>
        )}
      </div>

      {/* Revenue by Country */}
      <div style={{ ...cardStyle, marginBottom: "3rem" }}>
        <h2>🌍 Revenue by Country</h2>
        {revenueByCountry.length > 0 ? (
          <Bar data={countryChartData} />
        ) : (
          <p>Loading country revenue…</p>
        )}
      </div>

      {/* Top Customers */}
      <div style={cardStyle}>
        <h2>🧠 Top Customers (Pareto / 80–20)</h2>
        {topCustomers.length > 0 ? (
          <Bar data={topCustomersChartData} />
        ) : (
          <p>Loading top customers…</p>
        )}
      </div>
    </div>
  );
}

export default App;
