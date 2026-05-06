# TG Intel: Telegram Trend & Network Intelligence Platform

TG Intel is a cutting-edge analytics and intelligence platform designed to monitor, analyze, and visualize trends and interactions within the Telegram network. It combines powerful data ingestion with advanced graph theory and NLP to provide actionable insights for security researchers and data analysts.

---

## 🌟 Visual Showcase

### 📊 Dashboard Overview
Real-time monitoring of network health, message velocity, and trending topics across the ecosystem.
![Dashboard Overview](./public/screenshots/dashboard.png)

### 📈 In-depth Analytics
Advanced time-series analysis and categorical distribution of message topics (phishing, malware, exploits, etc.).
![In-depth Analytics](./public/screenshots/analytics.png)

### 🌐 Interaction Network
Interactive graph visualization revealing influencer nodes, community clusters, and network density.
![Interaction Network](./public/screenshots/network.png)

### 📄 Intelligence Reports
Automated generation of production-ready PDF reports with detailed trend summaries and network metrics.
![Intelligence Reports](./public/screenshots/reports.png)

### ⚙️ System Settings & Status
Localized interface control (English/Turkish) and real-time monitoring of backend ingestion and analysis pipelines.
![Settings](./public/screenshots/settings.png)

---

## 🚀 Key Features

- **Real-time Trend Tracking**: Automated extraction of trending hashtags and keywords using TF-IDF logic.
- **Network Topology**: Interactive visualization of user interactions using `vis-network` to identify key influencers.
- **Sentiment & Topic Analysis**: Categorization of messages into security-relevant topics using specialized NLP engines.
- **Automated Reporting**: One-click PDF generation for "Standard Daily Briefs" and "Network Deep-Dives".
- **Multi-language Support**: Seamless switching between English and Turkish interfaces.
- **System Health Monitoring**: Real-time status tracking for Telethon ingestion and BERT analysis services.

---

## 🛠️ Technology Stack

- **Frontend**: Next.js 15 (App Router), TailwindCSS, Framer Motion.
- **Visualization**: Recharts (Analytics), Vis-network (Graphs).
- **Backend**: Next.js API Routes, Prisma ORM.
- **Database**: Microsoft SQL Server (MSSQL).
- **Core Services**: Python (Telethon for data ingestion, NetworkX for graph analysis, Scikit-learn/Transformers for NLP).

---

## 📥 Getting Started

### 1. Prerequisites
- **Node.js**: 18.x or higher
- **Python**: 3.9.x or higher
- **Database**: MSSQL Server instance

### 2. Environment Configuration
Create a `.env` file in the root directory:

```env
# Next.js & Prisma
DATABASE_URL="sqlserver://localhost:1433;initialCatalog=TGIntel;user=sa;password=YourPassword;encrypt=true;trustServerCertificate=true"

# Python Services
TG_API_ID="your_api_id"
TG_API_HASH="your_api_hash"
DATABASE_URL_PY="Driver={ODBC Driver 17 for SQL Server};Server=localhost;Database=TGIntel;UID=sa;PWD=YourPassword"
```

### 3. Installation
```bash
# Install frontend dependencies
npm install

# Initialize database schema
npx prisma generate
npx prisma db push
```

### 4. Running the Platform
1. **Start Python Services**:
   - In `python-services/ingestion`: `python main.py`
   - In `python-services/analysis`: `python main.py`
2. **Start Dashboard**:
   ```bash
   npm run dev
   ```

---

## 🏗️ Architecture

TG Intel follows a decoupled microservice architecture:
1. **Ingestion Layer**: Python-based Telethon client streaming data into MSSQL.
2. **Analysis Layer**: Specialized services for graph metrics and sentiment classification.
3. **Presentation Layer**: Next.js dashboard providing interactive exploration of analyzed data.

---

© 2024 TG Intel Platform. All rights reserved.
