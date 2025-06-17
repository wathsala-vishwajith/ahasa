import React, { useEffect, useState } from 'react';
import { WiDaySunny, WiNightClear, WiCloudy, WiRain, WiSnow, WiThunderstorm, WiFog, WiStrongWind, WiHumidity, WiThermometer } from 'react-icons/wi';
import { FaSpinner } from 'react-icons/fa';
import type { AccuWeatherCurrentCondition } from '../services/accuweather';

// Helper to get icon based on weather
const getWeatherIcon = (iconNumber: number | null, isDay: boolean) => {
  if (iconNumber === null) {
    return isDay ? <WiDaySunny size={80} /> : <WiNightClear size={80} />;
  }
  switch (iconNumber) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
      return isDay ? <WiDaySunny size={80} /> : <WiNightClear size={80} />;
    case 6:
    case 7:
    case 8:
    case 11:
      return <WiFog size={80} />;
    case 12:
    case 13:
    case 14:
    case 18:
      return <WiRain size={80} />;
    case 15:
    case 16:
    case 17:
      return <WiThunderstorm size={80} />;
    case 19:
    case 20:
    case 21:
    case 22:
    case 23:
    case 24:
      return <WiSnow size={80} />;
    default:
      return <WiCloudy size={80} />;
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
  location: string;
  condition?: AccuWeatherCurrentCondition | null;
  onRemove?: (id: string) => void;
  onClick?: () => void;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ id, location, condition, onRemove, onClick }) => {
  if (!condition) {
    return (
      <div
        style={{
          width: 260,
          borderRadius: 24,
          padding: 24,
          background: 'rgba(200,200,200,0.2)',
          color: '#232946',
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
          margin: 16,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          minHeight: 360,
        }}
      >
        <FaSpinner className="animate-spin" size={50} />
      </div>
    );
  }

  const {
    WeatherText,
    WeatherIcon,
    IsDayTime,
    Temperature,
    RealFeelTemperature,
    RelativeHumidity,
    Wind,
  } = condition;

  const tempValue = Temperature?.Metric?.Value;
  const realFeelValue = RealFeelTemperature?.Metric?.Value;

  return (
    <div
      onClick={onClick}
      style={{
        width: 260,
        borderRadius: 24,
        padding: 24,
        background: getCardBackground(IsDayTime),
        color: IsDayTime ? '#232946' : '#fff',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        margin: 16,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        minHeight: 360,
        cursor: onClick ? 'pointer' : 'default',
      }}
    >
      {onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove(id);
          }}
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
            color: IsDayTime ? '#232946' : '#fff',
            zIndex: 1,
          }}
          aria-label="Remove card"
        >
          ×
        </button>
      )}
      <div style={{ fontWeight: 700, fontSize: 28, marginBottom: 8, textAlign: 'center' }}>{location}</div>
      <div>{getWeatherIcon(WeatherIcon, IsDayTime)}</div>
      <div style={{ fontSize: 40, fontWeight: 700, margin: '8px 0' }}>
        {tempValue !== null ? `${Math.round(tempValue)}°C` : 'N/A'}
      </div>
      <div style={{ fontSize: 18, marginBottom: 16, textTransform: 'capitalize' }}>{WeatherText || 'N/A'}</div>
      <div style={{ display: 'flex', gap: 16, width: '100%', justifyContent: 'space-between', marginTop: 16 }}>
        <div style={{ textAlign: 'center' }}>
          <WiStrongWind size={28} />
          <div style={{ fontSize: 16 }}>
            {Wind?.Speed?.Metric?.Value ?? 'N/A'}<span style={{ fontSize: 12 }}>km/h</span>
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <WiHumidity size={28} />
          <div style={{ fontSize: 16 }}>{RelativeHumidity ?? 'N/A'}%</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <WiThermometer size={28} />
          <div style={{ fontSize: 16 }}>
            {realFeelValue !== null ? `${Math.round(realFeelValue)}°C` : 'N/A'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
