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

// Helper to always request gzip
async function fetchWithGzip(url: string, options: RequestInit = {}) {
  const headers = {
    ...(options.headers || {}),
    'Accept-Encoding': 'gzip, deflate',
  };
  return fetch(url, { ...options, headers });
}

// Helper to extract Expires header as Date
function getExpiresFromResponse(res: Response): Date | null {
  const expires = res.headers.get('Expires');
  return expires ? new Date(expires) : null;
}

export async function fetchLocationAutocomplete(query: string): Promise<AccuWeatherLocation[]> {
  const apiKey = getAccuWeatherApiKey();
  const url = `${BASE_URL}/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${encodeURIComponent(query)}`;
  const res = await fetchWithGzip(url);
  if (!res.ok) throw new Error('Failed to fetch autocomplete');
  return res.json();
}

export async function fetchCurrentCondition(locationKey: string): Promise<{ data: AccuWeatherCurrentCondition | null, expires: Date | null }> {
  const apiKey = getAccuWeatherApiKey();
  const url = `${BASE_URL}/currentconditions/v1/${locationKey}?apikey=${apiKey}&details=true`;
  const res = await fetchWithGzip(url);
  if (!res.ok) throw new Error('Failed to fetch current condition');
  const data = await res.json();
  return { data: data[0] || null, expires: getExpiresFromResponse(res) };
}

export async function fetchDetailedCurrentCondition(locationKey: string): Promise<{ data: any | null, expires: Date | null }> {
  const apiKey = getAccuWeatherApiKey();
  const url = `${BASE_URL}/currentconditions/v1/${locationKey}?apikey=${apiKey}&details=true`;
  const res = await fetchWithGzip(url);
  if (!res.ok) throw new Error('Failed to fetch detailed current condition');
  const data = await res.json();
  return { data: data[0] || null, expires: getExpiresFromResponse(res) };
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
  const res = await fetchWithGzip(url);
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
  const res = await fetchWithGzip(url);
  if (!res.ok) throw new Error(`Failed to fetch ${hours}-hour hourly forecast`);
  return res.json();
}
