# FastAPI Monitoring with Prometheus & Grafana

> [!NOTE]  
> This was a student project. Application source-code is taken from the Ericsson NTN Orchestrator – Satellite Handover Demo project.

This repository provides a ready-to-use example of deploying a simple static website with FastAPI, Prometheus, and Grafana using Docker Compose. The FastAPI application serves a static HTML page and exposes Prometheus metrics. Grafana is configured to visualize these metrics.

![image](screenshot.png)

## Get Started

1. **Clone the repository**:

   ```bash
   git clone git@github.com:fabienchevalier/simple-api-grafana-monitoring.git
    cd simple-api-grafana-monitoring
    ```

2. **Start the stack**:

   ```bash
   docker compose up --build
   ```

- FastAPI app: <http://localhost:8000>

- Prometheus: <http://localhost:9090>

- Grafana: <http://localhost:3000> (default login: admin / admin)

- Cell Application : <http://localhost:8000>

1. Make request to the FastAPI app to populate the metrics or simply browse the app:

   ```bash
   while true; do
    curl -s http://localhost:8000/ > /dev/null
    echo "Request sent"
    sleep 1

   done
    ```
