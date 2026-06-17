# CodeAlpha_URLShortener

**CodeAlpha Backend Internship — Task 1: Simple URL Shortener**

A REST API backend that accepts long URLs, generates unique short codes, stores mappings in SQLite, and redirects users to the original URL.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** SQLite (via `better-sqlite3`)
- **Short code generation:** nanoid

## Features

- Shorten long URLs via API
- Redirect route for short links
- Duplicate URL detection (returns existing short link)
- Click tracking per short URL
- Simple web UI for testing

## Project Structure

```
CodeAlpha_URLShortener/
├── db/
│   └── database.js      # SQLite setup & schema
├── routes/
│   └── urls.js          # URL shortening routes
├── public/
│   └── index.html       # Frontend UI
├── data/                # SQLite database (auto-created)
├── server.js
└── package.json
```

## Setup & Run

### Prerequisites

- Node.js 18+ installed

### Installation

```bash
cd CodeAlpha_URLShortener
npm install
```

### Start server

```bash
npm start
```

Server runs at **http://localhost:3001**

For development with auto-reload:

```bash
npm run dev
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| POST | `/api/shorten` | Create a short URL |
| GET | `/api/urls` | List all shortened URLs |
| GET | `/api/urls/:code` | Get details for a short code |
| GET | `/:code` | Redirect to original URL |

### Shorten a URL

**Request**

```http
POST /api/shorten
Content-Type: application/json

{
  "url": "https://www.example.com/very/long/path"
}
```

**Response**

```json
{
  "shortCode": "a1b2c3d4",
  "shortUrl": "http://localhost:3001/a1b2c3d4",
  "originalUrl": "https://www.example.com/very/long/path"
}
```

### Redirect

Open the short URL in a browser or follow the redirect:

```http
GET /a1b2c3d4
```

Returns `302` redirect to the original URL.

## Web UI

Visit **http://localhost:3001** to shorten URLs using the built-in frontend.

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3001` | Server port |

## Author

CodeAlpha Backend Development Internship — M1
