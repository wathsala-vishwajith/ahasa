import { getAccuWeatherApiKey } from './env';

export interface AccuWeatherLocation {
  Key: string;
  LocalizedName: string;
  Country: { ID: string; LocalizedName: string };
  AdministrativeArea: { ID: string; LocalizedName: string };
}

export interface AccuWeatherCurrentCondition {
  LocalObservationDateTime: string;
  WeatherText: string;
  WeatherIcon: number | null;
  IsDayTime: boolean;
  Temperature: {
    Metric: { Value: number | null; Unit: string };
    Imperial: { Value: number | null; Unit: string };
  };
  RealFeelTemperature: {
    Metric: { Value: number | null; Unit: string };
    Imperial: { Value: number | null; Unit: string };
  };
  RelativeHumidity: number | null;
  Wind: {
    Speed: { Metric: { Value: number; Unit: string } };
  };
}

// Forecast interfaces (can be improved with real types)
export interface AccuWeatherDailyForecastResponse {
  [key: string]: any;
}
export interface AccuWeatherHourlyForecastResponse {
  [key: string]: any;
}

const BASE_URL = 'https://dataservice.accuweather.com';

export async function fetchLocationAutocomplete(query: string): Promise<AccuWeatherLocation[]> {
  const apiKey = getAccuWeatherApiKey();
  const url = `${BASE_URL}/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${encodeURIComponent(query)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch autocomplete');
  return res.json();
}

export async function fetchCurrentCondition(locationKey: string): Promise<AccuWeatherCurrentCondition | null> {
  const apiKey = getAccuWeatherApiKey();
  const url = `${BASE_URL}/currentconditions/v1/${locationKey}?apikey=${apiKey}&details=true`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch current condition');
  const data = await res.json();
  return data[0] || null;
}

export async function fetchDetailedCurrentCondition(locationKey: string): Promise<any | null> {
  const apiKey = getAccuWeatherApiKey();
  const url = `${BASE_URL}/currentconditions/v1/${locationKey}?apikey=${apiKey}&details=true`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch detailed current condition');
  const data = await res.json();
  return data[0] || null;
}

/**
 * Fetch daily forecast (1, 5, 10, or 15 days)
 * @param locationKey Location key string
 * @param days Number of days (1, 5, 10, or 15)
 * @param details Whether to include full details (default: false)
 */
export async function fetchDailyForecast(
  locationKey: string,
  days: 1 | 5 | 10 | 15,
  details: boolean = false
): Promise<AccuWeatherDailyForecastResponse> {
  const apiKey = getAccuWeatherApiKey();
  const url = `${BASE_URL}/forecasts/v1/daily/${days}day/${locationKey}?apikey=${apiKey}${details ? '&details=true' : ''}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${days}-day daily forecast`);
  return res.json();
}

/**
 * Fetch hourly forecast (1, 12, 24, 72, or 120 hours)
 * @param locationKey Location key string
 * @param hours Number of hours (1, 12, 24, 72, or 120)
 * @param details Whether to include full details (default: false)
 */
export async function fetchHourlyForecast(
  locationKey: string,
  hours: 1 | 12 | 24 | 72 | 120,
  details: boolean = false
): Promise<AccuWeatherHourlyForecastResponse> {
  const apiKey = getAccuWeatherApiKey();
  const url = `${BASE_URL}/forecasts/v1/hourly/${hours}hour/${locationKey}?apikey=${apiKey}${details ? '&details=true' : ''}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${hours}-hour hourly forecast`);
  return res.json();
}
