# Chat Application

This project is a chat application consisting of a frontend client and a backend server. It provides real-time messaging features and can be deployed locally using Docker, Docker Compose, or Kubernetes.

## Prerequisites

Before you start, ensure you have the following installed:

1. **Node.js**: Version `v20.11.0`
   - Install Node.js from [nodejs.org](https://nodejs.org/).
   - Check version: `node -v`

2. **Docker**: Version `27.1.1`
   - Install Docker from [docker.com](https://www.docker.com/products/docker-desktop).
   - Check version: `docker --version`

3. **Kubernetes**: Version `v1.30.2`
   - Install Kubernetes using [kubectl](https://kubernetes.io/docs/tasks/tools/).
   - Check version: `kubectl version`

4. **kubectl**: Version `v1.30.2`
   - Install `kubectl` as described in the [Kubernetes documentation](https://kubernetes.io/docs/tasks/tools/).
   - Check version: `kubectl version --client`

5. **Docker Compose**: Not installed
   - To install Docker Compose, follow the instructions at [docker.com](https://docs.docker.com/compose/install/).

## Build and Deploy Locally Without Docker

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Milanshub/Chat-Docker-TS-project-5.git
   cd Chat-Docker-TS-project-5


2. **Build the Backend Server**:
    cd server
    npm install
    npm run build

3. **Build the Frontend Client**:
    cd ../client
    npm install
    npm run build

4. **Start the Backend Server**:
    cd ../server
    npm start

5. **Start the Frontend Client**:
    cd ../client
    npm start

## Build and Deploy Locally with Docker Compose

1. **Ensure Docker and Docker Compose are Installed.**

2. **Build and Start the Application**:
    docker-compose up --build

## Kubernetes deployment 

1. **Ensure Kubernetes and kubectl are Installed.**

2. **Apply Kubernetes Configuration**:
    kubectl apply -f k8s/

3. **Forward Ports to Access Services Locally**:
    kubectl port-forward svc/client-service 3000:80 -n chat-demo-app
    kubectl port-forward svc/server-service 5000:5000 -n chat-demo-app