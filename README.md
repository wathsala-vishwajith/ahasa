# Ahasa Weather App

Ahasa is a modern, fast, and beautiful weather app built with React and TypeScript. It uses the AccuWeather API to provide current conditions, daily and hourly forecasts, and supports dark mode, auto-refresh, and persistent local storage for your favorite locations.

This was purely vibecoded using AI.

## Features
- Search and add cities with autocomplete
- View current weather, daily, and hourly forecasts
- Tabbed modal for detailed weather and forecasts
- Auto-refresh weather data based on API cache headers
- Dark mode toggle
- Responsive and mobile-friendly UI
- Data persistence with localStorage

## Tech Stack
- React + TypeScript
- Vite
- AccuWeather API
- CSS (custom + minimal Tailwind)

## Prerequisites
- Node.js (v16 or newer recommended)
- npm or yarn
- [AccuWeather API key](https://developer.accuweather.com/)

## Getting Started (Local Development)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/ahasa.git
   cd ahasa
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up your environment variables:**
   - Copy `.env.example` to `.env` (or create `.env`):
     ```env
     VITE_ACCUWEATHER_API_KEY=your_accuweather_api_key_here
     ```
   - Get your API key from [AccuWeather Developer Portal](https://developer.accuweather.com/).

4. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   The app will be available at [http://localhost:5173](http://localhost:5173) (or as shown in your terminal).

## Deploying to Vercel

1. **Push your code to GitHub (or GitLab/Bitbucket).**
2. **Go to [Vercel](https://vercel.com/) and import your repository.**
3. **Set the environment variable in Vercel dashboard:**
   - `VITE_ACCUWEATHER_API_KEY=your_accuweather_api_key_here`
4. **Deploy!**

Vercel will automatically detect the Vite/React app and build it. Your app will be live on your Vercel domain.

## Example .env
```
VITE_ACCUWEATHER_API_KEY=your_accuweather_api_key_here
```

## Contributing
Pull requests and issues are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
GNU General Public License v3.0

## Contact
For questions, suggestions, or support, open an issue.
