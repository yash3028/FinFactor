# Air Quality Index (AQI) Search Engine

A full-stack application that retrieves real-time Air Quality Index
(AQI) data for any city using the AQICN API, built with Node.js +
Express, React + TailwindCSS, and Docker Compose.

## Features

### Backend (Node.js + Express)

- Fetch AQI for any city
- LRU caching for optimized performance
- Simple REST API endpoint
- CORS enabled

### Frontend (React + TailwindCSS)

- Clean, animated UI
- City search bar
- AQI + pollutants info
- Responsive with modern styles

### Dockerized

- Backend + frontend in separate containers
- Shared docker network
- One-command startup

## Folder Structure

    aqi_monitor/
    │── backend/
    │── frontend/
    │── docker-compose.yml
    │── README.md

## API Details (Backend)

### Base URL

`http://localhost:5000/api/aqi`

### GET `/api/aqi?city={cityName}`

Example: `GET http://localhost:5000/api/aqi?city=Delhi`

## Environment Variables

Inside backend/.env:

    PORT=5000
    AQICN_TOKEN=your_api_token_here

## Running With Docker

    docker compose up --build

## Running Without Docker

### Backend:

    cd backend
    npm install
    npm start

### Frontend:

    cd frontend
    npm install
    npm start

## Cache Logic

- LRU cache stores data per city
- Expiry time + max entries maintained

## Tech Stack

Backend: Node.js, Express, Axios, LRU-Cache\
Frontend: React, TailwindCSS\
DevOps: Docker, Docker Compose
