# 🌤️ Atmos - Weather Telemetry Dashboard

A modern, responsive, and full-stack weather forecasting dashboard. Atmos delivers real-time atmospheric data, hourly forecasts, and air quality metrics wrapped in a sleek, dynamic glassmorphism user interface.

## ✨ Key Features

* **Real-Time Telemetry:** Displays precise data including temperature, humidity, wind speed, UV index, and visibility.
* **Dynamic UI & Glassmorphism:** The application background and aesthetic dynamically shift based on current weather conditions (e.g., clear, rain, cloudy) using modern CSS techniques.
* **Secure Architecture:** Implements a custom Node.js/Express backend proxy to securely route data and completely hide sensitive API keys from the client-side browser.
* **Smart Search:** Features a debounced search bar for seamless city lookups without overwhelming the API.
* **Fully Responsive:** Mobile-first design utilizing Flexbox and CSS Grid to ensure perfect scaling across all device sizes without layout shifts (Zero CLS).
* **Hotspots & Unit Toggling:** Quick-access buttons for major global cities and instant toggling between Celsius and Fahrenheit.

## 🛠️ Tech Stack

**Frontend:**
* React 18
* Vite (Build Tool)
* Tailwind CSS v4
* Lucide React (Icons)

**Backend:**
* Node.js
* Express.js
* CORS (Cross-Origin Resource Sharing)

**APIs & Data:**
* [WeatherAPI](https://www.weatherapi.com/) (Current weather, forecasting, and search autocomplete)

## 🏗️ Project Architecture

To ensure best security practices, this project is divided into two parts:
1. **The Client (`/`):** The React frontend that the user interacts with. It makes data requests to the local proxy rather than directly to the weather provider.
2. **The Server (`/server`):** A lightweight Express proxy that securely holds the `WEATHER_API_KEY`, makes the actual requests to WeatherAPI, and forwards the data back to the client.

## 🚀 Local Installation & Setup

Follow these steps to run the project locally on your machine.

### 1. Clone the repository
```bash
git clone https://github.com/dharmendra0311/atmos-weather-forecast.git
cd atmos
```

### 2. Install Dependencies
You will need to install dependencies for both the frontend and the backend.

```bash
# Install frontend dependencies
npm install

# Navigate to the server folder and install backend dependencies
cd server
npm install
```

### 3. Environment Variables
You must create two separate `.env` files. 

**Frontend `.env`** (Create in the root directory `atmos/.env`):
```env
# Points to your local backend proxy
VITE_API_URL=http://localhost:5000
```

**Backend `.env`** (Create in the server directory `atmos/server/.env`):
```env
# Your private API key from WeatherAPI.com
API_KEY=your_api_key_here
PORT=5000
```

### 4. Run the Development Servers
You will need two terminal windows open to run both servers simultaneously.

**Terminal 1 (Backend):**
```bash
cd server
node index.js
# Output: Server running on http://localhost:5000
```

**Terminal 2 (Frontend):**
```bash
# From the root directory
npm run dev
# Output: VITE v5.x.x ready in ... ms
```

Open `http://localhost:5173` in your browser to view the application.

## 📦 Production Build

To test the highly optimized production build locally:
```bash
npm run build
npm run preview
```

## 👨‍💻 Author

Built by [Dharmendra](https://github.com/dharmendra0311)