# 🏢 Smart HVAC Energy & Maintenance Ticketing System

> AI-powered HVAC monitoring platform for predictive maintenance and building energy analytics.

---

## 📌 Project Overview

The **Smart HVAC Energy & Maintenance Ticketing System** is an AI-driven platform designed to improve HVAC monitoring by combining **fault detection** and **energy consumption prediction** into a single intelligent dashboard.

The system continuously analyzes HVAC sensor readings, predicts equipment health, estimates building energy consumption, and generates maintenance recommendations through an interactive web dashboard.

This project demonstrates how Artificial Intelligence can be integrated into Building Management Systems (BMS) to enable predictive maintenance and improve operational efficiency.

---

# 🚀 Features

### 🤖 AI Fault Detection

* Detects HVAC faults using Machine Learning
* Binary classification:

  * Healthy
  * Fault Detected
* Confidence score for every prediction

---

### ⚡ Energy Prediction

Predicts building energy consumption using Building Genome data.

Provides:

* Estimated Energy Consumption
* Building Energy Insights

---

### 📡 Live Monitoring Simulation

Simulates a real-time IoT sensor stream using sequential HVAC sensor records.

Updates every few seconds:

* HVAC Status
* Sensor Readings
* AI Prediction
* Confidence Score

---

### 🛠 Predictive Maintenance

Automatically generates maintenance recommendations whenever a fault is detected.

Displays:

* Ticket Status
* Priority
* Recommendation
* Assigned Maintenance Team

---

### 📊 Interactive Dashboard

Modern enterprise dashboard built using Next.js and TailwindCSS.

Includes:

* HVAC Status
* Energy Prediction
* Live Sensor Readings
* AI Confidence
* Maintenance Ticket
* Status Banner

---

# 🏗 System Architecture

```text
                    LBNL RTU Dataset
                           │
                           ▼
                Fault Detection Model
                           │
                           ▼
                 FastAPI Backend API
                           │
                           ▼
                   Next.js Dashboard
                           ▲
                           │
                Building Genome Dataset
                           │
                           ▼
               Energy Prediction Model
```

---

# 🧠 AI Models

## 1. Fault Detection Model

### Dataset

* LBNL RTU Fault Detection Dataset

### Algorithm

* Random Forest Classifier

### Output

* Healthy
* Fault Detected

---

## 2. Energy Prediction Model

### Dataset

* Building Genome Dataset

### Algorithm

* Random Forest Regressor

### Output

* Predicted Building Energy Consumption

---

# 💻 Technology Stack

## Frontend

* Next.js
* React
* TypeScript
* TailwindCSS
* Axios
* Lucide React

---

## Backend

* FastAPI
* Python

---

## Machine Learning

* Scikit-Learn
* Pandas
* NumPy
* Joblib

---

# 📂 Datasets

### Fault Detection

* LBNL RTU Fault Detection Dataset

Contains HVAC sensor readings collected from rooftop units under healthy and faulty operating conditions.

---

### Energy Prediction

* Building Genome Dataset

Contains:

* Building Metadata
* Weather Data
* Electricity Consumption

---

# 📁 Project Structure

```text
Smart_HVAC_Management_System
│
├── backend/
│
├── frontend/
│
├── models/
│
├── datasets/
│   ├── LBNL_RTU/
│   ├── Building_Genome/
│   └── demo/
│
├── src/
│
├── notebooks/
│
├── outputs/
│
├── reports/
│
└── README.md
```

---

# ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/Smart_HVAC_Management_System.git
```

### Move into the project

```bash
cd Smart_HVAC_Management_System
```

### Install backend dependencies

```bash
pip install -r requirements.txt
```

### Install frontend dependencies

```bash
cd frontend
npm install
```

---

# ▶️ Running the Project

## Backend

From the project root:

```bash
uvicorn backend.main:app --reload
```

## Frontend

Open a new terminal:

```bash
cd frontend
npm run dev
```

---

# 🌐 API Endpoints

| Method | Endpoint          | Description        |
| ------ | ----------------- | ------------------ |
| GET    | `/`               | Health Check       |
| POST   | `/predict/fault`  | Fault Detection    |
| POST   | `/predict/energy` | Energy Prediction  |
| GET    | `/simulate/next`  | Demo Sensor Stream |

---

# 📈 Dashboard Features

✔️ Live HVAC Monitoring

✔️ AI Fault Detection

✔️ Building Energy Prediction

✔️ Maintenance Ticket Generation

✔️ AI Confidence Score

✔️ Live Sensor Readings

✔️ Enterprise Dashboard

---

# 🔮 Future Improvements

* IoT Sensor Integration
* MQTT Support
* Real-time Database
* Email Notifications
* Multi-building Monitoring
* Fault Type Classification
* Cloud Deployment

---

# 📜 License

This project is licensed under the **MIT License**.

```text
MIT License

Copyright (c) 2026 YOUR_USERNAME

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

# ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub!
