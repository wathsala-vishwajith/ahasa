import React, { useEffect, useState } from 'react';
import { WiDaySunny, WiNightClear, WiCloudy, WiRain, WiSnow, WiThunderstorm, WiFog, WiStrongWind, WiHumidity, WiThermometer } from 'react-icons/wi';

// Helper to get icon based on weather
const getWeatherIcon = (weather: string, isDay: boolean) => {
  switch (weather) {
    case 'clear':
      return isDay ? <WiDaySunny size={80} /> : <WiNightClear size={80} />;
    case 'clouds':
      return <WiCloudy size={80} />;
    case 'rain':
      return <WiRain size={80} />;
    case 'snow':
      return <WiSnow size={80} />;
    case 'thunderstorm':
      return <WiThunderstorm size={80} />;
    case 'fog':
    case 'mist':
      return <WiFog size={80} />;
    default:
      return isDay ? <WiDaySunny size={80} /> : <WiNightClear size={80} />;
  }
};

// Helper to get card background based on day/night
const getCardBackground = (isDay: boolean) => {
  return isDay
    ? 'linear-gradient(135deg, #7fd8ff 0%, #a6e0ff 100%)'
    : 'linear-gradient(135deg, #232946 0%, #3a3f5a 100%)';
};

export interface WeatherCardProps {
  id: string;
  initialLocation?: string;
  onRemove?: (id: string) => void;
}

interface WeatherData {
  location: string;
  temp: number;
  weather: string;
  wind: number;
  humidity: number;
  feelsLike: number;
  isDay: boolean;
}

const defaultData: WeatherData = {
  location: 'Cairo',
  temp: 294,
  weather: 'clear',
  wind: 6.8,
  humidity: 32,
  feelsLike: 293,
  isDay: true,
};

const WeatherCard: React.FC<WeatherCardProps> = ({ id, initialLocation, onRemove }) => {
  const [data, setData] = useState<WeatherData>(() => {
    const saved = localStorage.getItem('weathercard-' + id);
    return saved ? JSON.parse(saved) : { ...defaultData, location: initialLocation || defaultData.location };
  });
  const [locationInput, setLocationInput] = useState('');

  useEffect(() => {
    localStorage.setItem('weathercard-' + id, JSON.stringify(data));
  }, [data, id]);

  // Simulate fetch (replace with real API call)
  const fetchWeather = (loc: string) => {
    // For demo, randomize weather
    const weathers = ['clear', 'clouds', 'rain', 'snow', 'thunderstorm', 'fog'];
    const weather = weathers[Math.floor(Math.random() * weathers.length)];
    const isDay = new Date().getHours() > 6 && new Date().getHours() < 18;
    setData({
      location: loc,
      temp: 290 + Math.floor(Math.random() * 10),
      weather,
      wind: +(5 + Math.random() * 5).toFixed(1),
      humidity: Math.floor(20 + Math.random() * 60),
      feelsLike: 290 + Math.floor(Math.random() * 10),
      isDay,
    });
  };

  return (
    <div
      style={{
        width: 260,
        borderRadius: 24,
        padding: 24,
        background: getCardBackground(data.isDay),
        color: data.isDay ? '#232946' : '#fff',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        margin: 16,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      {onRemove && (
        <button
          onClick={() => onRemove(id)}
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            background: 'rgba(0,0,0,0.08)',
            border: 'none',
            borderRadius: '50%',
            width: 32,
            height: 32,
            fontSize: 20,
            cursor: 'pointer',
            color: data.isDay ? '#232946' : '#fff',
            zIndex: 1,
          }}
          aria-label="Remove card"
        >
          ×
        </button>
      )}
      <div style={{ fontWeight: 700, fontSize: 28, marginBottom: 8 }}>{data.location}</div>
      <div>{getWeatherIcon(data.weather, data.isDay)}</div>
      <div style={{ fontSize: 40, fontWeight: 700, margin: '8px 0' }}>{data.temp}K</div>
      <div style={{ fontSize: 18, marginBottom: 16 }}>{data.weather.replace(/^(.)/, c => c.toUpperCase())}</div>
      <div style={{ display: 'flex', gap: 16, width: '100%', justifyContent: 'space-between', marginTop: 16 }}>
        <div style={{ textAlign: 'center' }}>
          <WiStrongWind size={28} />
          <div style={{ fontSize: 16 }}>{data.wind}<span style={{ fontSize: 12 }}>fps</span></div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <WiHumidity size={28} />
          <div style={{ fontSize: 16 }}>{data.humidity}%</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <WiThermometer size={28} />
          <div style={{ fontSize: 16 }}>{data.feelsLike}K</div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
