// Utility to get environment variables for AccuWeather and MinuteCast
// In Vite, use import.meta.env for client-side env vars prefixed with VITE_

export const getAccuWeatherApiKey = () => import.meta.env.VITE_ACCUWEATHER_API_KEY;
export const getMinuteCastApiKey = () => import.meta.env.VITE_MINUTECAST_API_KEY;
