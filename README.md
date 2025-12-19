📊 Growth Analytics Dashboard

A full-stack analytics platform designed to analyze e-commerce growth metrics and deliver executive-level business insights.

This project simulates how modern analytics teams and management consultants evalua
te growth performance using real transactional data, KPI frameworks, and visual storytelling.

⸻

🔍 Project Overview

The Growth Analytics Dashboard is an end-to-end analytics application that:
	•	Ingests large-scale retail transaction data
	•	Computes key business KPIs used by leadership teams
	•	Visualizes trends, growth drivers, and concentration risks
	•	Enables data-driven decision-making through intuitive dashboards

The project is inspired by real consulting and analytics workflows used at firms like McKinsey, BCG, Bain, and analytics teams in high-growth startups.

⸻

🎯 Key Business Questions Answered
	•	How many active customers does the business have?
	•	What is the total revenue and order volume?
	•	How is revenue growing month-over-month?
	•	Which countries drive the majority of revenue?
	•	Do a small number of customers contribute a disproportionate share of revenue (Pareto / 80-20 rule)?

⸻

📈 Features & Insights

Executive KPIs
	•	Total Users
	•	Total Orders
	•	Total Revenue

Growth Analysis
	•	Month-over-Month (MoM) revenue growth
	•	Identification of growth acceleration and slowdown periods

Geographic Performance
	•	Revenue contribution by country
	•	Clear visibility into market concentration

Customer Value Analysis
	•	Top Customers by Lifetime Value
	•	Demonstrates Pareto distribution in e-commerce revenue

⸻

🧱 Architecture & Tech Stack

Frontend
	•	React (Vite)
	•	Axios for API communication
	•	Chart.js for data visualization
	•	Clean, dashboard-style UI for executive consumption

Backend
	•	Node.js + Express
	•	RESTful API design
	•	SQL-driven analytics endpoints

Database
	•	PostgreSQL
	•	Raw transactional dataset (~500K rows)
	•	Optimized analytical queries (aggregations, window functions)

⸻
📂 Project Structure
growth-analytics-dashboard/
├── backend/
│   ├── index.js
│   ├── db.js
│   └── SQL analytics queries
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   └── charts & services
│   └── vite.config.js
│
└── README.md
How to Run Locally
cd backend
npm install
node index.js
Backend runs on:
http://localhost:5001
📊 Data Source
	•	UK Online Retail Transaction Dataset
	•	~540,000 real e-commerce transaction records
	•	Used extensively in analytics and forecasting case studies

⸻

🧠 Analytical Techniques Used
	•	KPI Frameworks
	•	Aggregations & Group-By Analysis
	•	Window Functions (MoM Growth)
	•	Pareto Analysis (Top Customers)
	•	Time-series trend analysis

⸻

💼 Why This Project Matters

This project demonstrates:
	•	Strong full-stack engineering skills
	•	Practical business analytics thinking
	•	Ability to translate raw data into executive-level insights
	•	Readiness for data analytics, business analytics, and consulting-oriented roles

It closely mirrors real-world projects handled by:
	•	Analytics teams
	•	Strategy consulting firms
	•	Growth & business intelligence roles

⸻

🔮 Future Enhancements
	•	Cohort analysis & retention metrics
	•	Customer segmentation (RFM)
	•	Forecasting using time-series models
	•	Authentication & multi-tenant dashboards
	•	Deployment on cloud (AWS / GCP)

⸻

👤 Author

Pratham Singh
B.Tech Computer Science
Aspiring Business Analyst / Consultant
Interests: Data Analytics, Full-Stack Development, Strategy & Consulting

⸻
