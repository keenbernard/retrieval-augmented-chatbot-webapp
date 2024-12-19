# Node.js Backend for RAG Chatbot

This project serves as a React frontend to interact with a Flask API for managing and querying document embeddings. The backend acts as a bridge for sending user requests (like initializing indexes and querying embeddings) to the Flask API endpoints.

## Features

- Initialize Document Index: Upload PDF chunks and embeddings to Pinecone or other vector databases via the Flask API.
- Query Index: Send queries to retrieve relevant document embeddings and receive answers from the Flask API.

## Prerequisites

Ensure you have the following installed:

- Node.js (v16+ recommended)
- npm (Node Package Manager)
- A running Flask backend on http://127.0.0.1:5000 or Docker container on http://localhost:8000

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
- Initialize Index
```
POST /initialize
Content-Type: application/json

{
  "directory": "policies"
}
```
- Query Index
```
POST /query
Content-Type: application/json

{
  "query": "What is the drug-free workplace policy?"
}
```

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