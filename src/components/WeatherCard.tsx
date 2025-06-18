import React, { useState } from 'react';
import { WiStrongWind, WiHumidity, WiThermometer } from 'react-icons/wi';
import { FaSpinner } from 'react-icons/fa';
import type { AccuWeatherCurrentCondition } from '../services/accuweather';
import { getWeatherAnimation, getWeatherIcon, getCardBackground } from './WeatherUtils';
import './WeatherAnimations.css';

export interface WeatherCardProps {
  id: string;
  location: string;
  condition?: AccuWeatherCurrentCondition | null;
  onRemove?: (id: string) => void;
  onClick?: () => void;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ id, location, condition, onRemove, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  if (!condition) {
    return (
      <div
        style={{
          width: window.innerWidth <= 768 ? 220 : 260,
          borderRadius: 24,
          padding: window.innerWidth <= 768 ? 16 : 24,
          background: 'rgba(200,200,200,0.2)',
          color: '#232946',
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
          margin: window.innerWidth <= 768 ? 8 : 16,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          minHeight: window.innerWidth <= 768 ? 280 : 360,
          flexShrink: 0,
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
        width: window.innerWidth <= 768 ? 220 : 260,
        borderRadius: 24,
        padding: window.innerWidth <= 768 ? 16 : 24,
        background: getCardBackground(IsDayTime),
        color: IsDayTime ? '#232946' : '#fff',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        margin: window.innerWidth <= 768 ? 8 : 16,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        minHeight: window.innerWidth <= 768 ? 280 : 360,
        cursor: onClick ? 'pointer' : 'default',
        overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      {/* Weather Animation */}
      {getWeatherAnimation(WeatherIcon, IsDayTime)}
      
      {onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove(id);
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            background: isHovered 
              ? (IsDayTime ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.2)')
              : (IsDayTime ? 'rgba(255, 255, 255, 0.7)' : 'rgba(255, 255, 255, 0.1)'),
            border: `1px solid ${IsDayTime ? 'rgba(35, 41, 70, 0.15)' : 'rgba(255, 255, 255, 0.3)'}`,
            borderRadius: '50%',
            width: 32,
            height: 32,
            fontSize: 18,
            fontWeight: 'bold',
            cursor: 'pointer',
            color: isHovered 
              ? (IsDayTime ? '#dc2626' : '#ef4444')
              : (IsDayTime ? '#232946' : '#fff'),
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease-in-out',
            boxShadow: isHovered 
              ? `0 2px 8px ${IsDayTime ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.1)'}`
              : `0 1px 4px ${IsDayTime ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.3)'}`,
            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
          }}
          aria-label="Remove card"
        >
          ×
        </button>
      )}
      
      {/* Content */}
      <div style={{ fontWeight: 700, fontSize: 28, marginBottom: 8, textAlign: 'center', zIndex: 5, position: 'relative' }}>{location}</div>
      <div style={{ zIndex: 5, position: 'relative' }}>{getWeatherIcon(WeatherIcon, IsDayTime)}</div>
      <div style={{ fontSize: 40, fontWeight: 700, margin: '8px 0', zIndex: 5, position: 'relative' }}>
        {tempValue !== null ? `${Math.round(tempValue)}°C` : 'N/A'}
      </div>
      <div style={{ fontSize: 18, marginBottom: 16, textTransform: 'capitalize', zIndex: 5, position: 'relative' }}>{WeatherText || 'N/A'}</div>
      <div style={{ display: 'flex', gap: 16, width: '100%', justifyContent: 'space-between', marginTop: 16, zIndex: 5, position: 'relative' }}>
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
