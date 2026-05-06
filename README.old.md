# IoT Simulation and Monitoring System 🛠️📡  

Welcome to the **IoT Simulation and Monitoring System** repository! This project provides a modular and scalable platform to simulate, manage, and monitor IoT ecosystems. It integrates cutting-edge technologies to handle real-time data streaming, lifecycle management for devices, and seamless integrations with IoT protocols and enterprise APIs.

---

## 🌟 Key Features  

- **Real-Time Data Simulation & Streaming**: Simulates high-throughput device data streams with **Redis Pub/Sub** and WebSockets.  
- **Customizable Data Patterns & Failures**: Includes failure modeling and data pattern generation for realistic testing.  
- **Device Lifecycle Management**: Manage and monitor devices through an intuitive UI built with **React.js**.  
- **Persistent Data Storage**: Stores metadata and historical data in **MongoDB** with options for export in CSV/JSON formats.  
- **Scalable Backend**: Node.js simulation engine with modular REST APIs and WebSocket support.  
- **Monitoring & Metrics**: Integrated with **Prometheus** and **Grafana** for system health and performance monitoring.  
- **Protocol Translation**: Communicates seamlessly with IoT protocols like MQTT and external enterprise APIs.  

---

## 🖼️ System Architecture  

The system consists of the following interconnected components:

### 1. **Frontend**  
- **Real-Time Dashboard**: Displays IoT data in dynamic charts and graphs.  
- **Device Manager**: Add, configure, and manage IoT devices.  
- Communication via REST API and WebSocket for live updates.

### 2. **Backend**  
- **Node.js Simulation Engine**:  
  - Streams real-time data using WebSockets.  
  - Supports dynamic data pattern generation and failure modeling.  
- **REST API**: Manages device metadata and configurations.  

### 3. **Data Layer**  
- **Redis Cache**: Powers low-latency real-time streaming (**10k+ messages per second**).  
- **MongoDB**: Stores device metadata and historical logs.  
- **CSV/JSON Exporter**: Enables data export for offline analysis.  

### 4. **External Systems**  
- **MQTT Broker**: Publishes IoT data for MQTT subscribers.  
- **Enterprise APIs**: Supports integration with third-party services.  

### 5. **DevOps**  
- **Dockerized Deployment**: All components are containerized for seamless setup.  
- **Prometheus & Grafana**: Real-time system monitoring and visualization.

---

## 🚀 Getting Started  

### Prerequisites  

Make sure you have the following installed:  
- **Node.js** (v16+)  
- **Docker** (for Redis and MongoDB)  
- **Prometheus** and **Grafana** (optional for monitoring)  

### Installation  

1. **Clone the Repository**  
   ```bash  
   git clone https://github.com/your-repo/IoT-Simulation-System.git  
   cd IoT-Simulation-System  
   ```  

2. **Install Dependencies**  
   ```bash  
   npm install  
   cd frontend  
   npm install  
   ```  

3. **Set Up Environment Variables**  
   Create a `.env` file in the root directory to configure Redis, MongoDB, and WebSocket ports.  

4. **Run the Backend**  
   ```bash  
   npm run start  
   ```  

5. **Run the Frontend**  
   ```bash  
   cd frontend  
   npm start  
   ```  

6. **Access the Dashboard**  
   Navigate to `http://localhost:3000` to interact with the dashboard and device manager.  

---

## 📋 Usage  

### Simulating IoT Devices  
1. Add devices using the **Device Manager**.  
2. Define data patterns and failure scenarios in the configuration panel.  
3. Visualize live data streams in the real-time dashboard.  

### Monitoring System Metrics  
- Access the Grafana dashboard at `http://localhost:3001` (default).  
- Monitor key metrics like system latency, memory usage, and throughput.  

### Exporting Data  
- Export device data in **CSV** or **JSON** format for analysis.  

---

## 🏗️ Contributing  

We welcome contributions to enhance the system! Feel free to:  
- Open issues for bugs or feature requests.  
- Submit pull requests with well-documented code and tests.  

---

## 📊 Monitoring with Grafana  

Prometheus scrapes system metrics, which can be visualized in **Grafana dashboards**. Metrics include:  
- **Message Throughput**  
- **WebSocket Connections**  
- **System Latency**  

---

## 🔗 Live Preview  

You can access the live preview of this system at:  
[Live Dashboard](https://iotdashboard-s4pi-dx2o5as6--5173--1b4252dd.local-credentialless.webcontainer.io/)  

---

## 📜 License  

This project is licensed under the **MIT License**.  

--- 

## 🙌 Acknowledgments  

Thanks to the open-source community for tools like **Node.js**, **Redis**, **MongoDB**, and **Grafana**, which form the backbone of this project.  
generate 
