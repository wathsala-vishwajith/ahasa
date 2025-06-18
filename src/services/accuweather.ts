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
