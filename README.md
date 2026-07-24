# Multi-Language Application

A highly scalable, multi-language full-stack web application built with a modern technology stack.

## Architecture & Tech Stack

This project is divided into two main components:

### 1. Frontend (React + Vite)
- **Framework:** React with Vite for lightning-fast HMR and optimized production builds.
- **Styling:** Modern, clean vanilla CSS.
- **Internationalization (i18n):** Uses `i18next` and `react-i18next`.
- **Features:** 
  - Dynamic translation loading.
  - Pluralization support.
  - Number and Date formatting using browser `Intl` APIs.
  - RTL (Right-to-Left) language support (e.g., Arabic).
  - Clean separation of translation strings (JSON) from application logic.
- **Deployment:** Containerized with Nginx for fast static asset delivery.

### 2. Backend (Spring Boot API)
- **Framework:** Java Spring Boot 3.2+
- **Features:**
  - RESTful API endpoints.
  - Configured for localized responses using Spring's `MessageSource`.
  - CORS enabled for frontend communication.
- **Deployment:** Containerized using Eclipse Temurin JDK 21.

## Local Development (Docker)

The easiest way to run the entire stack locally is using Docker Compose. Ensure you have Docker Desktop installed.

```bash
# Start both the frontend and backend containers
docker compose up --build -d
```

Once the containers are running:
- **Frontend App:** [http://localhost](http://localhost)
- **Backend API:** [http://localhost:8080](http://localhost:8080)

To stop the application:
```bash
docker compose down
```

## Cloud Deployment (Render.com)

This repository includes a `render.yaml` Blueprint file for automated infrastructure-as-code deployment on Render.com.

### How to deploy:
1. Go to your [Render Dashboard](https://dashboard.render.com/).
2. Click **New** -> **Blueprint**.
3. Connect this GitHub repository.
4. Click **Apply**.

Render will automatically provision:
1. A Docker Web Service for the Spring Boot Backend.
2. A blazing-fast Static Site for the React Frontend, complete with API proxying rules.

## Internationalization Strategy

- **Translation Files:** Located in `frontend/public/locales/`. Handled by a translation CDN or Static Site cache in production.
- **Fallback Chain:** Configured to handle regional locales falling back to base languages (e.g., `fr-CA` -> `fr` -> `en`).
- **Telemetry:** Missing keys in the frontend are captured and logged.
