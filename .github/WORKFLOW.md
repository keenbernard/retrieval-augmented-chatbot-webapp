# Retrieval-Augmented Chatbot - CI/CD Workflow

## Project Overview
This directory contains a structured CI/CD pipeline for the Retrieval-Augmented Chatbot, including frontend and backend components. The pipeline automates code integration, testing, and deployment to IIS.

## Repository Structure
```
retrieval-augmented-chatbot-webapp/
│── .github/workflows/          # GitHub Actions workflow files
│── public/                     # Static assets
│── src/                        # Frontend source code
│── server/                     # Backend server files
│── package.json                # Project dependencies
│── README.md                   # Documentation
```

## CI/CD Workflow
### 1. **Trigger:**
- The workflow runs when triggered from GitHub via actions section. Select branch to deploy `develop` and environment `midtest_frontend`.

### 2. **Test Phase:**
- Runs unit tests using Jest (`npm test -- --watchAll=false --ci`).

### 3. **Build Phase:**
- Runs only if tests pass.
- Installs dependencies (`npm install`).
- Builds the frontend (`npm run build`).
- Creates build, server & portConfiguration artifacts.

### 4. **Deployment Phase:**
- Runs only if build pass.
- Downloads the build artifacts.
- Deploys files to the middleware server (`C:\middleware\MID_AI`).
- Installs server dependencies (`C:\middleware\MID_AI\server` `npm install`).
- Deploys new Website to IIS using build path (`"C:\middleware\MID_AI\build"`).

## Deployment
- The deployment server is configured as a self-hosted runner (`midtest_frontend`).
- IIS is used to serve the frontend.
- Web App mid-ai-bot is created

## Troubleshooting
### **Permission Errors in Deployment**
- Ensure the GitHub Actions runner has write access to `C:\middleware\MID_RAGBOT\server\package-lock.json`.
- Run with elevated privileges if necessary.
