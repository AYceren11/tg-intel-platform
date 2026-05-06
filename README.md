# 🌐 SPAS: Cyber-Psycho Analysis System

![SPAS Banner](https://img.shields.io/badge/Status-Development-orange?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![MSSQL](https://img.shields.io/badge/MSSQL-2022-red?style=for-the-badge&logo=microsoft-sql-server)
![Docker](https://img.shields.io/badge/Docker-Enabled-blue?style=for-the-badge&logo=docker)

**SPAS (Cyber-Psycho Analysis System)** is a comprehensive intelligence and analysis platform designed to process, visualize, and analyze data from various sources (primarily Telegram) to provide deep insights into digital behavioral patterns.

---

## 🚀 Key Features

-   **📊 Real-time Analytics Dashboard:** Interactive charts and metrics using `Recharts`.
-   **🕸️ Network Analysis:** Visualize relationships and data flows with `vis-network`.
-   **🤖 Automated Data Ingestion:** Python-based ingestion engine using `Telethon` for Telegram data.
-   **🗄️ Robust Data Management:** Powered by `Microsoft SQL Server` (MSSQL) and `Prisma ORM`.
-   **🐳 Containerized Environment:** Fully dockerized setup for seamless deployment and scaling.
-   **🛡️ Secure & Scalable:** Built with modern standards using `Next.js 15` and `TypeScript`.

---

## 🖼️ User Interface Showcase

<p align="center">
  <img src="public/screenshots/dashboard.png" alt="SPAS Dashboard" width="100%">
  <br>
  <i>Main Intelligence Dashboard - Real-time Network Insights</i>
</p>

<br>

<p align="center">
  <img src="public/screenshots/analytics.png" alt="In-depth Analytics" width="100%">
  <br>
  <i>Advanced Analytics - Message Volume & Topic Distribution</i>
</p>

<br>

<p align="center">
  <img src="public/screenshots/network.png" alt="Interaction Network" width="100%">
  <br>
  <i>Interaction Network - Community Cluster & Influence Mapping</i>
</p>

<br>

<p align="center">
  <img src="public/screenshots/reports.png" alt="Intelligence Reports" width="100%">
  <br>
  <i>Automated Reporting - PDF Generation & Historical Logs</i>
</p>

<br>

<p align="center">
  <img src="public/screenshots/settings.png" alt="System Settings" width="100%">
  <br>
  <i>System Settings - Multi-language Support & Service Status</i>
</p>

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | Next.js 15 (App Router), React 19, Tailwind CSS |
| **Backend** | Python (Telethon), Next.js API Routes |
| **Database** | MSSQL Server 2022 |
| **ORM** | Prisma |
| **Visuals** | Recharts, Vis-network, Lucide Icons |
| **DevOps** | Docker, Docker Compose |

---

## ⚙️ Installation & Setup

### 1. Prerequisites
-   [Node.js](https://nodejs.org/) (v18+)
-   [Docker & Docker Compose](https://www.docker.com/)
-   [Git](https://git-scm.com/)

### 2. Environment Configuration
Create a `.env` file in the root directory and configure the following variables:
```env
DATABASE_URL="sqlserver://localhost:1433;database=SPAS;user=SA;password=YourPassword123;encrypt=true;trustServerCertificate=true"
TELEGRAM_API_ID="your_api_id"
TELEGRAM_API_HASH="your_api_hash"
```

### 3. Local Development
```bash
# Install dependencies
npm install

# Run database migrations & generate client
npx prisma generate
npx prisma db push

# (Optional) Seed the database with mock data
npx prisma db seed

# Start the development server
npm run dev
```

### 4. Docker Deployment (Recommended)
The project is fully containerized. To spin up the entire stack (MSSQL, Frontend, Ingestion):
```bash
docker-compose up --build
```

---

## 📂 Project Structure

```text
├── python-services/   # Telegram data ingestion & analysis (Python)
├── prisma/            # Database schema & migrations
├── public/            # Static assets & screenshots
├── src/
│   ├── app/           # Next.js App Router (Pages & API)
│   ├── components/    # Reusable UI components
│   └── lib/           # Utility functions & Database client
├── Dockerfile         # Production Docker setup
└── docker-compose.yml # Multi-container orchestration
```

---

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  Built with ❤️ for Intelligence Analysis
</p>
