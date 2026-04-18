# Wild Horizons API

Minimalist RESTful backend API built with **Node.js** that provides a dataset of incredible destinations around the world.

Each destination includes information such as country, continent, fun facts, and public accessibility.

> This project was developed as part of the "__The Backend Developer Path__" course on [Scrimba](https://scrimba.com).

---

## Technologies & Modules

### Runtime
- **Node.js** — native HTTP server, no external frameworks
- **ES Modules** (`"type": "module"`) — the entire codebase uses `import`/`export`

### Native Node.js modules used
| Module | Usage |
|---|---|
| `node:http` | HTTP server creation (`http.createServer`) |
| `URL` (Web API global) | URL parsing and query string extraction (`new URL(...)`) |


## Project Structure

```
wild-horizons/
├── server.js              # Application entry point, route definitions
├── package.json
├── data/
│   └── data.js            # Static dataset with destinations
├── database/
│   └── database.js        # Data access layer (simulates a DB)
└── utils/
    └── utilities.js       # Utility functions: HTTP response handler and filters
```

---

## Installation & Setup

### Prerequisites
- Node.js installed (recommended: v18+)

### Clone and install
```bash
git clone <repository-url>
cd wild-horizons
```

### Start the API
```bash
npm start
```

### Start with auto-reload (development mode)
```bash
npm run dev
```

> Uses Node.js's native `--watch` flag (available from v18+).

Server runs at: `http://127.0.0.1:8000`

---

## Routes

All routes accept only the **GET** method.  
Responses are always in **JSON** format with the `Content-Type: application/json` header.  
**CORS** is enabled for all origins (`Access-Control-Allow-Origin: *`).

---

### `GET /api`

Returns all available destinations.

**Example:**
```
GET http://127.0.0.1:8000/api
```

#### Optional Query Parameters

| Parameter | Type | Description | Example |
|---|---|---|---|
| `continent` | `string` | Filter by continent (case-insensitive) | `?continent=Europe` |
| `country` | `string` | Filter by country (case-insensitive) | `?country=Brazil` |
| `is_open_to_public` | `boolean` | Filter by public accessibility (`true` or `false`) | `?is_open_to_public=true` |

Parameters can be combined:
```
GET http://127.0.0.1:8000/api?continent=Europe&is_open_to_public=true
```

---

### `GET /api/continent/:continent`

Returns all destinations from the specified continent (case-insensitive).

**Route parameter:**
| Parameter | Type | Description |
|---|---|---|
| `continent` | `string` | Continent name |

**Available continents in the dataset:** `Africa`, `Asia`, `Europe`, `North America`, `Oceania`, `South America`

**Example:**
```
GET http://127.0.0.1:8000/api/continent/Europe
```

---

### `GET /api/country/:country`

Returns all destinations from the specified country (case-insensitive).

**Route parameter:**
| Parameter | Type | Description |
|---|---|---|
| `country` | `string` | Country name |

**Example:**
```
GET http://127.0.0.1:8000/api/country/New Zealand
```

---

### Route not found

Any route outside of the ones defined above returns:

```json
{
  "error": "not found",
  "message": "The requested route does not exist"
}
```
**HTTP Status:** `404`

---

## Destination Object Structure

```json
{
  "name": "Giant's Causeway",
  "location": "County Antrim",
  "country": "Northern Ireland",
  "continent": "Europe",
  "is_open_to_public": true,
  "details": [
    { "fun_fact": "The hexagonal columns are formed by ancient volcanic activity." },
    { "description": "A UNESCO World Heritage Site featuring striking hexagonal basalt columns along the scenic Northern Irish coastline." }
  ],
  "uuid": "550e8400-e29b-41d4-a716-446655440004"
}
```

---

## Available Scripts (`package.json`)

| Script | Command | Description |
|---|---|---|
| `start` | `node server.js` | Starts the server in production mode |
| `dev` | `node --watch server.js` | Starts with Node.js native hot-reload |