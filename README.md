# React App for RAG Chatbot

This project serves as a React frontend for interacting with a Flask API that manages and queries document embeddings. The backend acts as a bridge for processing user requests, such as initializing indexes and querying embeddings, via the Flask API endpoints.

## Features

- **Chat Interface**:
    - Users can input queries via a chat-like interface.
    - Questions appear immediately on the right in a user bubble, and chatbot answers appear on the left in a separate bubble.
    - Auto-scroll ensures the latest messages are always visible.
- **Initialize Document Index**:
    - Upload PDF chunks and embeddings to Pinecone or other vector databases via the Flask API.
- **Query Index**:
    - Send natural language queries to retrieve relevant embeddings and receive answers from the Flask API.

## Prerequisites

Ensure you have the following installed:

- Node.js (v16+ recommended)
- npm (Node Package Manager)
 - **A Running Flask Backend**:
    - Ensure the backend is available at `http://127.0.0.1:5000` or via Docker at `http://localhost:8000`.

## Project Setup

#### Clone the Repository:
``` 
git clone https://github.com/your-repo-name.git
cd your-repo-name 
```

#### Install Dependencies: Run the following command to install the required Node.js libraries:
```
npm install
```

## Usage

### Start the Backend
Ensure your Flask backend is running.

Run the Server: Start the Node.js backend:
```
cd server
npm run dev index.js
```
Run the Client: Start the React.js frontend:
```
npm start
```

Endpoints: The Node.js backend exposes the following endpoints:
#### **Initialize Index**
```http
POST /initialize
Content-Type: application/json

{
  "directory": "policies"
}
```

#### **Query Index**
```http
POST /query
Content-Type: application/json

{
  "query": "What is the drug-free workplace policy?"
}
```

## Project Structure
- **Frontend**: React.js with a focus on dynamic state updates and user experience.
- **Backend**: Node.js with Express, acting as a bridge between the React frontend and Flask API.

## Dependencies

- Express: Minimal and flexible Node.js web framework.
- Axios: HTTP client for making requests to the Flask API.
- CORS: Middleware to enable cross-origin requests.
- Dotenv: Manage environment variables.

## License
Copyright 2024 Keenan Bernard

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.


## Build and Deployment
[View the full workflow details here before proceeding](.github/WORKFLOW.md)

### Click me to Deploy
[![Deploy Workflow](https://img.shields.io/badge/Run%20Deployment-%23FF0000?logo=githubactions&logoColor=white&style=for-the-badge)](https://github.com/keenbernard/retrieval-augmented-chatbot-webapp/actions/workflows/deploy.yml)

### Latest Deployment Status
[![Build and Deploy to Middleware Server](https://github.com/keenbernard/retrieval-augmented-chatbot-webapp/actions/workflows/deploy.yml/badge.svg?branch=develop)](https://github.com/keenbernard/retrieval-augmented-chatbot-webapp/actions/workflows/deploy.yml)